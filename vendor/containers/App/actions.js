import {
  FETCH_ME_FROM_TOKEN,
  SET_AUTH_STATE,
  SET_USER_DATA,
  LOGOUT_REQUEST,
  FETCH_STUDY_SOURCES,
  FETCH_STUDY_SOURCES_SUCCESS,
  FETCH_STUDY_SOURCES_ERROR,
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

export function logout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function fetchStudySources(studyId) {
  return {
    type: FETCH_STUDY_SOURCES,
    studyId,
  };
}

export function fetchStudySourcesSuccess(payload) {
  return {
    type: FETCH_STUDY_SOURCES_SUCCESS,
    payload,
  };
}

export function fetchStudySourcesError(payload) {
  return {
    type: FETCH_STUDY_SOURCES_ERROR,
    payload,
  };
}
