import {
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
} from './constants';

export function fetchPatients(userId) {
  return {
    type: FETCH_PATIENTS,
    userId,
  };
}

export function patientsFetched(payload) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload,
  };
}

export function patientsFetchingError(payload) {
  return {
    type: FETCH_PATIENTS_ERROR,
    payload,
  };
}
