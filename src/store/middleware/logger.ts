import { Middleware } from "redux";
import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    const typedAction = action as { type?: string; payload?: any };
    
    if (!typedAction.type) {
        return next(action);
    }
    
    console.log('type: ', typedAction.type);
    console.log('payload: ', typedAction.payload);
    console.log('currentState: ', store.getState());

    const result = next(action);  
    
    console.log('next state: ', store.getState());
    return result;  
};