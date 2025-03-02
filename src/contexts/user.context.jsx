import { createContext, useEffect, useReducer } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// as the actual value(with default values) that you want to access.
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    console.log('dispatched');
    console.log('action:', action);
    const { type, payload } = action;
    
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,  //spread through previous state, and then update values you want to change/add.
                currentUser: payload
            }
        default:
            throw new Error(`unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

// this is the functional component
export const UserProvider = ({ children }) => {
    const [ { currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser);

    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    }
    
    const value = { currentUser, setCurrentUser }; // provide access to state and setter function to whole app

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            // console.log(user);
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, [])
    
    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}

/* ex:
<UserProvider>
    <App />     this being a child
</UserProvider>
*/