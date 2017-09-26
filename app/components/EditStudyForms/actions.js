import {
  FETCH_EDIT_STUDY_INFORMATION,
  INITIALIZE_EDIT_STUDY_FORM,
} from './constants';

export function fetchEditStudyInformation(studyId, clientId, siteId) {
  return {
    type: FETCH_EDIT_STUDY_INFORMATION,
    studyId,
    clientId,
    siteId,
  };
}
