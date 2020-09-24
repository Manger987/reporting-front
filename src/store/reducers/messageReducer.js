import { SET_MESSAGE } from './../actions/index';

export const messageReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return { ...state, message: action.payload };    
        default:
            return state;
    }
}