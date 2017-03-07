/*
 *
 * DashboardSponsorAdminPage actions
 *
 */

import {
  FETCH_SPONSORS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_SPONSORS_ERROR,
  FETCH_SPONSORS_WITHOUT_ADMIN,
  FETCH_SPONSORS_WITHOUT_ADMIN_SUCCESS,
  FETCH_SPONSORS_WITHOUT_ADMIN_ERROR,
  FETCH_USERS_BY_ROLES,
  FETCH_USERS_BY_ROLES_SUCCESS,
  FETCH_USERS_BY_ROLES_ERROR,
  ADD_SPONSOR_ADMIN,
  ADD_SPONSOR_ADMIN_SUCCESS,
  ADD_SPONSOR_ADMIN_ERROR,
  EDIT_SPONSOR_ADMIN,
  EDIT_SPONSOR_ADMIN_SUCCESS,
  EDIT_SPONSOR_ADMIN_ERROR,
  DELETE_SPONSOR_ADMIN,
  DELETE_SPONSOR_ADMIN_SUCCESS,
  DELETE_SPONSOR_ADMIN_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

export function fetchSponsors() {
  return {
    type: FETCH_SPONSORS,
  };
}

export function fetchSponsorsSuccess(payload) {
  return {
    type: FETCH_SPONSORS_SUCCESS,
    payload,
  };
}

export function fetchSponsorsError(payload) {
  return {
    type: FETCH_SPONSORS_ERROR,
    payload,
  };
}

export function fetchSponsorsWithoutAdmin() {
  return {
    type: FETCH_SPONSORS_WITHOUT_ADMIN,
  };
}

export function fetchSponsorsWithoutAdminSuccess(payload) {
  return {
    type: FETCH_SPONSORS_WITHOUT_ADMIN_SUCCESS,
    payload,
  };
}

export function fetchSponsorsWithoutAdminError(payload) {
  return {
    type: FETCH_SPONSORS_WITHOUT_ADMIN_ERROR,
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

export function addSponsorAdmin(payload) {
  return {
    type: ADD_SPONSOR_ADMIN,
    payload,
  };
}

export function addSponsorAdminSuccess(payload) {
  return {
    type: ADD_SPONSOR_ADMIN_SUCCESS,
    payload,
  };
}

export function addSponsorAdminError(payload) {
  return {
    type: ADD_SPONSOR_ADMIN_ERROR,
    payload,
  };
}

export function editSponsorAdmin(payload) {
  return {
    type: EDIT_SPONSOR_ADMIN,
    payload,
  };
}

export function editSponsorAdminSuccess(payload) {
  return {
    type: EDIT_SPONSOR_ADMIN_SUCCESS,
    payload,
  };
}

export function editSponsorAdminError(payload) {
  return {
    type: EDIT_SPONSOR_ADMIN_ERROR,
    payload,
  };
}

export function deleteSponsorAdmin(payload) {
  return {
    type: DELETE_SPONSOR_ADMIN,
    payload,
  };
}

export function deleteSponsorAdminSuccess(payload) {
  return {
    type: DELETE_SPONSOR_ADMIN_SUCCESS,
    payload,
  };
}

export function deleteSponsorAdminError(payload) {
  return {
    type: DELETE_SPONSOR_ADMIN_ERROR,
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
