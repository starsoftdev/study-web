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
} from './constants';

const initialState = {
  showAddSiteLocationModal: false,
  showAddEmailModal: false,
  availPhoneNumbers: [],
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
        availPhoneNumbers: action.payload.avail,
      };
    default:
      return state;
  }
}

export default listNewStudyPageReducer;
