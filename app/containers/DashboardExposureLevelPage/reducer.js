/*
 *
 * DashboardExposureLevelPage reducer
 *
 */

import {
  FETCH_LEVEL,
  FETCH_LEVEL_SUCCESS,
  FETCH_LEVEL_ERROR,
  ADD_LEVEL,
  ADD_LEVEL_SUCCESS,
  ADD_LEVEL_ERROR,
  EDIT_LEVEL,
  EDIT_LEVEL_SUCCESS,
  EDIT_LEVEL_ERROR,
  DELETE_LEVEL,
  DELETE_LEVEL_SUCCESS,
  DELETE_LEVEL_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

import _ from 'lodash';

const initialState = {
  level: {
    details: [],
    fetching: false,
    error: null,
  },
  editLevelProcess: {
    saving: false,
    deleting: false,
    error: null,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
  },
};

function dashboardExposureLevelPageReducer(state = initialState, action) {
  const newLevel = _.cloneDeep(state.level.details);
  let foundUserIndex = null;

  switch (action.type) {
    case FETCH_LEVEL:
      return {
        ...state,
        level: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_LEVEL_SUCCESS:
      return {
        ...state,
        level: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_LEVEL_ERROR:
      return {
        ...state,
        level: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case ADD_LEVEL:
      return {
        ...state,
        editLevelProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case ADD_LEVEL_SUCCESS:
      newLevel.push(action.payload);
      return {
        ...state,
        level: {
          details: newLevel,
          fetching: false,
          error: action.payload,
        },
        editLevelProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case ADD_LEVEL_ERROR:
      return {
        ...state,
        editLevelProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case EDIT_LEVEL:
      return {
        ...state,
        editLevelProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case EDIT_LEVEL_SUCCESS:
      foundUserIndex = _.findIndex(newLevel, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newLevel.splice(foundUserIndex, 1, action.payload);
      }
      return {
        ...state,
        level: {
          details: newLevel,
          fetching: false,
          error: action.payload,
        },
        editLevelProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case EDIT_LEVEL_ERROR:
      return {
        ...state,
        editLevelProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case DELETE_LEVEL:
      return {
        ...state,
        editLevelProcess: {
          saving: false,
          deleting: true,
          error: null,
        },
      };
    case DELETE_LEVEL_SUCCESS:
      foundUserIndex = _.findIndex(newLevel, item => (item.id === action.payload.id));
      if (foundUserIndex !== -1) {
        newLevel.splice(foundUserIndex, 1);
      }
      return {
        ...state,
        level: {
          details: newLevel,
          fetching: false,
          error: action.payload,
        },
        editLevelProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case DELETE_LEVEL_ERROR:
      return {
        ...state,
        editLevelProcess: {
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

export default dashboardExposureLevelPageReducer;
