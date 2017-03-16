/*
 *
 * DashboardExposureLevelPage actions
 *
 */

import {
  FETCH_LEVEL,
  FETCH_LEVEL_SUCCESS,
  FETCH_LEVEL_ERROR,
  ADD_LEVEL,
  ADD_LEVEL_SUCCESS,
  ADD_LEVEL_ERROR,
  EDIT_LEVEL,
  EDIT_LEVEL_SUCCESS,
  EDIT_LEVEL_ERROR,
  DELETE_LEVEL,
  DELETE_LEVEL_SUCCESS,
  DELETE_LEVEL_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

export function fetchLevel() {
  return {
    type: FETCH_LEVEL,
  };
}

export function fetchLevelSuccess(payload) {
  return {
    type: FETCH_LEVEL_SUCCESS,
    payload,
  };
}

export function fetchLevelError(payload) {
  return {
    type: FETCH_LEVEL_ERROR,
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

export function editLevel(payload) {
  return {
    type: EDIT_LEVEL,
    payload,
  };
}

export function editLevelSuccess(payload) {
  return {
    type: EDIT_LEVEL_SUCCESS,
    payload,
  };
}

export function editLevelError(payload) {
  return {
    type: EDIT_LEVEL_ERROR,
    payload,
  };
}

export function deleteLevel(payload) {
  return {
    type: DELETE_LEVEL,
    payload,
  };
}

export function deleteLevelSuccess(payload) {
  return {
    type: DELETE_LEVEL_SUCCESS,
    payload,
  };
}

export function deleteLevelError(payload) {
  return {
    type: DELETE_LEVEL_ERROR,
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
