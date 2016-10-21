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
  FETCH_STUDY_VIEWS_SUCCESS,
  FETCH_STUDY_PATIENT_REFERRALS_SUCCESS,
  FETCH_STUDY_CALLS_SUCCESS,
  FETCH_STUDY_TEXTS_SUCCESS,
  FETCH_SITE_SUCCESS,
  FETCH_SOURCES_SUCCESS,
  FETCH_STUDY_SUCCESS,
  SET_STUDY_ID,
  SET_SITE_ID,
  SET_CURRENT_PATIENT_ID,
  SET_CURRENT_PATIENT_CATEGORY_ID,
  SUBMIT_PATIENT_UPDATE,
  SUBMIT_PATIENT_NOTE,
  SUBMIT_DELETE_NOTE,
  SUBMIT_DELETE_NOTE_SUCCESS,
  SUBMIT_PATIENT_TEXT,
  UPDATE_PATIENT_SUCCESS,
  ADD_PATIENT_NOTE_SUCCESS,
  ADD_PATIENT_TEXT_SUCCESS,
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

export function setStudyId(id) {
  return {
    type: SET_STUDY_ID,
    id,
  };
}

export function setSiteId(id) {
  return {
    type: SET_SITE_ID,
    id,
  };
}

export function patientsFetched(payload) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload,
  };
}

export function fetchPatientDetails(patientId) {
  return {
    type: FETCH_PATIENT_DETAILS,
    patientId,
  };
}

export function patientDetailsFetched(payload) {
  return {
    type: FETCH_PATIENT_DETAILS_SUCCESS,
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

export function studyViewsStatFetched(payload) {
  return {
    type: FETCH_STUDY_VIEWS_SUCCESS,
    payload,
  };
}

export function patientReferralStatFetched(payload) {
  return {
    type: FETCH_STUDY_PATIENT_REFERRALS_SUCCESS,
    payload,
  };
}

export function callStatsFetched(payload) {
  return {
    type: FETCH_STUDY_CALLS_SUCCESS,
    payload,
  };
}

export function textStatsFetched(payload) {
  return {
    type: FETCH_STUDY_TEXTS_SUCCESS,
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

export function submitPatientUpdate(patientId, fields) {
  return {
    type: SUBMIT_PATIENT_UPDATE,
    patientId,
    fields,
  };
}

export function updatePatientSuccess(payload) {
  return {
    type: UPDATE_PATIENT_SUCCESS,
    payload,
  };
}

export function addPatientNoteSuccess(currentUser, payload) {
  return {
    type: ADD_PATIENT_NOTE_SUCCESS,
    currentUser,
    payload,
  };
}

export function addPatientTextSuccess(payload) {
  return {
    type: ADD_PATIENT_TEXT_SUCCESS,
    payload,
  };
}

export function submitTextBlast(patients, onClose) {
  return {
    type: SUBMIT_TEXT_BLAST,
    patients,
    onClose,
  };
}

export function submitPatientNote(studyId, patientId, currentUser, note) {
  return {
    type: SUBMIT_PATIENT_NOTE,
    studyId,
    patientId,
    currentUser,
    note,
  };
}

export function submitDeleteNote(patientId, noteId) {
  return {
    type: SUBMIT_DELETE_NOTE,
    patientId,
    noteId,
  };
}

export function deletePatientNoteSuccess(noteId) {
  return {
    type: SUBMIT_DELETE_NOTE_SUCCESS,
    noteId,
  };
}

export function submitPatientText(studyId, patientId, text) {
  return {
    type: SUBMIT_PATIENT_TEXT,
    studyId,
    patientId,
    text,
  };
}

export function submitPatientImport(studyId, file, onClose) {
  return {
    type: SUBMIT_PATIENT_IMPORT,
    studyId,
    file,
    onClose,
  };
}

export function submitAddPatient(patient, onClose) {
  return {
    type: SUBMIT_ADD_PATIENT,
    patient,
    onClose,
  };
}
