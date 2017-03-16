/*
 *
 * DashboardProtocolPage actions
 *
 */

import {
  FETCH_PROTOCOL,
  FETCH_PROTOCOL_SUCCESS,
  FETCH_PROTOCOL_ERROR,
  ADD_PROTOCOL,
  ADD_PROTOCOL_SUCCESS,
  ADD_PROTOCOL_ERROR,
  EDIT_PROTOCOL,
  EDIT_PROTOCOL_SUCCESS,
  EDIT_PROTOCOL_ERROR,
  DELETE_PROTOCOL,
  DELETE_PROTOCOL_SUCCESS,
  DELETE_PROTOCOL_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

export function fetchProtocol() {
  return {
    type: FETCH_PROTOCOL,
  };
}

export function fetchProtocolSuccess(payload) {
  return {
    type: FETCH_PROTOCOL_SUCCESS,
    payload,
  };
}

export function fetchProtocolError(payload) {
  return {
    type: FETCH_PROTOCOL_ERROR,
    payload,
  };
}

export function addProtocol(payload) {
  return {
    type: ADD_PROTOCOL,
    payload,
  };
}

export function addProtocolSuccess(payload) {
  return {
    type: ADD_PROTOCOL_SUCCESS,
    payload,
  };
}

export function addProtocolError(payload) {
  return {
    type: ADD_PROTOCOL_ERROR,
    payload,
  };
}

export function editProtocol(payload) {
  return {
    type: EDIT_PROTOCOL,
    payload,
  };
}

export function editProtocolSuccess(payload) {
  return {
    type: EDIT_PROTOCOL_SUCCESS,
    payload,
  };
}

export function editProtocolError(payload) {
  return {
    type: EDIT_PROTOCOL_ERROR,
    payload,
  };
}

export function deleteProtocol(payload) {
  return {
    type: DELETE_PROTOCOL,
    payload,
  };
}

export function deleteProtocolSuccess(payload) {
  return {
    type: DELETE_PROTOCOL_SUCCESS,
    payload,
  };
}

export function deleteProtocolError(payload) {
  return {
    type: DELETE_PROTOCOL_ERROR,
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
