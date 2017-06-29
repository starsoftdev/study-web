/*
 *
 * DashboardMessagingNumbersPage reducer
 *
 */

import _ from 'lodash';

import {
  FETCH_MESSAGING_NUMBERS,
  FETCH_MESSAGING_NUMBERS_SUCCESS,
  FETCH_MESSAGING_NUMBERS_ERROR,
  ADD_MESSAGING_NUMBER,
  ADD_MESSAGING_NUMBER_SUCCESS,
  ADD_MESSAGING_NUMBER_ERROR,
  EDIT_MESSAGING_NUMBER,
  EDIT_MESSAGING_NUMBER_SUCCESS,
  EDIT_MESSAGING_NUMBER_ERROR,
  DELETE_MESSAGING_NUMBER,
  DELETE_MESSAGING_NUMBER_SUCCESS,
  DELETE_MESSAGING_NUMBER_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

const initialState = {
  messagingNumber: {
    details: [],
    fetching: false,
    error: null,
  },
  editMessagingNumberProcess: {
    saving: false,
    deleting: false,
    error: null,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
  },
};

function dashboardMessagingNumbersPageReducer(state = initialState, action) {
  const newMessagingNumber = _.cloneDeep(state.messagingNumber.details);
  let foundIndex = null;

  switch (action.type) {
    case FETCH_MESSAGING_NUMBERS:
      return {
        ...state,
        messagingNumber: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_MESSAGING_NUMBERS_SUCCESS:
      return {
        ...state,
        messagingNumber: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_MESSAGING_NUMBERS_ERROR:
      return {
        ...state,
        messagingNumber: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case ADD_MESSAGING_NUMBER:
      return {
        ...state,
        editMessagingNumberProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case ADD_MESSAGING_NUMBER_SUCCESS:
      newMessagingNumber.push(action.payload);
      return {
        ...state,
        messagingNumber: {
          details: newMessagingNumber,
          fetching: false,
          error: action.payload,
        },
        editMessagingNumberProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case ADD_MESSAGING_NUMBER_ERROR:
      return {
        ...state,
        editMessagingNumberProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case EDIT_MESSAGING_NUMBER:
      return {
        ...state,
        editMessagingNumberProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case EDIT_MESSAGING_NUMBER_SUCCESS:
      foundIndex = _.findIndex(newMessagingNumber, item => (item.id === action.payload.id));
      if (foundIndex !== -1) {
        newMessagingNumber.splice(foundIndex, 1, action.payload);
      }
      return {
        ...state,
        messagingNumber: {
          details: newMessagingNumber,
          fetching: false,
          error: action.payload,
        },
        editMessagingNumberProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case EDIT_MESSAGING_NUMBER_ERROR:
      return {
        ...state,
        editMessagingNumberProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case DELETE_MESSAGING_NUMBER:
      return {
        ...state,
        editMessagingNumberProcess: {
          saving: false,
          deleting: true,
          error: null,
        },
      };
    case DELETE_MESSAGING_NUMBER_SUCCESS:
      foundIndex = _.findIndex(newMessagingNumber, item => (item.id === action.payload.id));
      if (foundIndex !== -1) {
        newMessagingNumber.splice(foundIndex, 1);
      }
      return {
        ...state,
        messagingNumber: {
          details: newMessagingNumber,
          fetching: false,
          error: action.payload,
        },
        editMessagingNumberProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case DELETE_MESSAGING_NUMBER_ERROR:
      return {
        ...state,
        editMessagingNumberProcess: {
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

export default dashboardMessagingNumbersPageReducer;
