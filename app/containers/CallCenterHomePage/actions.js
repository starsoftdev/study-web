import {
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
  FETCH_SCHEDULES,
  FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_ERROR,
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

export function fetchSchedules(payload) {
  return {
    type: FETCH_SCHEDULES,
    payload,
  };
}

export function schedulesFetched(payload) {
  return {
    type: FETCH_SCHEDULES_SUCCESS,
    payload,
  };
}

export function schedulesFetchingError(payload) {
  return {
    type: FETCH_SCHEDULES_ERROR,
    payload,
  };
}
