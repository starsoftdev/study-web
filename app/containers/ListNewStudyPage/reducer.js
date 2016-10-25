/*
 *
 * ListNewStudyPage reducer
 *
 */

import {
  SHOW_ADD_SITE_LOCATION_MODAL,
  HIDE_ADD_SITE_LOCATION_MODAL,
  SHOW_ADD_EMAIL_MODAL,
  HIDE_ADD_EMAIL_MODAL,
  GET_AVAIL_PHONE_NUMBERS_SUCCESS,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  HIDE_SUBMIT_FORM_MODAL,
} from './constants';

import _ from 'lodash';

const initialState = {
  showAddSiteLocationModal: false,
  showAddEmailModal: false,
  showSubmitFormModal: false,
  availPhoneNumbers: [],
  formSubmissionStatus: {
    submitting: false,
    error: null,
    response: null,
  },
};

function listNewStudyPageReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ADD_SITE_LOCATION_MODAL:
      return {
        ...state,
        showAddSiteLocationModal: true,
      };
    case HIDE_ADD_SITE_LOCATION_MODAL:
      return {
        ...state,
        showAddSiteLocationModal: false,
      };
    case SHOW_ADD_EMAIL_MODAL:
      return {
        ...state,
        showAddEmailModal: true,
      };
    case HIDE_ADD_EMAIL_MODAL:
      return {
        ...state,
        showAddEmailModal: false,
      };
    case GET_AVAIL_PHONE_NUMBERS_SUCCESS:
      return {
        ...state,
        availPhoneNumbers: _.map(action.payload.avail, (value) => ({ ...value, value:value.phoneNumber, label: value.friendlyName })),
      };
    case SUBMIT_FORM:
      return {
        ...state,
        showSubmitFormModal: true,
        formSubmissionStatus: {
          submitting: true,
          error: null,
          response: null,
        },
      };
    case SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        formSubmissionStatus: {
          submitting: false,
          error: null,
          response: action.payload,
        },
      };
    case SUBMIT_FORM_ERROR:
      return {
        ...state,
        formSubmissionStatus: {
          submitting: false,
          error: action.payload,
          response: null,
        },
      };
    case HIDE_SUBMIT_FORM_MODAL:
      return {
        ...state,
        showSubmitFormModal: false,
      };
    default:
      return state;
  }
}

export default listNewStudyPageReducer;
