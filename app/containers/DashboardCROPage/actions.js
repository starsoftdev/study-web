/*
 *
 * DashboardCROPage actions
 *
 */

import {
  FETCH_CRO,
  FETCH_CRO_SUCCESS,
  FETCH_CRO_ERROR,
  ADD_CRO,
  ADD_CRO_SUCCESS,
  ADD_CRO_ERROR,
  EDIT_CRO,
  EDIT_CRO_SUCCESS,
  EDIT_CRO_ERROR,
  DELETE_CRO,
  DELETE_CRO_SUCCESS,
  DELETE_CRO_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

export function fetchCro() {
  return {
    type: FETCH_CRO,
  };
}

export function fetchCroSuccess(payload) {
  return {
    type: FETCH_CRO_SUCCESS,
    payload,
  };
}

export function fetchCroError(payload) {
  return {
    type: FETCH_CRO_ERROR,
    payload,
  };
}

export function addCro(payload) {
  return {
    type: ADD_CRO,
    payload,
  };
}

export function addCroSuccess(payload) {
  return {
    type: ADD_CRO_SUCCESS,
    payload,
  };
}

export function addCroError(payload) {
  return {
    type: ADD_CRO_ERROR,
    payload,
  };
}

export function editCro(payload) {
  return {
    type: EDIT_CRO,
    payload,
  };
}

export function editCroSuccess(payload) {
  return {
    type: EDIT_CRO_SUCCESS,
    payload,
  };
}

export function editCroError(payload) {
  return {
    type: EDIT_CRO_ERROR,
    payload,
  };
}

export function deleteCro(payload) {
  return {
    type: DELETE_CRO,
    payload,
  };
}

export function deleteCroSuccess(payload) {
  return {
    type: DELETE_CRO_SUCCESS,
    payload,
  };
}

export function deleteCroError(payload) {
  return {
    type: DELETE_CRO_ERROR,
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
