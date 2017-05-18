/*
 *
 * DashboardNotePage actions
 *
 */

import {
  FETCH_NOTE,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_ERROR,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_ERROR,
  EDIT_NOTE,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_ERROR,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

export function fetchNote() {
  return {
    type: FETCH_NOTE,
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

export function editNote(payload) {
  return {
    type: EDIT_NOTE,
    payload,
  };
}

export function editNoteSuccess(payload) {
  return {
    type: EDIT_NOTE_SUCCESS,
    payload,
  };
}

export function editNoteError(payload) {
  return {
    type: EDIT_NOTE_ERROR,
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

export function setActiveSort(sort, direction) {
  return {
    type: SET_ACTIVE_SORT,
    sort,
    direction,
  };
}
