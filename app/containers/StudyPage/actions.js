/*
 *
 * ProfilePage actions
 *
 */

import {
  FETCH_STUDY,
  FETCH_STUDY_SUCCESS,
  FETCH_STUDY_ERROR,
  FETCH_STUDY_PATIENTS,
} from './constants';

export function fetchStudy() {
  return {
    type: FETCH_STUDY,
  };
}

export function studyFetched(payload) {
  return {
    type: FETCH_STUDY_SUCCESS,
    payload,
  };
}

export function studyFetchingError(payload) {
  return {
    type: FETCH_STUDY_ERROR,
    payload,
  };
}

export function fetchStudyPatients(payload) {
  return {
    type: FETCH_STUDY_PATIENTS,
    payload,
  };
}
