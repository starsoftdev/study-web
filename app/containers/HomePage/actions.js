import {
  FETCH_PATIENT_SIGN_UPS,
  FETCH_PATIENT_SIGN_UPS_SUCCEESS,
  FETCH_PATIENT_MESSAGES,
  FETCH_PATIENT_MESSAGES_SUCCEESS,
  FETCH_REWARDS_POINT,
  FETCH_REWARDS_POINT_SUCCEESS,
  FETCH_STUDIES,
  FETCH_STUDIES_SUCCESS,
  FETCH_STUDIES_ERROR,
  FETCH_LEVEL_PRICE,
  FETCH_LEVEL_PRICE_SUCCESS,
  FETCH_LEVEL_PRICE_ERROR,
  CLEAR_LEVEL_PRICE,
} from './constants';

export function fetchPatientSignUps(currentUser) {
  return {
    type: FETCH_PATIENT_SIGN_UPS,
    currentUser,
  };
}

export function fetchPatientSignUpsSucceeded(payload) {
  return {
    type: FETCH_PATIENT_SIGN_UPS_SUCCEESS,
    payload,
  };
}

export function fetchPatientMessages(currentUser) {
  return {
    type: FETCH_PATIENT_MESSAGES,
    currentUser,
  };
}

export function fetchPatientMessagesSucceeded(payload) {
  return {
    type: FETCH_PATIENT_MESSAGES_SUCCEESS,
    payload,
  };
}

export function fetchRewardsPoint(currentUser) {
  return {
    type: FETCH_REWARDS_POINT,
    currentUser,
  };
}

export function fetchRewardsPointSucceeded(payload) {
  return {
    type: FETCH_REWARDS_POINT_SUCCEESS,
    payload,
  };
}

export function fetchStudies(searchParams = null) {
  return {
    type: FETCH_STUDIES,
    searchParams,
  };
}

export function studiesFetched(payload) {
  return {
    type: FETCH_STUDIES_SUCCESS,
    payload,
  };
}

export function studiesFetchingError(payload) {
  return {
    type: FETCH_STUDIES_ERROR,
    payload,
  };
}

export function fetchLevelPrice(id, indicationId) {
  return {
    type: FETCH_LEVEL_PRICE,
    id,
    indicationId,
  };
}

export function levelPriceFetched(payload) {
  return {
    type: FETCH_LEVEL_PRICE_SUCCESS,
    payload,
  };
}

export function levelPriceFetchingError(payload) {
  return {
    type: FETCH_LEVEL_PRICE_ERROR,
    payload,
  };
}

export function clearLevelPrice() {
  return {
    type: CLEAR_LEVEL_PRICE,
  };
}
