import {
  FETCH_ME_FROM_TOKEN,
  SET_AUTH_STATE,
  SET_USER_DATA,
} from './constants';

// ///////////////////////////////////////////
// auth related action creators
// ///////////////////////////////////////////
export function fetchMeFromToken(redirect) {
  return {
    type: FETCH_ME_FROM_TOKEN,
    redirect,
  };
}

export function setAuthState(newAuthState) {
  return {
    type: SET_AUTH_STATE,
    payload: {
      newAuthState,
    },
  };
}

export function setUserData(userData) {
  return {
    type: SET_USER_DATA,
    payload: {
      userData,
    },
  };
}
