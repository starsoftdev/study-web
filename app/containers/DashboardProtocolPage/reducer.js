/*
 *
 * DashboardProtocolPage reducer
 *
 */

import _ from 'lodash';
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
  SET_SEARCH_QUERY,
} from './constants';

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
    hasMoreItems: false,
    page: 1,
    query: null,
  },
};

function dashboardProtocolPageReducer(state = initialState, action) {
  const newProtocols = _.cloneDeep(state.protocol.details);
  let foundUserIndex = null;
  let newProtocolsList = [];

  switch (action.type) {
    case FETCH_PROTOCOL:
      return {
        ...state,
        protocol: {
          details: state.protocol.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_PROTOCOL_SUCCESS:
      if (action.page === 1) {
        newProtocolsList = action.payload;
      } else {
        newProtocolsList = newProtocols.concat(action.payload);
      }
      return {
        ...state,
        protocol: {
          details: newProtocolsList,
          fetching: false,
          error: null,
        },
        paginationOptions: {
          activeSort: state.paginationOptions.activeSort,
          activeDirection: state.paginationOptions.activeDirection,
          hasMoreItems: action.hasMoreItems,
          page: action.page,
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

      console.log('edit', action.payload, foundUserIndex);
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
    case SET_SEARCH_QUERY:
      return {
        ...state,
        paginationOptions: {
          activeSort: null,
          activeDirection: null,
          hasMoreItems: false,
          page: 1,
          query: action.query,
        },
      };
    default:
      return state;
  }
}

export default dashboardProtocolPageReducer;
