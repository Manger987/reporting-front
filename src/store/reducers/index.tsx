import { combineReducers } from 'redux';
import { reportsReducer } from './reportsReducer';
import { userReducer } from './userReducer';

export default combineReducers({
    reports: reportsReducer,
    user: userReducer
});