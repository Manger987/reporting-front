import { SET_REPORTS, SET_USER } from './../actions/index';

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_REPORTS:
            return { ...state, reports: action.payload };
        default:
            return state;
    }
}