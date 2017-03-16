/*
 *
 * Patient Database page actions
 *
 */
import {
  UPDATE_FILTERS,
  FETCH_STUDIES_DASHBOARD,
  FETCH_STUDIES_DASHBOARD_SUCCESS,
  FETCH_STUDIES_DASHBOARD_ERROR,
  FETCH_SITE_LOCATIONS,
  FETCH_SITE_LOCATIONS_SUCCESS,
  FETCH_SITE_LOCATIONS_ERROR,
  FETCH_SITE_NAMES,
  FETCH_SITE_NAMES_SUCCESS,
  FETCH_SITE_NAMES_ERROR,
  UPDATE_DASHBOARD_STUDY,
  UPDATE_DASHBOARD_STUDY_SUCCESS,
  UPDATE_DASHBOARD_STUDY_ERROR,
  CLEAR_FILTERS,
} from './constants';

export function updateFilters(filters = []) {
  return {
    type: UPDATE_FILTERS,
    filters,
  };
}

export function fetchStudiesDashboard(params) {
  return {
    type: FETCH_STUDIES_DASHBOARD,
    params,
  };
}

export function fetchStudiesDashboardSuccess(payload) {
  return {
    type: FETCH_STUDIES_DASHBOARD_SUCCESS,
    payload,
  };
}

export function fetchStudiesDashboardError(payload) {
  return {
    type: FETCH_STUDIES_DASHBOARD_ERROR,
    payload,
  };
}

export function fetchSiteLocations() {
  return {
    type: FETCH_SITE_LOCATIONS,
  };
}

export function fetchSiteLocationsSuccess(payload) {
  return {
    type: FETCH_SITE_LOCATIONS_SUCCESS,
    payload,
  };
}

export function fetchSiteLocationsError(payload) {
  return {
    type: FETCH_SITE_LOCATIONS_ERROR,
    payload,
  };
}

export function fetchSiteNames() {
  return {
    type: FETCH_SITE_NAMES,
  };
}

export function fetchSiteNamesSuccess(payload) {
  return {
    type: FETCH_SITE_NAMES_SUCCESS,
    payload,
  };
}

export function fetchSiteNamesError(payload) {
  return {
    type: FETCH_SITE_NAMES_ERROR,
    payload,
  };
}

export function updateDashboardStudy(params) {
  return {
    type: UPDATE_DASHBOARD_STUDY,
    params,
  };
}

export function updateDashboardStudySuccess(payload) {
  return {
    type: UPDATE_DASHBOARD_STUDY_SUCCESS,
    payload,
  };
}

export function updateDashboardStudyError(payload) {
  return {
    type: UPDATE_DASHBOARD_STUDY_ERROR,
    payload,
  };
}

export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}
