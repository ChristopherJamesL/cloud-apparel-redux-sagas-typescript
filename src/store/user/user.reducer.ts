import { AnyAction } from "redux";
import { 
    signInSuccess, 
    signOutSuccess, 
    signOutFailed, 
    signInFailed, 
    signUpFailed 
} from './user.action';
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {
    if (signInSuccess.match(action)) {
        return { ...state, currentUser: action.payload };
    }

    if (signOutSuccess.match(action)) {
        return { ...state, currentUser: null };
    }
    
    if (signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
        return { ...state, error: action.payload };
    }

    return state;
}