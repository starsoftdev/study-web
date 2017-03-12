/*
 *
 * DashboardClientAdminsPage reducer
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_CLIENT_ADMINS,
  FETCH_CLIENT_ADMINS_SUCCESS,
  FETCH_CLIENT_ADMINS_ERROR,
  ADD_CLIENT_ADMINS,
  ADD_CLIENT_ADMINS_SUCCESS,
  ADD_CLIENT_ADMINS_ERROR,
  DELETE_CLIENT_ADMINS,
  DELETE_CLIENT_ADMINS_SUCCESS,
  DELETE_CLIENT_ADMINS_ERROR,
  EDIT_CLIENT_ADMINS,
  EDIT_CLIENT_ADMINS_SUCCESS,
  EDIT_CLIENT_ADMINS_ERROR,
  FETCH_USERS_BY_ROLES,
  FETCH_USERS_BY_ROLES_SUCCESS,
  FETCH_USERS_BY_ROLES_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

const initialState = {
  clientAdmins: {
    details: [],
    fetching: false,
    error: null,
  },
  usersByRoles: {
    details: {},
    fetching: false,
    error: null,
  },
  editUserProcess: {
    saving: false,
    deleting: false,
    error: null,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
  },
};

function dashboardClientAdminsPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_CLIENT_ADMINS:
      return {
        ...state,
        clientAdmins: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_CLIENT_ADMINS_SUCCESS:
      return {
        ...state,
        clientAdmins: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_CLIENT_ADMINS_ERROR:
      return {
        ...state,
        clientAdmins: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case ADD_CLIENT_ADMINS:
      return {
        ...state,
        editUserProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case ADD_CLIENT_ADMINS_SUCCESS:
      return {
        ...state,
        editUserProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case ADD_CLIENT_ADMINS_ERROR:
      return {
        ...state,
        editUserProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case DELETE_CLIENT_ADMINS:
      return {
        ...state,
        editUserProcess: {
          saving: false,
          deleting: true,
          error: null,
        },
      };
    case DELETE_CLIENT_ADMINS_SUCCESS:
      return {
        ...state,
        editUserProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case DELETE_CLIENT_ADMINS_ERROR:
      return {
        ...state,
        editUserProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case EDIT_CLIENT_ADMINS:
      return {
        ...state,
        editUserProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case EDIT_CLIENT_ADMINS_SUCCESS:
      return {
        ...state,
        editUserProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case EDIT_CLIENT_ADMINS_ERROR:
      return {
        ...state,
        editUserProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case FETCH_USERS_BY_ROLES:
      return {
        ...state,
        usersByRoles: {
          details: {},
          fetching: true,
          error: null,
        },
      };
    case FETCH_USERS_BY_ROLES_SUCCESS:
      return {
        ...state,
        usersByRoles: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_USERS_BY_ROLES_ERROR:
      return {
        ...state,
        usersByRoles: {
          details: {},
          fetching: false,
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

export default dashboardClientAdminsPageReducer;
