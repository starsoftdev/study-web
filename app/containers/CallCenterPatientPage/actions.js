import {
  FETCH_PATIENT,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_ERROR,

  FETCH_CALL_CENTER_PATIENT_CATEGORIES,
  FETCH_CALL_CENTER_PATIENT_CATEGORIES_SUCCESS,
  FETCH_CALL_CENTER_PATIENT_CATEGORIES_ERROR,

  ADD_PATIENT_NOTE_SUCCESS,

  READ_STUDY_PATIENT_MESSAGES,
  READ_STUDY_PATIENT_MESSAGES_SUCCESS,
  READ_STUDY_PATIENT_MESSAGES_ERROR,

  SUBMIT_PATIENT_UPDATE,
  SUBMIT_PATIENT_NOTE,
  SUBMIT_DELETE_NOTE,
  SUBMIT_DELETE_NOTE_SUCCESS,

  SUBMIT_EMAIL,
  SUBMIT_EMAIL_SUCCESS,
  FETCH_EMAILS,
  FETCH_EMAILS_SUCCESS,
  FETCH_EMAILS_ERROR,

  UPDATE_PATIENT_SUCCESS,

  SUBMIT_PATIENT_DISPOSITION,
  SUBMIT_PATIENT_DISPOSITION_SUCCESS,
  SUBMIT_PATIENT_DISPOSITION_ERROR,

} from './constants';

export function fetchPatient(id) {
  return {
    type: FETCH_PATIENT,
    id,
  };
}

export function patientFetched(payload) {
  return {
    type: FETCH_PATIENT_SUCCESS,
    payload,
  };
}

export function patientFetchingError(payload) {
  return {
    type: FETCH_PATIENT_ERROR,
    payload,
  };
}

export function fetchCallCenterPatientCategories(payload) {
  return {
    type: FETCH_CALL_CENTER_PATIENT_CATEGORIES,
    payload,
  };
}
export function callCenterPatientCategoriesFetched(payload) {
  return {
    type: FETCH_CALL_CENTER_PATIENT_CATEGORIES_SUCCESS,
    payload,
  };
}
export function callCenterPatientCategoriesFetchingError(payload) {
  return {
    type: FETCH_CALL_CENTER_PATIENT_CATEGORIES_ERROR,
    payload,
  };
}

export function readStudyPatientMessages(patientId) {
  return {
    type: READ_STUDY_PATIENT_MESSAGES,
    patientId,
  };
}

export function readStudyPatientMessagesSuccess(payload) {
  return {
    type: READ_STUDY_PATIENT_MESSAGES_SUCCESS,
    payload,
  };
}

export function readStudyPatientMessagesError(payload) {
  return {
    type: READ_STUDY_PATIENT_MESSAGES_ERROR,
    payload,
  };
}

export function submitPatientUpdate(payload) {
  return {
    type: SUBMIT_PATIENT_UPDATE,
    payload,
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

export function addPatientNoteSuccess(currentUser, payload) {
  return {
    type: ADD_PATIENT_NOTE_SUCCESS,
    currentUser,
    payload,
  };
}

export function submitEmail(studyId, patientId, currentUser, email, message, subject) {
  return {
    type: SUBMIT_EMAIL,
    studyId,
    patientId,
    currentUser,
    email,
    message,
    subject,
  };
}

export function submitEmailSuccess(payload) {
  return {
    type: SUBMIT_EMAIL_SUCCESS,
    payload,
  };
}

export function fetchEmails(studyId, patientId) {
  return {
    type: FETCH_EMAILS,
    studyId,
    patientId,
  };
}

export function emailsFetched(payload) {
  return {
    type: FETCH_EMAILS_SUCCESS,
    payload,
  };
}

export function emailsFetchError(payload) {
  return {
    type: FETCH_EMAILS_ERROR,
    payload,
  };
}

export function updatePatientSuccess(payload) {
  return {
    type: UPDATE_PATIENT_SUCCESS,
    payload,
  };
}

export function submitPatientDisposition(payload) {
  return {
    type: SUBMIT_PATIENT_DISPOSITION,
    payload,
  };
}

export function patientDispositionSubmitted(payload) {
  return {
    type: SUBMIT_PATIENT_DISPOSITION_SUCCESS,
    payload,
  };
}

export function patientDispositionSubmissionError(payload) {
  return {
    type: SUBMIT_PATIENT_DISPOSITION_ERROR,
    payload,
  };
}
