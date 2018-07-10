import {
  ADD_STUDY_NUMBER,
  DELETE_STUDY_NUMBER,
  FETCH_VENDOR_STUDIES,
  FETCH_VENDOR_STUDIES_SUCCEEDED,
  OPEN_MODAL_WITH_VENDOR_ID,
  CLOSE_MODAL,
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

export function openModalWithVendorId(vendorId) {
  return {
    type: OPEN_MODAL_WITH_VENDOR_ID,
    vendorId,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function submitVendorStudies(vendorId, studies) {
  return {
    type: SUBMIT_VENDOR_STUDIES,
    vendorId,
    studies,
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
