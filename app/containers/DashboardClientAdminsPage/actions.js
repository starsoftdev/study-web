/*
 *
 * DashboardClientAdminsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_CLIENT_ADMINS,
  FETCH_CLIENT_ADMINS_SUCCESS,
  FETCH_CLIENT_ADMINS_ERROR,
  ADD_CLIENT_ADMINS,
  ADD_CLIENT_ADMINS_SUCCESS,
  ADD_CLIENT_ADMINS_ERROR,
  EDIT_CLIENT_ADMINS,
  EDIT_CLIENT_ADMINS_SUCCESS,
  EDIT_CLIENT_ADMINS_ERROR,
  DELETE_CLIENT_ADMINS,
  DELETE_CLIENT_ADMINS_SUCCESS,
  DELETE_CLIENT_ADMINS_ERROR,
  FETCH_USERS_BY_ROLES,
  FETCH_USERS_BY_ROLES_SUCCESS,
  FETCH_USERS_BY_ROLES_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

export function fetchClientAdmin(payload) {
  return {
    type: FETCH_CLIENT_ADMINS,
    payload,
  };
}

export function fetchClientAdminSuccess(payload) {
  return {
    type: FETCH_CLIENT_ADMINS_SUCCESS,
    payload,
  };
}

export function fetchClientAdminError(payload) {
  return {
    type: FETCH_CLIENT_ADMINS_ERROR,
    payload,
  };
}

export function addClientAdmin(payload) {
  return {
    type: ADD_CLIENT_ADMINS,
    payload,
  };
}

export function addClientAdminSuccess(payload) {
  return {
    type: ADD_CLIENT_ADMINS_SUCCESS,
    payload,
  };
}

export function addClientAdminError(payload) {
  return {
    type: ADD_CLIENT_ADMINS_ERROR,
    payload,
  };
}

export function editClientAdmin(payload) {
  return {
    type: EDIT_CLIENT_ADMINS,
    payload,
  };
}

export function editClientAdminSuccess(payload) {
  return {
    type: EDIT_CLIENT_ADMINS_SUCCESS,
    payload,
  };
}

export function editClientAdminError(payload) {
  return {
    type: EDIT_CLIENT_ADMINS_ERROR,
    payload,
  };
}

export function deleteClientAdmin(payload) {
  return {
    type: DELETE_CLIENT_ADMINS,
    payload,
  };
}

export function deleteClientAdminSuccess(payload) {
  return {
    type: DELETE_CLIENT_ADMINS_SUCCESS,
    payload,
  };
}

export function deleteClientAdminError(payload) {
  return {
    type: DELETE_CLIENT_ADMINS_ERROR,
    payload,
  };
}

export function fetchUsersByRoles() {
  return {
    type: FETCH_USERS_BY_ROLES,
  };
}

export function fetchUsersByRolesSuccess(payload) {
  return {
    type: FETCH_USERS_BY_ROLES_SUCCESS,
    payload,
  };
}

export function fetchUsersByRolesError(payload) {
  return {
    type: FETCH_USERS_BY_ROLES_ERROR,
    payload,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function setActiveSort(sort, direction) {
  return {
    type: SET_ACTIVE_SORT,
    sort,
    direction,
  };
}

