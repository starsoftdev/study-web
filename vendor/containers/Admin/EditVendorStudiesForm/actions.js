import {
  ADD_STUDY_NUMBER,
  DELETE_STUDY_NUMBER,
  FETCH_VENDOR_STUDIES,
  FETCH_VENDOR_STUDIES_SUCCEEDED,
  SET_SELECTED_VENDOR_ID,
  SUBMIT_VENDOR_STUDIES,
  SUBMIT_VENDOR_STUDIES_SUCCEEDED,
  VALIDATE_STUDY_NUMBER,
} from './constants';

export function addStudyNumber(studyId) {
  return {
    type: ADD_STUDY_NUMBER,
    studyId,
  };
}

export function deleteStudyNumber(studyId) {
  return {
    type: DELETE_STUDY_NUMBER,
    studyId,
  };
}

export function fetchVendorStudies(vendorId) {
  return {
    type: FETCH_VENDOR_STUDIES,
    vendorId,
  };
}

export function fetchVendorStudiesSucceeded(response) {
  return {
    type: FETCH_VENDOR_STUDIES_SUCCEEDED,
    response,
  };
}

export function setSelectedVendorId(vendorId) {
  return {
    type: SET_SELECTED_VENDOR_ID,
    vendorId,
  };
}

export function submitVendorStudies(body) {
  return {
    type: SUBMIT_VENDOR_STUDIES,
    body,
  };
}

export function submitVendorStudiesSucceeded(response) {
  return {
    type: SUBMIT_VENDOR_STUDIES_SUCCEEDED,
    response,
  };
}

export function validateStudyNumber(vendorId, studyId, resolve, reject) {
  return {
    type: VALIDATE_STUDY_NUMBER,
    vendorId,
    studyId,
    resolve,
    reject,
  };
}