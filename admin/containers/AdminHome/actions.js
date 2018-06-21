/*
 *
 * adminHome actions
 *
 */

import {
  FETCH_TOTALS_ADMIN,
  FETCH_TOTALS_ADMIN_SUCCESS,
  FETCH_TOTALS_ADMIN_ERROR,
  FETCH_SOURCES,
  FETCH_SOURCES_ERROR,
  FETCH_SOURCES_SUCCESS,
  FETCH_STUDIES_ADMIN,
  FETCH_STUDIES_ADMIN_ERROR,
  FETCH_STUDIES_ADMIN_SUCCESS,
} from './constants';

export function fetchTotalsAdmin(params, limit, offset) {
  return {
    type: FETCH_TOTALS_ADMIN,
    params,
    limit,
    offset,
  };
}

export function fetchTotalsAdminSuccess(payload) {
  return {
    type: FETCH_TOTALS_ADMIN_SUCCESS,
    payload,
  };
}

export function fetchTotalsAdminError(payload) {
  return {
    type: FETCH_TOTALS_ADMIN_ERROR,
    payload,
  };
}

export function fetchStudiesAdmin(params, limit, offset) {
  return {
    type: FETCH_STUDIES_ADMIN,
    params,
    limit,
    offset,
  };
}

export function fetchStudiesAdminSuccess(payload, hasMoreItems, page) {
  return {
    type: FETCH_STUDIES_ADMIN_SUCCESS,
    payload,
    hasMoreItems,
    page,
  };
}

export function fetchStudiesAdminError(payload) {
  return {
    type: FETCH_STUDIES_ADMIN_ERROR,
    payload,
  };
}

export function fetchSources() {
  return {
    type: FETCH_SOURCES,
  };
}

export function sourcesFetched(payload) {
  return {
    type: FETCH_SOURCES_SUCCESS,
    payload,
  };
}

export function sourcesFetchingError(payload) {
  return {
    type: FETCH_SOURCES_ERROR,
    payload,
  };
}
