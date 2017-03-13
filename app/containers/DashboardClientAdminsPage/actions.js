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
  FETCH_SITES,
  FETCH_SITES_SUCCESS,
  FETCH_SITES_ERROR,
  GET_AVAIL_PHONE_NUMBERS,
  GET_AVAIL_PHONE_NUMBERS_ERROR,
  GET_AVAIL_PHONE_NUMBERS_SUCCESS,
  EDIT_MESSAGING_NUMBER,
  EDIT_MESSAGING_NUMBER_SUCCESS,
  EDIT_MESSAGING_NUMBER_ERROR,
} from './constants';

export function editMessagingNumber(payload) {
  return {
    type: EDIT_MESSAGING_NUMBER,
    payload,
  };
}

export function editMessagingNumberSuccess(payload) {
  return {
    type: EDIT_MESSAGING_NUMBER_SUCCESS,
    payload,
  };
}

export function editMessagingNumberError(payload) {
  return {
    type: EDIT_MESSAGING_NUMBER_ERROR,
    payload,
  };
}

export function getAvailPhoneNumbers() {
  return {
    type: GET_AVAIL_PHONE_NUMBERS,
  };
}

export function getAvailPhoneNumbersSuccess(payload) {
  return {
    type: GET_AVAIL_PHONE_NUMBERS_SUCCESS,
    payload,
  };
}

export function getAvailPhoneNumbersError(payload) {
  return {
    type: GET_AVAIL_PHONE_NUMBERS_ERROR,
    payload,
  };
}

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

export function fetchSites(payload) {
  return {
    type: FETCH_SITES,
    payload,
  };
}

export function fetchSitesSuccess(payload) {
  return {
    type: FETCH_SITES_SUCCESS,
    payload,
  };
}

export function fetchSitesError(payload) {
  return {
    type: FETCH_SITES_ERROR,
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

