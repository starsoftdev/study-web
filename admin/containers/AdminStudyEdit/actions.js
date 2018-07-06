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

  EDIT_PATIENT_THANK_YOU,
  EDIT_PATIENT_THANK_YOU_SUCCESS,
  EDIT_PATIENT_THANK_YOU_ERROR,

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

  FETCH_STUDY_MEDIA_TYPES,
  FETCH_STUDY_MEDIA_TYPES_ERROR,
  FETCH_STUDY_MEDIA_TYPES_SUCCESS,

  EDIT_STUDY_MEDIA_TYPES,
  EDIT_STUDY_MEDIA_TYPES_ERROR,
  EDIT_STUDY_MEDIA_TYPES_SUCCESS,

  DELETE_STUDY_MEDIA_TYPE,
  DELETE_STUDY_MEDIA_TYPE_SUCCESS,

  UPDATE_LANDING_PAGE,
  UPDATE_LANDING_PAGE_SUCCESS,
  UPDATE_LANDING_PAGE_ERROR,
  RESET_LANDING_PAGE_STATE,

  CHANGE_STUDY_AD,
  CHANGE_STUDY_AD_SUCCESS,
  CHANGE_STUDY_AD_ERROR,
  RESET_CHANGE_STUDY_AD_STATE,

  REMOVE_STUDY_AD,
  REMOVE_STUDY_AD_SUCCESS,
  REMOVE_STUDY_AD_ERROR,
 
  FETCH_LEVELS,
  FETCH_LEVELS_SUCCESS,
  FETCH_LEVELS_ERROR,

  FETCH_CAMPAIGNS_BY_STUDY,
  FETCH_CAMPAIGNS_BY_STUDY_SUCCESS,
  FETCH_CAMPAIGNS_BY_STUDY_ERROR,

  FETCH_FIVE_9_LIST,
  FETCH_FIVE_9_LIST_SUCCESS,
  FETCH_FIVE_9_LIST_ERROR,


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
export function editCampaign(payload, campaignInfo) {
  return {
    type: 'EDIT_CAMPAIGN',
    payload,
    campaignInfo,
  };
}

export function editCampaignSuccess(payload, campaignInfo) {
  return {
    type: 'EDIT_CAMPAIGN_SUCCESS',
    payload,
    campaignInfo,
  };
}

export function editCampaignError(payload) {
  return {
    type: 'EDIT_CAMPAIGN_ERROR',
    payload,
  };
}

export function deleteNoteError(payload) {
  return {
    type: DELETE_NOTE_ERROR,
    payload,
  };
}

export function deleteCampaign(payload) {
  return {
    type: 'DELETE_CAMPAIGN',
    payload,
  };
}

export function deleteMediaType(studyId, utm) {
  return {
    type: FETCH_LANDING,
    studyId,
    utm,
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

export function updatePatientThankYouEmail(params) {
  return {
    type: EDIT_PATIENT_THANK_YOU,
    params,
  };
}

export function updatePatientThankYouEmailSuccess(payload) {
  return {
    type: EDIT_PATIENT_THANK_YOU_SUCCESS,
    payload,
  };
}

export function updatePatientThankYouEmailError(payload) {
  return {
    type: EDIT_PATIENT_THANK_YOU_ERROR,
    payload,
  };
}

export function fetchStudyMediaTypes(studyId) {
  return {
    type: FETCH_STUDY_MEDIA_TYPES,
    studyId,
  };
}

export function fetchStudyMediaTypesSuccess(payload) {
  return {
    type: FETCH_STUDY_MEDIA_TYPES_SUCCESS,
    payload,
  };
}

export function fetchStudyMediaTypesError(payload) {
  return {
    type: FETCH_STUDY_MEDIA_TYPES_ERROR,
    payload,
  };
}

export function editStudyMediaTypes(studyId, mediaTypes, mediaTracking) {
  return {
    type: EDIT_STUDY_MEDIA_TYPES,
    studyId,
    mediaTypes,
    mediaTracking,
  };
}

export function editStudyMediaTypesSuccess(mediaTypes, studyId, mediaTracking) {
  return {
    type: EDIT_STUDY_MEDIA_TYPES_SUCCESS,
    mediaTypes,
    studyId,
    mediaTracking,
  };
}

export function editStudyMediaTypesError(payload) {
  return {
    type: EDIT_STUDY_MEDIA_TYPES_ERROR,
    payload,
  };
}

export function deleteStudyMediaType(studyId, studySourceId, index) {
  return {
    type: DELETE_STUDY_MEDIA_TYPE,
    studyId,
    studySourceId,
    index,
  };
}

export function deleteStudyMediaTypeSuccess(index) {
  return {
    type: DELETE_STUDY_MEDIA_TYPE_SUCCESS,
    index,
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

// ///////////////////////////////////////////
// levels
// ///////////////////////////////////////////
export function fetchLevels() {
  return {
    type: FETCH_LEVELS,
  };
}
export function levelsFetched(payload) {
  return {
    type: FETCH_LEVELS_SUCCESS,
    payload,
  };
}

export function levelsFetchingError(payload) {
  return {
    type: FETCH_LEVELS_ERROR,
    payload,
  };
}

