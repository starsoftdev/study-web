/*
 *
 * adminHome actions
 *
 */

import {
  FETCH_NOTE,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_ERROR,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_ERROR,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  FETCH_LANDING,
  FETCH_LANDING_SUCCESS,
  FETCH_LANDING_ERROR,
  EDIT_PATIENT_THANK_YOU,
  EDIT_PATIENT_THANK_YOU_SUCCESS,
  EDIT_PATIENT_THANK_YOU_ERROR,
} from './constants';

export function fetchNote(studyId) {
  return {
    type: FETCH_NOTE,
    studyId,
  };
}

export function fetchNoteSuccess(payload) {
  return {
    type: FETCH_NOTE_SUCCESS,
    payload,
  };
}

export function fetchNoteError(payload) {
  return {
    type: FETCH_NOTE_ERROR,
    payload,
  };
}

export function addNote(payload) {
  return {
    type: ADD_NOTE,
    payload,
  };
}

export function addNoteSuccess(payload) {
  return {
    type: ADD_NOTE_SUCCESS,
    payload,
  };
}

export function addNoteError(payload) {
  return {
    type: ADD_NOTE_ERROR,
    payload,
  };
}

export function deleteNote(payload) {
  return {
    type: DELETE_NOTE,
    payload,
  };
}

export function deleteNoteSuccess(payload) {
  return {
    type: DELETE_NOTE_SUCCESS,
    payload,
  };
}

export function deleteNoteError(payload) {
  return {
    type: DELETE_NOTE_ERROR,
    payload,
  };
}

export function fetchLanding(studyId, utm) {
  return {
    type: FETCH_LANDING,
    studyId,
    utm,
  };
}

export function fetchLandingSuccess(payload) {
  return {
    type: FETCH_LANDING_SUCCESS,
    payload,
  };
}

export function fetchLandingError(payload) {
  return {
    type: FETCH_LANDING_ERROR,
    payload,
  };
}

export function updatePatientThankYouEmail(params) {
  return {
    type: EDIT_PATIENT_THANK_YOU,
    params,
  };
}

export function updatePatientThankYouEmailSuccess(payload) {
  return {
    type: EDIT_PATIENT_THANK_YOU_SUCCESS,
    payload,
  };
}

export function updatePatientThankYouEmailError(payload) {
  return {
    type: EDIT_PATIENT_THANK_YOU_ERROR,
    payload,
  };
}
