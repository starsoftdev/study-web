/*
 *
 * Patient Database page actions
 *
 */
import {
  UPDATE_FILTERS,
  FETCH_NOTE,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_ERROR,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_ERROR,
  EDIT_NOTE,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_ERROR,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  FETCH_STUDIES_DASHBOARD,
  FETCH_STUDIES_DASHBOARD_SUCCESS,
  FETCH_STUDIES_DASHBOARD_ERROR,
  FETCH_TOTALS_DASHBOARD,
  FETCH_TOTALS_DASHBOARD_SUCCESS,
  FETCH_TOTALS_DASHBOARD_ERROR,
  FETCH_SITE_LOCATIONS,
  FETCH_SITE_LOCATIONS_SUCCESS,
  FETCH_SITE_LOCATIONS_ERROR,
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
  CHANGE_STUDY_ADD_SUCCESS,
  CHANGE_STUDY_ADD_ERROR,
  RESET_CHANGE_STUDY_ADD_STATE,
  FETCH_MESSAGING_NUMBERS,
  FETCH_MESSAGING_NUMBERS_SUCCESS,
  FETCH_MESSAGING_NUMBERS_ERROR,
  UPDATE_TWILIO_NUMBERS,
  UPDATE_TWILIO_NUMBERS_SUCCESS,
  UPDATE_TWILIO_NUMBERS_ERROR,
  SET_HOVER_ROW_INDEX,
  FETCH_CUSTOM_NOTIFICATION_EMAILS,
  FETCH_CUSTOM_NOTIFICATION_EMAILS_SUCCESS,
  FETCH_CUSTOM_NOTIFICATION_EMAILS_ERROR,
  ADD_STUDY_INDICATION_TAG,
  ADD_STUDY_INDICATION_TAG_SUCCESS,
  ADD_STUDY_INDICATION_TAG_ERROR,
  REMOVE_STUDY_INDICATION_TAG,
  REMOVE_STUDY_INDICATION_TAG_SUCCESS,
  REMOVE_STUDY_INDICATION_TAG_ERROR,
  FETCH_STUDY_INDICATION_TAG,
  FETCH_STUDY_INDICATION_TAG_SUCCESS,
  FETCH_STUDY_INDICATION_TAG_ERROR,
  FETCH_CAMPAIGNS_BY_STUDY,
  FETCH_CAMPAIGNS_BY_STUDY_SUCCESS,
  FETCH_CAMPAIGNS_BY_STUDY_ERROR,
  EDIT_CAMPAIGN,
  EDIT_CAMPAIGN_SUCCESS,
  EDIT_CAMPAIGN_ERROR,
  DELETE_CAMPAIGN,
  DELETE_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_ERROR,
} from './constants';

export function updateFilters(filters = []) {
  return {
    type: UPDATE_FILTERS,
    filters,
  };
}

export function fetchStudiesDashboard(params, limit, offset) {
  return {
    type: FETCH_STUDIES_DASHBOARD,
    params,
    limit,
    offset,
  };
}

export function fetchStudiesDashboardSuccess(payload, hasMoreItems, page) {
  return {
    type: FETCH_STUDIES_DASHBOARD_SUCCESS,
    payload,
    hasMoreItems,
    page,
  };
}

export function fetchStudiesDashboardError(payload) {
  return {
    type: FETCH_STUDIES_DASHBOARD_ERROR,
    payload,
  };
}

export function fetchTotalsDashboard(params, limit, offset) {
  return {
    type: FETCH_TOTALS_DASHBOARD,
    params,
    limit,
    offset,
  };
}

export function fetchTotalsDashboardSuccess(payload) {
  return {
    type: FETCH_TOTALS_DASHBOARD_SUCCESS,
    payload,
  };
}

export function fetchTotalsDashboardError(payload) {
  return {
    type: FETCH_TOTALS_DASHBOARD_ERROR,
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

export function changeStudyAdd(payload) {
  return {
    type: CHANGE_STUDY_ADD,
    payload,
  };
}

export function changeStudyAddSuccess(payload) {
  return {
    type: CHANGE_STUDY_ADD_SUCCESS,
    payload,
  };
}

export function changeStudyAddError(payload) {
  return {
    type: CHANGE_STUDY_ADD_ERROR,
    payload,
  };
}

export function resetChangeStudyAddState() {
  return {
    type: RESET_CHANGE_STUDY_ADD_STATE,
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

export function fetchCustomNotificationEmails(params) {
  return {
    type: FETCH_CUSTOM_NOTIFICATION_EMAILS,
    params,
  };
}

export function fetchCustomNotificationEmailsSuccess(payload) {
  return {
    type: FETCH_CUSTOM_NOTIFICATION_EMAILS_SUCCESS,
    payload,
  };
}

export function fetchCustomNotificationEmailsError(payload) {
  return {
    type: FETCH_CUSTOM_NOTIFICATION_EMAILS_ERROR,
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

export function fetchMessagingNumbersDashboard() {
  return {
    type: FETCH_MESSAGING_NUMBERS,
  };
}

export function fetchMessagingNumbersDashboardSuccess(payload) {
  return {
    type: FETCH_MESSAGING_NUMBERS_SUCCESS,
    payload,
  };
}

export function fetchMessagingNumbersDashboardError(payload) {
  return {
    type: FETCH_MESSAGING_NUMBERS_ERROR,
    payload,
  };
}

export function updateTwilioNumbers() {
  return {
    type: UPDATE_TWILIO_NUMBERS,
  };
}

export function updateTwilioNumbersSuccess(payload) {
  return {
    type: UPDATE_TWILIO_NUMBERS_SUCCESS,
    payload,
  };
}

export function updateTwilioNumbersError(payload) {
  return {
    type: UPDATE_TWILIO_NUMBERS_ERROR,
    payload,
  };
}

export function fetchNote() {
  return {
    type: FETCH_NOTE,
  };
}

export function fetchNoteSuccess(payload) {
  return {
    type: FETCH_NOTE_SUCCESS,
    payload,
  };
}

export function fetchNoteError(payload) {
  return {
    type: FETCH_NOTE_ERROR,
    payload,
  };
}

export function addNote(payload) {
  return {
    type: ADD_NOTE,
    payload,
  };
}

export function addNoteSuccess(payload) {
  return {
    type: ADD_NOTE_SUCCESS,
    payload,
  };
}

export function addNoteError(payload) {
  return {
    type: ADD_NOTE_ERROR,
    payload,
  };
}

export function editNote(payload) {
  return {
    type: EDIT_NOTE,
    payload,
  };
}

export function editNoteSuccess(payload) {
  return {
    type: EDIT_NOTE_SUCCESS,
    payload,
  };
}

export function editNoteError(payload) {
  return {
    type: EDIT_NOTE_ERROR,
    payload,
  };
}

export function deleteNote(payload) {
  return {
    type: DELETE_NOTE,
    payload,
  };
}

export function deleteNoteSuccess(payload) {
  return {
    type: DELETE_NOTE_SUCCESS,
    payload,
  };
}

export function deleteNoteError(payload) {
  return {
    type: DELETE_NOTE_ERROR,
    payload,
  };
}

export function setHoverRowIndex(index) {
  return {
    type: SET_HOVER_ROW_INDEX,
    index,
  };
}

export function addStudyIndicationTag(studyId, indicationId) {
  return {
    type: ADD_STUDY_INDICATION_TAG,
    payload: {
      studyId,
      indicationId,
    },
  };
}

export function addStudyIndicationTagSuccess(payload) {
  return {
    type: ADD_STUDY_INDICATION_TAG_SUCCESS,
    payload,
  };
}

export function addStudyIndicationTagError(payload) {
  return {
    type: ADD_STUDY_INDICATION_TAG_ERROR,
    payload,
  };
}

export function removeStudyIndicationTag(studyId, indicationId) {
  return {
    type: REMOVE_STUDY_INDICATION_TAG,
    payload: {
      studyId,
      indicationId,
    },
  };
}

export function removeStudyIndicationTagSuccess(payload) {
  return {
    type: REMOVE_STUDY_INDICATION_TAG_SUCCESS,
    payload,
  };
}

export function removeStudyIndicationTagError(payload) {
  return {
    type: REMOVE_STUDY_INDICATION_TAG_ERROR,
    payload,
  };
}

export function fetchStudyIndicationTag(params) {
  return {
    type: FETCH_STUDY_INDICATION_TAG,
    params,
  };
}

export function fetchStudyIndicationTagSuccess(payload) {
  return {
    type: FETCH_STUDY_INDICATION_TAG_SUCCESS,
    payload,
  };
}

export function fetchStudyIndicationTagError(payload) {
  return {
    type: FETCH_STUDY_INDICATION_TAG_ERROR,
    payload,
  };
}

export function fetchCampaignsByStudy(payload) {
  return {
    type: FETCH_CAMPAIGNS_BY_STUDY,
    payload,
  };
}

export function fetchCampaignsByStudySuccess(payload) {
  return {
    type: FETCH_CAMPAIGNS_BY_STUDY_SUCCESS,
    payload,
  };
}

export function fetchCampaignsByStudyError(payload) {
  return {
    type: FETCH_CAMPAIGNS_BY_STUDY_ERROR,
    payload,
  };
}

export function editCampaign(payload) {
  return {
    type: EDIT_CAMPAIGN,
    payload,
  };
}

export function editCampaignSuccess(payload) {
  return {
    type: EDIT_CAMPAIGN_SUCCESS,
    payload,
  };
}

export function editCampaignError(payload) {
  return {
    type: EDIT_CAMPAIGN_ERROR,
    payload,
  };
}

export function deleteCampaign(payload) {
  return {
    type: DELETE_CAMPAIGN,
    payload,
  };
}

export function deleteCampaignSuccess(payload) {
  return {
    type: DELETE_CAMPAIGN_SUCCESS,
    payload,
  };
}

export function deleteCampaignError(payload) {
  return {
    type: DELETE_CAMPAIGN_ERROR,
    payload,
  };
}
