import { createStore, compose } from "redux";
import { userReducer } from './reducers/userReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    user:{}
}

export const store = createStore(userReducer, initialState, composeEnhancers());
