import {
  FETCH_ME_FROM_TOKEN,
  SET_AUTH_STATE,
  SET_USER_DATA,
  LOGOUT_REQUEST,

  FETCH_INDICATIONS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_INDICATIONS_ERROR,

  MARK_AS_READ_PATIENT_MESSAGES,
  DELETE_MESSAGES_COUNT_STAT,
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

export function fetchIndications() {
  return {
    type: FETCH_INDICATIONS,
  };
}

export function indicationsFetched(payload) {
  return {
    type: FETCH_INDICATIONS_SUCCESS,
    payload,
  };
}

export function indicationsFetchingError(payload) {
  return {
    type: FETCH_INDICATIONS_ERROR,
    payload,
  };
}

export function markAsReadPatientMessages(patientId) {
  return {
    type: MARK_AS_READ_PATIENT_MESSAGES,
    patientId,
  };
}

export function deleteMessagesCountStat(payload) {
  return {
    type: DELETE_MESSAGES_COUNT_STAT,
    payload,
  };
}
