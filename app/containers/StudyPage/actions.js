/*
 *
 * ProfilePage actions
 *
 */

import {
  FETCH_CAMPAIGNS_SUCCESS,
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENT_DETAILS,
  FETCH_PATIENT_DETAILS_SUCCESS,
  FETCH_PATIENT_CATEGORIES,
  FETCH_PATIENT_CATEGORIES_SUCCESS,
  FETCH_STUDY,
  FETCH_SITE_SUCCESS,
  FETCH_SOURCES_SUCCESS,
  FETCH_STUDY_SUCCESS,
  SET_CURRENT_PATIENT_ID,
  SET_CURRENT_PATIENT_CATEGORY_ID,
  SUBMIT_PATIENT_UPDATE,
  UPDATE_PATIENT_SUCCESS,
  SUBMIT_TEXT_BLAST,
  SUBMIT_PATIENT_IMPORT,
  SUBMIT_ADD_PATIENT,
} from './constants';

export function campaignsFetched(payload) {
  return {
    type: FETCH_CAMPAIGNS_SUCCESS,
    payload,
  };
}

export function fetchPatients(studyId, siteId, text, campaignId, sourceId) {
  return {
    type: FETCH_PATIENTS,
    studyId,
    siteId,
    text,
    campaignId,
    sourceId,
  };
}

export function patientsFetched(payload) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload,
  };
}

export function fetchPatientDetails(categoryId, patient) {
  return {
    type: FETCH_PATIENT_DETAILS,
    categoryId,
    patient,
  };
}

export function patientDetailsFetched(patientCategoryId, patientId, payload) {
  return {
    type: FETCH_PATIENT_DETAILS_SUCCESS,
    patientCategoryId,
    patientId,
    payload,
  };
}

export function fetchPatientCategories(studyId, siteId) {
  return {
    type: FETCH_PATIENT_CATEGORIES,
    studyId,
    siteId,
  };
}

export function patientCategoriesFetched(payload) {
  return {
    type: FETCH_PATIENT_CATEGORIES_SUCCESS,
    payload,
  };
}

export function fetchStudy(studyId, siteId) {
  return {
    type: FETCH_STUDY,
    studyId,
    siteId,
  };
}

export function siteFetched(payload) {
  return {
    type: FETCH_SITE_SUCCESS,
    payload,
  };
}

export function sourcesFetched(payload) {
  return {
    type: FETCH_SOURCES_SUCCESS,
    payload,
  };
}

export function studyFetched(payload) {
  return {
    type: FETCH_STUDY_SUCCESS,
    payload,
  };
}
export function setCurrentPatientId(id) {
  return {
    type: SET_CURRENT_PATIENT_ID,
    id,
  };
}

export function setCurrentPatientCategoryId(id) {
  return {
    type: SET_CURRENT_PATIENT_CATEGORY_ID,
    id,
  };
}

export function submitPatientUpdate(id, fields) {
  return {
    type: SUBMIT_PATIENT_UPDATE,
    id,
    fields,
  };
}

export function updatePatientSuccess(payload) {
  return {
    type: UPDATE_PATIENT_SUCCESS,
    payload,
  };
}

export function submitTextBlast(patients, onClose) {
  return {
    type: SUBMIT_TEXT_BLAST,
    patients,
    onClose
  };
}

export function submitPatientImport(file, onClose) {
  return {
    type: SUBMIT_PATIENT_IMPORT,
    file,
    onClose
  };
}

export function submitAddPatient(patient, onClose) {
  return {
    type: SUBMIT_ADD_PATIENT,
    patient,
    onClose
  };
}
