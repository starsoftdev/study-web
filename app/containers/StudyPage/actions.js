/*
 *
 * ProfilePage actions
 *
 */

import {
  FETCH_STUDY,
  FETCH_STUDY_PATIENTS
} from './constants';

export function fetchStudy(payload) {
  return {
    type: FETCH_STUDY,
    payload,
  };
}

export function fetchStudyPatients(payload) {
  return {
    type: FETCH_STUDY_PATIENTS,
    payload,
  };
}
