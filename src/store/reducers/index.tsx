import { combineReducers } from 'redux';
import { reportsReducer } from './reportsReducer';
import { userReducer } from './userReducer';
import { messageReducer } from './messageReducer';

export default combineReducers({
    reports: reportsReducer,
    user: userReducer,
    message: messageReducer
});