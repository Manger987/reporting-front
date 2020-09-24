export const SET_USER = "SET_USER";
export const SET_REPORTS = "SET_REPORTS";
export const SET_MESSAGE = "SET_MESSAGE";

export const setUserAction = (payload: any) => ({ type: SET_USER, payload });
export const setReportsAction = (payload: any) => ({type: SET_REPORTS, payload});
export const setMessageAction = (payload: any) => ({type: SET_MESSAGE, payload});
