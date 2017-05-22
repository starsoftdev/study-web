/*
 *
 * DashboardNotePage reducer
 *
 */

import _ from 'lodash';

import {
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
  FETCH_SITES,
  FETCH_SITES_SUCCESS,
  FETCH_SITES_ERROR,
  SET_ACTIVE_SORT,
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
  clientSites: {
    details: [],
    fetching: false,
    error: null,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
  },
};

function dashboardNotePageReducer(state = initialState, action) {
  const newNote = _.cloneDeep(state.note.details);
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
    case FETCH_SITES:
      return {
        ...state,
        clientSites: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_SITES_SUCCESS:
      return {
        ...state,
        clientSites: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_SITES_ERROR:
      return {
        ...state,
        clientSites: {
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
    case ADD_NOTE_SUCCESS:
      newNote.push(action.payload);
      return {
        ...state,
        note: {
          details: newNote,
          fetching: false,
          error: action.payload,
        },
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case ADD_NOTE_ERROR:
      return {
        ...state,
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case EDIT_NOTE:
      return {
        ...state,
        editNoteProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case EDIT_NOTE_SUCCESS:
      foundUserIndex = _.findIndex(newNote, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newNote.splice(foundUserIndex, 1, action.payload);
      }
      return {
        ...state,
        note: {
          details: newNote,
          fetching: false,
          error: action.payload,
        },
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case EDIT_NOTE_ERROR:
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
    case DELETE_NOTE_SUCCESS:
      foundUserIndex = _.findIndex(newNote, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newNote.splice(foundUserIndex, 1);
      }
      return {
        ...state,
        note: {
          details: newNote,
          fetching: false,
          error: action.payload,
        },
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case DELETE_NOTE_ERROR:
      return {
        ...state,
        editNoteProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case SET_ACTIVE_SORT:
      return {
        ...state,
        paginationOptions: {
          activeSort: action.sort,
          activeDirection: action.direction,
        },
      };
    default:
      return state;
  }
}

export default dashboardNotePageReducer;
