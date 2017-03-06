/*
 *
 * DashboardProtocolPage reducer
 *
 */

import {
  FETCH_PROTOCOL,
  FETCH_PROTOCOL_SUCCESS,
  FETCH_PROTOCOL_ERROR,
  ADD_PROTOCOL,
  ADD_PROTOCOL_SUCCESS,
  ADD_PROTOCOL_ERROR,
  EDIT_PROTOCOL,
  EDIT_PROTOCOL_SUCCESS,
  EDIT_PROTOCOL_ERROR,
  DELETE_PROTOCOL,
  DELETE_PROTOCOL_SUCCESS,
  DELETE_PROTOCOL_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

import _ from 'lodash';

const initialState = {
  protocol: {
    details: [],
    fetching: false,
    error: null,
  },
  editProtocolProcess: {
    saving: false,
    deleting: false,
    error: null,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
  },
};

function dashboardProtocolPageReducer(state = initialState, action) {
  const newProtocols = _.cloneDeep(state.protocol.details);
  let foundUserIndex = null;

  switch (action.type) {
    case FETCH_PROTOCOL:
      return {
        ...state,
        protocol: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_PROTOCOL_SUCCESS:
      return {
        ...state,
        protocol: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_PROTOCOL_ERROR:
      return {
        ...state,
        protocol: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case ADD_PROTOCOL:
      return {
        ...state,
        editProtocolProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case ADD_PROTOCOL_SUCCESS:
      newProtocols.push(action.payload);
      return {
        ...state,
        protocol: {
          details: newProtocols,
          fetching: false,
          error: action.payload,
        },
        editProtocolProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case ADD_PROTOCOL_ERROR:
      return {
        ...state,
        editProtocolProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case EDIT_PROTOCOL:
      return {
        ...state,
        editProtocolProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case EDIT_PROTOCOL_SUCCESS:
      foundUserIndex = _.findIndex(newProtocols, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newProtocols.splice(foundUserIndex, 1, action.payload);
      }
      return {
        ...state,
        protocol: {
          details: newProtocols,
          fetching: false,
          error: action.payload,
        },
        editProtocolProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case EDIT_PROTOCOL_ERROR:
      return {
        ...state,
        editProtocolProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case DELETE_PROTOCOL:
      return {
        ...state,
        editProtocolProcess: {
          saving: false,
          deleting: true,
          error: null,
        },
      };
    case DELETE_PROTOCOL_SUCCESS:
      foundUserIndex = _.findIndex(newProtocols, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newProtocols.splice(foundUserIndex, 1);
      }
      return {
        ...state,
        protocol: {
          details: newProtocols,
          fetching: false,
          error: action.payload,
        },
        editProtocolProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case DELETE_PROTOCOL_ERROR:
      return {
        ...state,
        editProtocolProcess: {
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

export default dashboardProtocolPageReducer;
