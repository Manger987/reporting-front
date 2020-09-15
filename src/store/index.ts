import { createStore, compose } from "redux";
import reducers from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    user:{},
    reports:{}
}

export const store = createStore(reducers, initialState, composeEnhancers());
