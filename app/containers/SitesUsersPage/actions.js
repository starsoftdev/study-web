/*
 *
 * Sites/Users page actions
 *
 */

import {
  FETCH_CLIENT_SITES,
  FETCH_CLIENT_SITES_SUCCESS,
  FETCH_CLIENT_SITES_ERROR,

  FETCH_CLIENT_ROLES,
  FETCH_CLIENT_ROLES_SUCCESS,
  FETCH_CLIENT_ROLES_ERROR,

  FETCH_SITE,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_ERROR,

  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,

  CLEAR_SELECTED_SITE,
  CLEAR_SELECTED_USER,

  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,

  DELETE_CLIENT_ROLE,
  DELETE_CLIENT_ROLE_SUCCESS,
  DELETE_CLIENT_ROLE_ERROR,

  SAVE_SITE,
  SAVE_SITE_SUCCESS,
  SAVE_SITE_ERROR,

  SAVE_USER,
  SAVE_USER_SUCCESS,
  SAVE_USER_ERROR,
} from './constants';

export function fetchClientSites(clientId, searchParams) {
  return {
    type: FETCH_CLIENT_SITES,
    clientId,
    searchParams,
  };
}

export function clientSitesFetched(payload) {
  return {
    type: FETCH_CLIENT_SITES_SUCCESS,
    payload,
  };
}

export function clientSitesFetchingError(payload) {
  return {
    type: FETCH_CLIENT_SITES_ERROR,
    payload,
  };
}

export function fetchClientRoles(clientId, searchParams) {
  return {
    type: FETCH_CLIENT_ROLES,
    clientId,
    searchParams,
  };
}

export function clientRolesFetched(payload) {
  return {
    type: FETCH_CLIENT_ROLES_SUCCESS,
    payload,
  };
}

export function clientRolesFetchingError(payload) {
  return {
    type: FETCH_CLIENT_ROLES_ERROR,
    payload,
  };
}

export function fetchSite(id) {
  return {
    type: FETCH_SITE,
    id,
  };
}

export function siteFetched(payload) {
  return {
    type: FETCH_SITE_SUCCESS,
    payload,
  };
}

export function siteFetchingError(payload) {
  return {
    type: FETCH_SITE_ERROR,
    payload,
  };
}

export function fetchUser(id) {
  return {
    type: FETCH_USER,
    id,
  };
}

export function userFetched(payload) {
  return {
    type: FETCH_USER_SUCCESS,
    payload,
  };
}

export function userFetchingError(payload) {
  return {
    type: FETCH_USER_ERROR,
    payload,
  };
}

export function clearSelectedSite() {
  return {
    type: CLEAR_SELECTED_SITE,
  };
}

export function clearSelectedUser() {
  return {
    type: CLEAR_SELECTED_USER,
  };
}

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    id,
  };
}

export function userDeleted(id, payload) {
  return {
    type: DELETE_USER_SUCCESS,
    payload: {
      ...payload,
      id,
    },
  };
}

export function userDeletingError(payload) {
  return {
    type: DELETE_USER_ERROR,
    payload,
  };
}

export function deleteClientRole(id) {
  return {
    type: DELETE_CLIENT_ROLE,
    id,
  };
}

export function clientRoleDeleted(id, payload) {
  return {
    type: DELETE_CLIENT_ROLE_SUCCESS,
    payload: {
      ...payload,
      id,
    },
  };
}

export function clientRoleDeletingError(payload) {
  return {
    type: DELETE_CLIENT_ROLE_ERROR,
    payload,
  };
}

export function saveSite(clientId, id, data) {
  return {
    type: SAVE_SITE,
    clientId,
    id,
    data,
  };
}

export function siteSaved(payload) {
  return {
    type: SAVE_SITE_SUCCESS,
    payload,
  };
}

export function siteSavingError(payload) {
  return {
    type: SAVE_SITE_ERROR,
    payload,
  };
}

export function saveUser(clientId, id, data) {
  return {
    type: SAVE_USER,
    clientId,
    id,
    data,
  };
}

export function userSaved(siteId, payload) {
  const userType = (siteId === 0) ? 'admin' : 'nonAdmin';
  const userResultData = {
    siteId,
    ...payload.clientRole,
    user: payload.user,
  };
  const result = {
    userType,
    userResultData,
  };

  return {
    type: SAVE_USER_SUCCESS,
    payload: result,
  };
}

export function userSavingError(payload) {
  return {
    type: SAVE_USER_ERROR,
    payload,
  };
}
