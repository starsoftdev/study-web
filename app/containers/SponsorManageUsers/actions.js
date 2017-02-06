/*
 *
 * SponsorManageUsers actions
 *
 */

import {
  FETCH_MANAGE_SPONSOR_USERS_DATA,
  FETCH_MANAGE_SPONSOR_USERS_DATA_SUCCESS,
  FETCH_MANAGE_SPONSOR_USERS_DATA_ERROR,
  EDIT_SPONSOR_USER,
  EDIT_SPONSOR_USER_SUCCESS,
  EDIT_SPONSOR_USER_ERROR,
  DELETE_SPONSOR_USER,
  DELETE_SPONSOR_USER_SUCCESS,
  DELETE_SPONSOR_USER_ERROR,
  SET_ACTIVE_ADMIN_SORT,
  SET_ACTIVE_PROTOCOLS_SORT,
  EDIT_PROTOCOL,
  EDIT_PROTOCOL_SUCCESS,
  EDIT_PROTOCOL_ERROR,
} from './constants';

export function fetchManageSponsorUsersData(searchParams) {
  return {
    type: FETCH_MANAGE_SPONSOR_USERS_DATA,
    searchParams,
  };
}

export function fetchManageSponsorUsersDataSuccess(payload) {
  return {
    type: FETCH_MANAGE_SPONSOR_USERS_DATA_SUCCESS,
    payload,
  };
}

export function fetchManageSponsorUsersDataError(payload) {
  return {
    type: FETCH_MANAGE_SPONSOR_USERS_DATA_ERROR,
    payload,
  };
}

export function editSponsorUser(params) {
  return {
    type: EDIT_SPONSOR_USER,
    params,
  };
}

export function editSponsorUserSuccess(payload) {
  return {
    type: EDIT_SPONSOR_USER_SUCCESS,
    payload,
  };
}

export function editSponsorUserError(payload) {
  return {
    type: EDIT_SPONSOR_USER_ERROR,
    payload,
  };
}

export function deleteSponsorUser(params) {
  return {
    type: DELETE_SPONSOR_USER,
    params,
  };
}

export function deleteSponsorUserSuccess(payload) {
  return {
    type: DELETE_SPONSOR_USER_SUCCESS,
    payload,
  };
}

export function deleteSponsorUserError(payload) {
  return {
    type: DELETE_SPONSOR_USER_ERROR,
    payload,
  };
}

export function setActiveAdminSort(sort, direction) {
  return {
    type: SET_ACTIVE_ADMIN_SORT,
    sort,
    direction,
  };
}

export function setActiveProtocolsSort(sort, direction) {
  return {
    type: SET_ACTIVE_PROTOCOLS_SORT,
    sort,
    direction,
  };
}

export function editProtocol(payload) {
  return {
    type: EDIT_PROTOCOL,
    payload,
  };
}

export function editProtocolSuccess(sort, direction) {
  return {
    type: EDIT_PROTOCOL_SUCCESS,
    sort,
    direction,
  };
}

export function editProtocolError(sort, direction) {
  return {
    type: EDIT_PROTOCOL_ERROR,
    sort,
    direction,
  };
}
