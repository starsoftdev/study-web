/*
 *
 * adminHome actions
 *
 */

import {
  FETCH_NOTE,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_ERROR,

  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_ERROR,

  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,

  DELETE_MEDIA_TYPE,
  DELETE_MEDIA_TYPE_SUCCESS,

  EDIT_MEDIA_TYPES,
  EDIT_MEDIA_TYPES_ERROR,
  EDIT_MEDIA_TYPES_SUCCESS,

  UPDATE_THANK_YOU_PAGE,
  UPDATE_THANK_YOU_PAGE_SUCCESS,
  UPDATE_THANK_YOU_PAGE_ERROR,
  RESET_THANK_YOU_PAGE_STATE,

  FETCH_LANDING,
  FETCH_LANDING_SUCCESS,
  FETCH_LANDING_ERROR,

  UPDATE_FACEBOOK_LANDING_PAGE,
  UPDATE_FACEBOOK_LANDING_PAGE_ERROR,
  UPDATE_FACEBOOK_LANDING_PAGE_SUCCESS,

  GET_STUDY_INFO,
  GET_STUDY_INFO_SUCCESS,
  GET_STUDY_INFO_ERROR,

  UPDATE_DASHBOARD_STUDY,
  UPDATE_DASHBOARD_STUDY_SUCCESS,
  UPDATE_DASHBOARD_STUDY_ERROR,

  FETCH_SITE_LOCATIONS,
  FETCH_SITE_LOCATIONS_SUCCESS,
  FETCH_SITE_LOCATIONS_ERROR,

  FETCH_MESSAGING_NUMBERS,
  FETCH_MESSAGING_NUMBERS_SUCCESS,
  FETCH_MESSAGING_NUMBERS_ERROR,
} from './constants';

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

export function deleteMediaType(studyId, studySourceId, index) {
  return {
    type: DELETE_MEDIA_TYPE,
    studyId,
    studySourceId,
    index,
  };
}

export function deleteMediaTypeSuccess(index) {
  return {
    type: DELETE_MEDIA_TYPE_SUCCESS,
    index,
  };
}


export function editMediaTypes(studyId, mediaTypes, mediaTracking) {
  return {
    type: EDIT_MEDIA_TYPES,
    studyId,
    mediaTypes,
    mediaTracking,
  };
}

export function editMediaTypesSuccess(mediaTypes, studyId, mediaTracking) {
  return {
    type: EDIT_MEDIA_TYPES_SUCCESS,
    mediaTypes,
    studyId,
    mediaTracking,
  };
}

export function editMediaTypesError(payload) {
  return {
    type: EDIT_MEDIA_TYPES_ERROR,
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

export function fetchLanding(studyId, utm) {
  return {
    type: FETCH_LANDING,
    studyId,
    utm,
  };
}

export function landingFetched(payload) {
  return {
    type: FETCH_LANDING_SUCCESS,
    payload,
  };
}

export function fetchLandingError(payload) {
  return {
    type: FETCH_LANDING_ERROR,
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

export function fetchStudiesDashboard(params, limit, offset) {
  return {
    type: GET_STUDY_INFO,
    params,
    limit,
    offset,
  };
}

export function fetchStudiesDashboardSuccess(payload, hasMoreItems, page) {
  return {
    type: GET_STUDY_INFO_SUCCESS,
    payload,
    hasMoreItems,
    page,
  };
}

export function fetchStudiesDashboardError(payload) {
  return {
    type: GET_STUDY_INFO_ERROR,
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