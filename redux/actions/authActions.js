import { createAction } from 'redux-actions';

export const SET_UNIQUE_SESSION_ID = 'AUTH/SET_UNIQUE_SESSION_ID';
export const setUniqueSessionId = createAction(SET_UNIQUE_SESSION_ID);

export const CREATE_NEW_SESSION = 'AUTH/CREATE_NEW_SESSION';
export const createNewSession = createAction(CREATE_NEW_SESSION);

export const SET_ABTASTY_PARAMS = 'AUTH/SET_ABTASTY_PARAMS';
export const setAbtastyParams = createAction(SET_ABTASTY_PARAMS);

export const SET_IS_AUTHENTIC_PARAMS = 'AUTH/SET_IS_AUTHENTIC_PARAMS';
export const setIsAuthenticParams = createAction(SET_IS_AUTHENTIC_PARAMS);

export const SET_USER_INFO = 'AUTH/SET_USER_INFO';
export const setUserInfo = createAction(SET_USER_INFO);
