import {
  CLOSE_PATIENTS_LIST_MODAL,
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
  SEARCH_FOR_PATIENTS,
  SEARCH_FOR_PATIENTS_SUCCESS,
  SEARCH_FOR_PATIENTS_ERROR,
  FETCH_SCHEDULES,
  FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_ERROR,
} from './constants';

export function closePatientsListModal() {
  return {
    type: CLOSE_PATIENTS_LIST_MODAL,
  };
}
export function fetchPatients(userId) {
  return {
    type: FETCH_PATIENTS,
    userId,
  };
}

export function patientsFetched(response) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    response,
  };
}

export function patientsFetchingError(response) {
  return {
    type: FETCH_PATIENTS_ERROR,
    response,
  };
}

export function searchForPatients(phone) {
  return {
    type: SEARCH_FOR_PATIENTS,
    phone,
  };
}

export function searchForPatientsFetched(response) {
  return {
    type: SEARCH_FOR_PATIENTS_SUCCESS,
    response,
  };
}

export function searchForPatientsFetchingError(response) {
  return {
    type: SEARCH_FOR_PATIENTS_ERROR,
    response,
  };
}

export function fetchSchedules(response) {
  return {
    type: FETCH_SCHEDULES,
    response,
  };
}

export function schedulesFetched(response) {
  return {
    type: FETCH_SCHEDULES_SUCCESS,
    response,
  };
}

export function schedulesFetchingError(response) {
  return {
    type: FETCH_SCHEDULES_ERROR,
    response,
  };
}
