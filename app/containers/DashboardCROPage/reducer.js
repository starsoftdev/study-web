/*
 *
 * DashboardCROPage reducer
 *
 */

import _ from 'lodash';

import {
  FETCH_CRO,
  FETCH_CRO_SUCCESS,
  FETCH_CRO_ERROR,
  ADD_CRO,
  ADD_CRO_SUCCESS,
  ADD_CRO_ERROR,
  EDIT_CRO,
  EDIT_CRO_SUCCESS,
  EDIT_CRO_ERROR,
  DELETE_CRO,
  DELETE_CRO_SUCCESS,
  DELETE_CRO_ERROR,
  SET_ACTIVE_SORT,
  SET_SEARCH_QUERY,
} from './constants';

const initialState = {
  cro: {
    details: [],
    fetching: false,
    error: null,
  },
  editCroProcess: {
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

function dashboardCROPageReducer(state = initialState, action) {
  const newCro = _.cloneDeep(state.cro.details);
  let foundUserIndex = null;
  let newCroList = [];


  switch (action.type) {
    case FETCH_CRO:
      return {
        ...state,
        cro: {
          details: state.cro.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_CRO_SUCCESS:
      if (action.page === 1) {
        newCroList = action.payload;
      } else {
        newCroList = newCro.concat(action.payload);
      }

      return {
        ...state,
        cro: {
          details: newCroList,
          fetching: false,
          error: null,
        },
        paginationOptions: {
          query: state.paginationOptions.query,
          activeSort: state.paginationOptions.activeSort,
          activeDirection: state.paginationOptions.activeDirection,
          hasMoreItems: action.hasMoreItems,
          page: action.page,
        },
      };
    case FETCH_CRO_ERROR:
      return {
        ...state,
        cro: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case ADD_CRO:
      return {
        ...state,
        editCroProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case ADD_CRO_SUCCESS:
      newCro.push(action.payload);
      return {
        ...state,
        cro: {
          details: newCro,
          fetching: false,
          error: action.payload,
        },
        editCroProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case ADD_CRO_ERROR:
      return {
        ...state,
        editCroProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case EDIT_CRO:
      return {
        ...state,
        editCroProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case EDIT_CRO_SUCCESS:
      foundUserIndex = _.findIndex(newCro, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newCro.splice(foundUserIndex, 1, action.payload);
      }
      return {
        ...state,
        cro: {
          details: newCro,
          fetching: false,
          error: action.payload,
        },
        editCroProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case EDIT_CRO_ERROR:
      return {
        ...state,
        editCroProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case DELETE_CRO:
      return {
        ...state,
        editCroProcess: {
          saving: false,
          deleting: true,
          error: null,
        },
      };
    case DELETE_CRO_SUCCESS:
      foundUserIndex = _.findIndex(newCro, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newCro.splice(foundUserIndex, 1);
      }
      return {
        ...state,
        cro: {
          details: newCro,
          fetching: false,
          error: action.payload,
        },
        editCroProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case DELETE_CRO_ERROR:
      return {
        ...state,
        editCroProcess: {
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

export default dashboardCROPageReducer;
