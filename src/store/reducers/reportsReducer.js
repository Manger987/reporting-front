import { SET_REPORTS } from './../actions/index';

export const reportsReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_REPORTS:
            return { ...state, reports: action.payload };
        default:
            return state;
    }
}