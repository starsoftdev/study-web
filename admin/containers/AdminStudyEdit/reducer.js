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
  FETCH_LANDING,
  FETCH_LANDING_SUCCESS,
  FETCH_LANDING_ERROR,
  EDIT_PATIENT_THANK_YOU,
  EDIT_PATIENT_THANK_YOU_SUCCESS,
  EDIT_PATIENT_THANK_YOU_ERROR,
  UPDATE_THANK_YOU_PAGE,
  UPDATE_THANK_YOU_PAGE_SUCCESS,
  UPDATE_THANK_YOU_PAGE_ERROR,
  RESET_THANK_YOU_PAGE_STATE,
} from './constants';

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
  landing: {
    details: null,
    fetching: true,
    error: null,
  },
  updatePatientThankYouEmailProcess: {
    success: false,
    saving: false,
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
    case EDIT_PATIENT_THANK_YOU:
      return {
        ...state,
        updatePatientThankYouEmailProcess: {
          success: false,
          saving: true,
          error: null,
        },
      };
    case EDIT_PATIENT_THANK_YOU_SUCCESS:
      return {
        ...state,
        updatePatientThankYouEmailProcess: {
          success: true,
          saving: false,
          error: null,
        },
      };
    case EDIT_PATIENT_THANK_YOU_ERROR:
      return {
        ...state,
        updatePatientThankYouEmailProcess: {
          success: false,
          saving: false,
          error: true,
        },
      };
    default:
      return state;
  }
}
