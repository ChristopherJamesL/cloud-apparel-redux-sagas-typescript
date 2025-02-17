import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// as the actual value(with default values) that you want to access.
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// this is the functional component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
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