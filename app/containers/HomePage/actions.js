import {
  FETCH_PATIENT_SIGN_UPS,
  FETCH_PATIENT_SIGN_UPS_SUCCEESS,
  FETCH_PATIENT_MESSAGES,
  FETCH_PATIENT_MESSAGES_SUCCEESS,
  FETCH_REWARDS_POINT,
  FETCH_REWARDS_POINT_SUCCEESS,
} from './constants';

export function fetchPatientSignUps(currentUser) {
  return {
    type: FETCH_PATIENT_SIGN_UPS,
    currentUser,
  };
}

export function fetchPatientMessages(currentUser) {
  return {
    type: FETCH_PATIENT_MESSAGES,
    currentUser,
  };
}

export function fetchRewardsPoint(currentUser) {
  return {
    type: FETCH_REWARDS_POINT,
    currentUser,
  };
}

export function fetchPatientSignUpsSucceeded(payload) {
  return {
    type: FETCH_PATIENT_SIGN_UPS_SUCCEESS,
    payload,
  };
}

export function fetchPatientMessagesSucceeded(payload) {
  return {
    type: FETCH_PATIENT_MESSAGES_SUCCEESS,
    payload,
  };
}

export function fetchRewardsPointSucceeded(payload) {
  return {
    type: FETCH_REWARDS_POINT_SUCCEESS,
    payload,
  };
}
