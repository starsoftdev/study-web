import { CLEAR_STUDY_SOURCES, FETCH_STUDY_SOURCES, FETCH_STUDY_SOURCES_ERROR, FETCH_STUDY_SOURCES_SUCCESS } from '../constants/studySources';

export function clearStudySources() {
  return {
    type: CLEAR_STUDY_SOURCES,
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
