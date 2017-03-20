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
  FETCH_ALL_CLIENT_USERS,
  FETCH_ALL_CLIENT_USERS_SUCCESS,
  FETCH_ALL_CLIENT_USERS_ERROR,
  FETCH_STUDY_CAMPAIGNS,
  FETCH_STUDY_CAMPAIGNS_SUCCESS,
  FETCH_STUDY_CAMPAIGNS_ERROR,
  CHANGE_STUDY_STATUS,
  CHANGE_STUDY_STATUS_SUCCESS,
  CHANGE_STUDY_STATUS_ERROR,
  TOGGLE_STUDY,
  UPDATE_THANK_YOU_PAGE,
  UPDATE_THANK_YOU_PAGE_SUCCESS,
  UPDATE_THANK_YOU_PAGE_ERROR,
  RESET_THANK_YOU_PAGE_STATE,
  UPDATE_PATIENT_THANK_YOU_EMAIL,
  UPDATE_PATIENT_THANK_YOU_EMAIL_SUCCESS,
  UPDATE_PATIENT_THANK_YOU_EMAIL_ERROR,
  RESET_PATIENT_THANK_YOU_EMAIL_STATE,
  UPDATE_LANDING_PAGE,
  UPDATE_LANDING_PAGE_SUCCESS,
  UPDATE_LANDING_PAGE_ERROR,
  RESET_LANDING_PAGE_STATE,
  CHANGE_STUDY_ADD,
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

export function updateLandingPage(params) {
  return {
    type: UPDATE_LANDING_PAGE,
    params,
  };
}

export function updateLandingPageSuccess(payload) {
  return {
    type: UPDATE_LANDING_PAGE_SUCCESS,
    payload,
  };
}

export function updateLandingPageError(payload) {
  return {
    type: UPDATE_LANDING_PAGE_ERROR,
    payload,
  };
}

export function resetLandingPageState() {
  return {
    type: RESET_LANDING_PAGE_STATE,
  };
}

// TODO: add success and error actions
export function changeStudyAdd(payload) {
  return {
    type: CHANGE_STUDY_ADD,
    payload,
  };
}

export function updateThankYouPage(params) {
  return {
    type: UPDATE_THANK_YOU_PAGE,
    params,
  };
}

export function updateThankYouPageSuccess(payload) {
  return {
    type: UPDATE_THANK_YOU_PAGE_SUCCESS,
    payload,
  };
}

export function updateThankYouPageError(payload) {
  return {
    type: UPDATE_THANK_YOU_PAGE_ERROR,
    payload,
  };
}

export function resetThankYouPageState() {
  return {
    type: RESET_THANK_YOU_PAGE_STATE,
  };
}

export function updatePatientThankYouEmail(params) {
  return {
    type: UPDATE_PATIENT_THANK_YOU_EMAIL,
    params,
  };
}

export function updatePatientThankYouEmailSuccess(payload) {
  return {
    type: UPDATE_PATIENT_THANK_YOU_EMAIL_SUCCESS,
    payload,
  };
}

export function updatePatientThankYouEmailError(payload) {
  return {
    type: UPDATE_PATIENT_THANK_YOU_EMAIL_ERROR,
    payload,
  };
}

export function resetPatientThankYouEmailState() {
  return {
    type: RESET_PATIENT_THANK_YOU_EMAIL_STATE,
  };
}

export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}

export function fetchAllClientUsersDashboard(params) {
  return {
    type: FETCH_ALL_CLIENT_USERS,
    params,
  };
}

export function fetchAllClientUsersDashboardSuccess(payload) {
  return {
    type: FETCH_ALL_CLIENT_USERS_SUCCESS,
    payload,
  };
}

export function fetchAllClientUsersDashboardError(payload) {
  return {
    type: FETCH_ALL_CLIENT_USERS_ERROR,
    payload,
  };
}

export function fetchStudyCampaignsDashboard(params) {
  return {
    type: FETCH_STUDY_CAMPAIGNS,
    params,
  };
}

export function fetchStudyCampaignsDashboardSuccess(payload) {
  return {
    type: FETCH_STUDY_CAMPAIGNS_SUCCESS,
    payload,
  };
}

export function fetchStudyCampaignsDashboardError(payload) {
  return {
    type: FETCH_STUDY_CAMPAIGNS_ERROR,
    payload,
  };
}

export function changeStudyStatusDashboard(params, status, isChecked) {
  return {
    type: CHANGE_STUDY_STATUS,
    params,
    status,
    isChecked,
  };
}

export function changeStudyStatusDashboardSuccess(payload) {
  return {
    type: CHANGE_STUDY_STATUS_SUCCESS,
    payload,
  };
}

export function changeStudyStatusDashboardError(payload) {
  return {
    type: CHANGE_STUDY_STATUS_ERROR,
    payload,
  };
}

export function toggleStudy(id, status) {
  return {
    type: TOGGLE_STUDY,
    id,
    status,
  };
}
