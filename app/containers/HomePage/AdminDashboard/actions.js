/*
 *
 * Admin Dashboard actions
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
  FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS,
  FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_SUCCESS,
  FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_ERROR,
  FETCH_STUDY_CAMPAIGNS,
  FETCH_STUDY_CAMPAIGNS_SUCCESS,
  FETCH_STUDY_CAMPAIGNS_ERROR,
  CHANGE_STUDY_STATUS,
  CHANGE_STUDY_STATUS_SUCCESS,
  CHANGE_STUDY_STATUS_ERROR,
  TOGGLE_STUDY,
  TOGGLE_ALL_STUDIES,
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
  CHANGE_STUDY_AD,
  CHANGE_STUDY_AD_SUCCESS,
  CHANGE_STUDY_AD_ERROR,
  REMOVE_STUDY_AD,
  REMOVE_STUDY_AD_SUCCESS,
  REMOVE_STUDY_AD_ERROR,
  RESET_CHANGE_STUDY_AD_STATE,
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
  REMOVE_STUDY_INDICATION_TAG,
  REMOVE_STUDY_INDICATION_TAG_SUCCESS,
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
  FETCH_FIVE_9_LIST,
  FETCH_FIVE_9_LIST_SUCCESS,
  FETCH_FIVE_9_LIST_ERROR,
  UPDATE_FACEBOOK_LANDING_PAGE,
  UPDATE_FACEBOOK_LANDING_PAGE_SUCCESS,
  UPDATE_FACEBOOK_LANDING_PAGE_ERROR,
  EDIT_STUDY_LEAD_SOURCES,
  EDIT_STUDY_LEAD_SOURCES_SUCCESS,
  EDIT_STUDY_LEAD_SOURCES_ERROR,
  DELETE_STUDY_LEAD_SOURCE,
  DELETE_STUDY_LEAD_SOURCE_SUCCESS,
  DELETE_STUDY_LEAD_SOURCE_ERROR,
} from './constants';

export function updateFilters(filters = []) {
  return {
    type: UPDATE_FILTERS,
    filters,
  };
}

export function fetchFive9List() {
  return {
    type: FETCH_FIVE_9_LIST,
  };
}

export function fetchFive9ListSuccess(payload) {
  return {
    type: FETCH_FIVE_9_LIST_SUCCESS,
    payload,
  };
}

export function fetchFive9ListError(payload) {
  return {
    type: FETCH_FIVE_9_LIST_ERROR,
    payload,
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

export function updateDashboardStudy(id, params, stopSubmit, formValues) {
  return {
    type: UPDATE_DASHBOARD_STUDY,
    id,
    params,
    stopSubmit,
    formValues,
  };
}

export function updateDashboardStudySuccess(studyId, updatedStudyParams, formValues) {
  return {
    type: UPDATE_DASHBOARD_STUDY_SUCCESS,
    studyId,
    updatedStudyParams,
    formValues,
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

export function updateFacebookLandingPage(params) {
  return {
    type: UPDATE_FACEBOOK_LANDING_PAGE,
    params,
  };
}

export function updateFacebookLandingPageSuccess(payload) {
  return {
    type: UPDATE_FACEBOOK_LANDING_PAGE_SUCCESS,
    payload,
  };
}

export function updateFacebookLandingPageError(payload) {
  return {
    type: UPDATE_FACEBOOK_LANDING_PAGE_ERROR,
    payload,
  };
}

export function resetLandingPageState() {
  return {
    type: RESET_LANDING_PAGE_STATE,
  };
}

export function changeStudyAd(payload) {
  return {
    type: CHANGE_STUDY_AD,
    payload,
  };
}

export function changeStudyAdSuccess(payload) {
  return {
    type: CHANGE_STUDY_AD_SUCCESS,
    payload,
  };
}

export function changeStudyAdError(payload) {
  return {
    type: CHANGE_STUDY_AD_ERROR,
    payload,
  };
}

export function removeStudyAd(studyId) {
  return {
    type: REMOVE_STUDY_AD,
    studyId,
  };
}

export function removeStudyAdSuccess(studyId) {
  return {
    type: REMOVE_STUDY_AD_SUCCESS,
    studyId,
  };
}

export function removeStudyAdError() {
  return {
    type: REMOVE_STUDY_AD_ERROR,
  };
}

export function resetChangeStudyAdState() {
  return {
    type: RESET_CHANGE_STUDY_AD_STATE,
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

export function fetchAllStudyEmailNotificationsDashboard(clientId, studyId) {
  return {
    type: FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS,
    clientId,
    studyId,
  };
}

export function fetchAllStudyEmailNotificationsSuccess(payload) {
  return {
    type: FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_SUCCESS,
    payload,
  };
}

export function fetchAllStudyEmailNotificationsError(payload) {
  return {
    type: FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_ERROR,
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

export function fetchCustomNotificationEmails(id) {
  return {
    type: FETCH_CUSTOM_NOTIFICATION_EMAILS,
    id,
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

export function toggleAllStudies(status) {
  return {
    type: TOGGLE_ALL_STUDIES,
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

export function fetchNote(studyId) {
  return {
    type: FETCH_NOTE,
    studyId,
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

export function addTaggedIndicationForStudy(studyId, indication) {
  return {
    type: ADD_STUDY_INDICATION_TAG,
    studyId,
    indication,
  };
}

export function addTaggedIndicationForStudySuccess(studyId, indication) {
  return {
    type: ADD_STUDY_INDICATION_TAG_SUCCESS,
    studyId,
    indication,
  };
}

export function removeTaggedIndicationForStudy(studyId, indication) {
  return {
    type: REMOVE_STUDY_INDICATION_TAG,
    studyId,
    indication,
  };
}

export function removeTaggedIndicationForStudySuccess(studyId, indication) {
  return {
    type: REMOVE_STUDY_INDICATION_TAG_SUCCESS,
    studyId,
    indication,
  };
}
export function fetchTaggedIndicationsForStudy(studyId) {
  return {
    type: FETCH_STUDY_INDICATION_TAG,
    studyId,
  };
}

export function fetchTaggedIndicationsForStudySuccess(payload) {
  return {
    type: FETCH_STUDY_INDICATION_TAG_SUCCESS,
    payload,
  };
}

export function fetchTaggedIndicationsForStudyError(payload) {
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

export function editCampaign(payload, campaignInfo) {
  return {
    type: EDIT_CAMPAIGN,
    payload,
    campaignInfo,
  };
}

export function editCampaignSuccess(payload, campaignInfo) {
  return {
    type: EDIT_CAMPAIGN_SUCCESS,
    payload,
    campaignInfo,
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

export function editStudyLeadSources(studyId, leadSources, callTracking) {
  return {
    type: EDIT_STUDY_LEAD_SOURCES,
    studyId,
    leadSources,
    callTracking,
  };
}

export function editStudyLeadSourcesSuccess(payload) {
  return {
    type: EDIT_STUDY_LEAD_SOURCES_SUCCESS,
    payload,
  };
}

export function editStudyLeadSourcesError(payload) {
  return {
    type: EDIT_STUDY_LEAD_SOURCES_ERROR,
    payload,
  };
}

export function deleteStudyLeadSource(leadSource, index) {
  return {
    type: DELETE_STUDY_LEAD_SOURCE,
    leadSource,
    index,
  };
}

export function deleteStudyLeadSourceSuccess(leadSource, index) {
  return {
    type: DELETE_STUDY_LEAD_SOURCE_SUCCESS,
    leadSource,
    index,
  };
}

export function deleteStudyLeadSourceError(payload) {
  return {
    type: DELETE_STUDY_LEAD_SOURCE_ERROR,
    payload,
  };
}
