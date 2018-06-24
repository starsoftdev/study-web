/*
 * adminHome actions
 */

import {
  FETCH_STUDIES_FOR_ADMIN, FETCH_STUDIES_FOR_ADMIN_SUCCESS, FETCH_STUDIES_FOR_ADMIN_ERROR,
  FETCH_TOTALS_FOR_ADMIN, FETCH_TOTALS_FOR_ADMIN_SUCCESS, FETCH_TOTALS_FOR_ADMIN_ERROR,
  CLEAR_FILTERS, ADD_CUSTOM_FILTER, REMOVE_CUSTOM_FILTER, CLEAR_CUSTOM_FILTERS, CLEAR_STUDIES,
} from './constants';


export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}


export function fetchStudiesForAdmin(params, limit, offset) {
  return {
    type: FETCH_STUDIES_FOR_ADMIN,
    params,
    limit,
    offset,
  };
}

export function fetchStudiesForAdminSuccess(payload, hasMoreItems, page) {
  return {
    type: FETCH_STUDIES_FOR_ADMIN_SUCCESS,
    payload,
    hasMoreItems,
    page,
  };
}

export function fetchStudiesForAdminError(payload) {
  return {
    type: FETCH_STUDIES_FOR_ADMIN_ERROR,
    payload,
  };
}

export function fetchTotalsForAdmin(params, limit, offset) {
  return {
    type: FETCH_TOTALS_FOR_ADMIN,
    params,
    limit,
    offset,
  };
}

export function fetchTotalsForAdminSuccess(payload) {
  return {
    type: FETCH_TOTALS_FOR_ADMIN_SUCCESS,
    payload,
  };
}

export function fetchTotalsForAdminError(payload) {
  return {
    type: FETCH_TOTALS_FOR_ADMIN_ERROR,
    payload,
  };
}

export function addCustomFilter(payload) {
  return {
    type: ADD_CUSTOM_FILTER,
    payload,
  };
}

export function removeCustomFilter(payload) {
  return {
    type: REMOVE_CUSTOM_FILTER,
    payload,
  };
}

export function clearCustomFilters() {
  return {
    type: CLEAR_CUSTOM_FILTERS,
  };
}

export function clearStudies() {
  return {
    type: CLEAR_STUDIES,
  };
}
