/*
 *
 * DashboardManageUsers actions
 *
 */

import {
  FETCH_ADMINS,
  FETCH_ADMINS_SUCCESS,
  FETCH_ADMINS_ERROR,
  FETCH_ADMIN_ROLES,
  FETCH_ADMIN_ROLES_SUCCESS,
  FETCH_ADMIN_ROLES_ERROR,
  EDIT_DASHBOARD_USER,
  EDIT_DASHBOARD_USER_SUCCESS,
  EDIT_DASHBOARD_USER_ERROR,
  DELETE_DASHBOARD_USER,
  DELETE_DASHBOARD_USER_SUCCESS,
  DELETE_DASHBOARD_USER_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

export function fetchAdmins() {
  return {
    type: FETCH_ADMINS,
  };
}

export function fetchAdminsSuccess(payload) {
  return {
    type: FETCH_ADMINS_SUCCESS,
    payload,
  };
}

export function fetchAdminsError(payload) {
  return {
    type: FETCH_ADMINS_ERROR,
    payload,
  };
}

export function fetchAdminRoles() {
  return {
    type: FETCH_ADMIN_ROLES,
  };
}

export function fetchAdminRolesSuccess(payload) {
  return {
    type: FETCH_ADMIN_ROLES_SUCCESS,
    payload,
  };
}

export function fetchAdminRolesError(payload) {
  return {
    type: FETCH_ADMIN_ROLES_ERROR,
    payload,
  };
}

export function editDashboardUser(payload) {
  return {
    type: EDIT_DASHBOARD_USER,
    payload,
  };
}

export function editDashboardUserSuccess(payload) {
  return {
    type: EDIT_DASHBOARD_USER_SUCCESS,
    payload,
  };
}

export function editDashboardUserError(payload) {
  return {
    type: EDIT_DASHBOARD_USER_ERROR,
    payload,
  };
}

export function deleteDashboardUser(payload) {
  return {
    type: DELETE_DASHBOARD_USER,
    payload,
  };
}

export function deleteDashboardUserSuccess(payload) {
  return {
    type: DELETE_DASHBOARD_USER_SUCCESS,
    payload,
  };
}

export function deleteDashboardUserError(payload) {
  return {
    type: DELETE_DASHBOARD_USER_ERROR,
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
