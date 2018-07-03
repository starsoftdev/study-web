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
  UPDATE_THANK_YOU_PAGE,
  UPDATE_THANK_YOU_PAGE_SUCCESS,
  UPDATE_THANK_YOU_PAGE_ERROR,
  RESET_THANK_YOU_PAGE_STATE,
  FETCH_LANDING,
  FETCH_LANDING_SUCCESS,
  FETCH_LANDING_ERROR,
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

export function updateThankYouPage(params) {
  return {
    type: UPDATE_THANK_YOU_PAGE,
    params,
  };
}

export function updateThankYouPageSuccess(payload) {
  return {
    type: UPDATE_THANK_YOU_PAGE_SUCCESS,
    payload,
  };
}

export function updateThankYouPageError(payload) {
  return {
    type: UPDATE_THANK_YOU_PAGE_ERROR,
    payload,
  };
}

export function resetThankYouPageState() {
  return {
    type: RESET_THANK_YOU_PAGE_STATE,
  };
}

export function fetchLanding(studyId, utm) {
  return {
    type: FETCH_LANDING,
    studyId,
    utm,
  };
}

export function landingFetched(payload) {
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
