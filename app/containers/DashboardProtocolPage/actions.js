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
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  SET_ACTIVE_SORT,
  SET_SEARCH_QUERY,
} from './constants';

export function fetchProtocol(query, limit, offset) {
  return {
    type: FETCH_PROTOCOL,
    query,
    limit,
    offset,
  };
}

export function fetchProtocolSuccess(payload, hasMoreItems, page) {
  return {
    type: FETCH_PROTOCOL_SUCCESS,
    payload,
    hasMoreItems,
    page,
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

export function uploadFile(payload) {
  return {
    type: UPLOAD_FILE,
    payload,
  };
}

export function uploadFileSuccess(payload) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    payload,
  };
}

export function uploadFileError(payload) {
  return {
    type: UPLOAD_FILE_ERROR,
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

export function setSearchQuery(query) {
  return {
    type: SET_SEARCH_QUERY,
    query,
  };
}
