/*
 *
 * DashboardIndicationPage actions
 *
 */

import {
  FETCH_INDICATIONS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_INDICATIONS_ERROR,
  ADD_INDICATION,
  ADD_INDICATION_SUCCESS,
  ADD_INDICATION_ERROR,
  EDIT_INDICATION,
  EDIT_INDICATION_SUCCESS,
  EDIT_INDICATION_ERROR,
  DELETE_INDICATION,
  DELETE_INDICATION_SUCCESS,
  DELETE_INDICATION_ERROR,
  SET_ACTIVE_SORT,
  FETCH_LEVELS,
  FETCH_LEVELS_SUCCESS,
  FETCH_LEVELS_ERROR,
  ADD_LEVEL,
  ADD_LEVEL_SUCCESS,
  ADD_LEVEL_ERROR,
} from './constants';

export function fetchIndications() {
  return {
    type: FETCH_INDICATIONS,
  };
}

export function fetchIndicationsSuccess(payload) {
  return {
    type: FETCH_INDICATIONS_SUCCESS,
    payload,
  };
}

export function fetchIndicationsError(payload) {
  return {
    type: FETCH_INDICATIONS_ERROR,
    payload,
  };
}

export function fetchLevels() {
  return {
    type: FETCH_LEVELS,
  };
}

export function fetchLevelsSuccess(payload) {
  return {
    type: FETCH_LEVELS_SUCCESS,
    payload,
  };
}

export function fetchLevelsError(payload) {
  return {
    type: FETCH_LEVELS_ERROR,
    payload,
  };
}

export function addLevel(payload) {
  return {
    type: ADD_LEVEL,
    payload,
  };
}

export function addLevelSuccess(payload) {
  return {
    type: ADD_LEVEL_SUCCESS,
    payload,
  };
}

export function addLevelError(payload) {
  return {
    type: ADD_LEVEL_ERROR,
    payload,
  };
}

export function addIndication(payload) {
  return {
    type: ADD_INDICATION,
    payload,
  };
}

export function addIndicationSuccess(payload) {
  return {
    type: ADD_INDICATION_SUCCESS,
    payload,
  };
}

export function addIndicationError(payload) {
  return {
    type: ADD_INDICATION_ERROR,
    payload,
  };
}

export function editIndication(payload) {
  return {
    type: EDIT_INDICATION,
    payload,
  };
}

export function editIndicationSuccess(payload) {
  return {
    type: EDIT_INDICATION_SUCCESS,
    payload,
  };
}

export function editIndicationError(payload) {
  return {
    type: EDIT_INDICATION_ERROR,
    payload,
  };
}

export function deleteIndication(payload) {
  return {
    type: DELETE_INDICATION,
    payload,
  };
}

export function deleteIndicationSuccess(payload) {
  return {
    type: DELETE_INDICATION_SUCCESS,
    payload,
  };
}

export function deleteIndicationError(payload) {
  return {
    type: DELETE_INDICATION_ERROR,
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
