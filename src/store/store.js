import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// all middle wares need to be passed in the 3rd params as so:
export const store = createStore(rootReducer, undefined, composedEnhancers); 