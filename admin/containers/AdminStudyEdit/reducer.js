/* eslint-disable comma-dangle, no-case-declarations */

import _ from 'lodash';

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
  FETCH_SITE_LOCATIONS_SUCCESS,
  FETCH_MESSAGING_NUMBERS,
  FETCH_MESSAGING_NUMBERS_SUCCESS,
  FETCH_MESSAGING_NUMBERS_ERROR,
  FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS,
  FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_SUCCESS,
  FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_ERROR,
  FETCH_CUSTOM_NOTIFICATION_EMAILS,
  FETCH_CUSTOM_NOTIFICATION_EMAILS_SUCCESS,
  FETCH_CUSTOM_NOTIFICATION_EMAILS_ERROR,
} from './constants';

import {
  FETCH_INDICATIONS_SUCCESS,
  FETCH_CRO_SUCCESS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_PROTOCOLS_SUCCESS,
  FETCH_USERS_BY_ROLE_SUCCESS,
} from '../../../app/containers/App/constants';

const initialState = {
  note: {
    details: [],
    fetching: false,
    error: null,
  },
  editNoteProcess: {
    saving: false,
    deleting: false,
    error: null,
  },
  editMediaTypesProcess: {
    saving: false,
    error: false,
  },
  updateThankYouPageProcess: {
    success: false,
    saving: false,
    error: null,
  },
  landing: {
    details: null,
    fetching: false,
    error: null,
  },
  updateFacebookLandingPageProcess: {
    success: false,
    saving: false,
    error: null,
  },
  studyInfo: {
    details: null,
    fetching: false,
    error: null,
  },
  indications: [],
  sponsors: [],
  protocols: [],
  cro: [],
  siteLocations: [],
  usersByRoles: {},
  messagingNumbers: {
    details: [],
    fetching: false,
    error: null,
  },
  allClientUsers: {
    details: [],
    fetching: false,
    error: null,
  },
  allCustomNotificationEmails: {
    details: [],
    fetching: false,
    error: null,
  },
};

export default function adminStudyEditReducer(state = initialState, action) {
  let foundUserIndex = null;
  switch (action.type) {
    case FETCH_NOTE:
      return {
        ...state,
        note: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_NOTE_SUCCESS:
      return {
        ...state,
        note: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_NOTE_ERROR:
      return {
        ...state,
        note: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case ADD_NOTE:
      return {
        ...state,
        editNoteProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case ADD_NOTE_SUCCESS: {
      const newNotes = [
        ...state.note.details,
      ];
      newNotes.push(action.payload);
      return {
        ...state,
        note: {
          details: newNotes,
          fetching: false,
          error: action.payload,
        },
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    }
    case ADD_NOTE_ERROR:
      return {
        ...state,
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case DELETE_NOTE:
      return {
        ...state,
        editNoteProcess: {
          saving: false,
          deleting: true,
          error: null,
        },
      };
    case DELETE_NOTE_SUCCESS: {
      const newNotes = [
        ...state.note.details,
      ];
      foundUserIndex = _.findIndex(newNotes, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newNotes.splice(foundUserIndex, 1);
      }
      return {
        ...state,
        note: {
          details: newNotes,
          fetching: false,
          error: action.payload,
        },
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    }
    case DELETE_NOTE_ERROR:
      return {
        ...state,
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case UPDATE_THANK_YOU_PAGE:
      return {
        ...state,
        updateThankYouPageProcess: {
          success: false,
          saving: true,
          error: null,
        },
      };
    case UPDATE_THANK_YOU_PAGE_SUCCESS:
      return {
        ...state,
        updateThankYouPageProcess: {
          success: true,
          saving: false,
          error: null,
        },
      };
    case UPDATE_THANK_YOU_PAGE_ERROR:
      return {
        ...state,
        updateThankYouPageProcess: {
          success: false,
          saving: false,
          error: true,
        },
      };
    case RESET_THANK_YOU_PAGE_STATE:
      return {
        ...state,
        updateThankYouPageProcess: {
          success: false,
          saving: false,
          error: null,
        },
      };
    case FETCH_LANDING:
      return {
        ...state,
        landing: {
          details: null,
          fetching: true,
          error: null,
        },
      };
    case FETCH_LANDING_SUCCESS:
      return {
        ...state,
        landing: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_LANDING_ERROR:
      return {
        ...state,
        landing: {
          details: null,
          fetching: false,
          error: action.payload,
        },
      };
    case UPDATE_FACEBOOK_LANDING_PAGE:
      return {
        ...state,
        updateFacebookLandingPageProcess: {
          success: false,
          saving: true,
          error: null,
        },
      };
    case UPDATE_FACEBOOK_LANDING_PAGE_SUCCESS:
      return {
        ...state,
        updateFacebookLandingPageProcess: {
          success: true,
          saving: false,
          error: null,
        },
      };
    case UPDATE_FACEBOOK_LANDING_PAGE_ERROR:
      return {
        ...state,
        updateFacebookLandingPageProcess: {
          success: false,
          saving: false,
          error: true,
        },
      };
    case GET_STUDY_INFO:
      return {
        ...state,
        studyInfo: {
          details: null,
          fetching: true,
          error: null,
        },
      };
    case GET_STUDY_INFO_SUCCESS:
      return {
        ...state,
        studyInfo: {
          details: action.payload.studies[0],
          fetching: false,
          error: null,
        },
      };
    case GET_STUDY_INFO_ERROR:
      return {
        ...state,
        studyInfo: {
          details: null,
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_INDICATIONS_SUCCESS:
      return {
        ...state,
        indications: action.payload,
      };
    case FETCH_SPONSORS_SUCCESS:
      return {
        ...state,
        sponsors: action.payload,
      };
    case FETCH_PROTOCOLS_SUCCESS:
      return {
        ...state,
        protocols: action.payload,
      };
    case FETCH_CRO_SUCCESS:
      return {
        ...state,
        cro: action.payload,
      };
    case FETCH_SITE_LOCATIONS_SUCCESS:
      return {
        ...state,
        siteLocations: action.payload,
      };
    case FETCH_USERS_BY_ROLE_SUCCESS:
      return {
        ...state,
        usersByRoles: action.payload,
      };
    case FETCH_MESSAGING_NUMBERS:
      return {
        ...state,
        messagingNumbers: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_MESSAGING_NUMBERS_SUCCESS:
      return {
        ...state,
        messagingNumbers: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_MESSAGING_NUMBERS_ERROR:
      return {
        ...state,
        messagingNumbers: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS:
      return {
        ...state,
        allClientUsers: {
          details: state.allClientUsers.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        allClientUsers: {
          details: action.payload.map(e => (e.isChecked ? e : state.allClientUsers.details.find((el) => (el.user_id === e.user_id && el.isChecked)) || e)),
          fetching: false,
          error: null,
        },
      };
    case FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS_ERROR:
      return {
        ...state,
        allClientUsers: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_CUSTOM_NOTIFICATION_EMAILS:
      return {
        ...state,
        allCustomNotificationEmails: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_CUSTOM_NOTIFICATION_EMAILS_SUCCESS:
      return {
        ...state,
        allCustomNotificationEmails: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_CUSTOM_NOTIFICATION_EMAILS_ERROR:
      return {
        ...state,
        allCustomNotificationEmails: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
