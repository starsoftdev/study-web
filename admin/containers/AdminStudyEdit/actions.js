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
  DELETE_MEDIA_TYPE,
  DELETE_MEDIA_TYPE_SUCCESS,

  EDIT_MEDIA_TYPES,
  EDIT_MEDIA_TYPES_ERROR,
  EDIT_MEDIA_TYPES_SUCCESS,
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

export function deleteMediaType(studyId, studySourceId, index) {
  return {
    type: DELETE_MEDIA_TYPE,
    studyId,
    studySourceId,
    index,
  };
}

export function deleteMediaTypeSuccess(index) {
  return {
    type: DELETE_MEDIA_TYPE_SUCCESS,
    index,
  };
}


export function editMediaTypes(studyId, mediaTypes, mediaTracking) {
  return {
    type: EDIT_MEDIA_TYPES,
    studyId,
    mediaTypes,
    mediaTracking,
  };
}

export function editMediaTypesSuccess(mediaTypes, studyId, mediaTracking) {
  return {
    type: EDIT_MEDIA_TYPES_SUCCESS,
    mediaTypes,
    studyId,
    mediaTracking,
  };
}

export function editMediaTypesError(payload) {
  return {
    type: EDIT_MEDIA_TYPES_ERROR,
    payload,
  };
}

