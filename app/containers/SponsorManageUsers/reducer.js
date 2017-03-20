/*
 *
 * SponsorManageUsers reducer
 *
 */

import {
  FETCH_MANAGE_SPONSOR_USERS_DATA,
  FETCH_MANAGE_SPONSOR_USERS_DATA_SUCCESS,
  FETCH_MANAGE_SPONSOR_USERS_DATA_ERROR,
  EDIT_SPONSOR_USER,
  EDIT_SPONSOR_USER_SUCCESS,
  EDIT_SPONSOR_USER_ERROR,
  DELETE_SPONSOR_USER,
  DELETE_SPONSOR_USER_SUCCESS,
  DELETE_SPONSOR_USER_ERROR,
  SET_ACTIVE_ADMIN_SORT,
  SET_ACTIVE_PROTOCOLS_SORT,
  EDIT_PROTOCOL,
  EDIT_PROTOCOL_SUCCESS,
  EDIT_PROTOCOL_ERROR,
} from './constants';

import _ from 'lodash';

const initialState = {
  editUserProcess: {
    saving: false,
    error: null,
  },
  deleteUserProcess: {
    deleting: false,
    error: null,
  },
  editProtocolProcess: {
    saving: false,
    error: null,
  },
  manageSponsorUsersData:{
    studiesList: [],
    adminsList: [],
    fetching: false,
    error: null,
  },
  paginationOptionsAdmin: {
    activeSort: null,
    activeDirection: null,
  },
  paginationOptionsProtocols: {
    activeSort: null,
    activeDirection: null,
  },
};

function sponsorManageUsersReducer(state = initialState, action) {
  const protocols = [];
  switch (action.type) {
    case FETCH_MANAGE_SPONSOR_USERS_DATA:
      return {
        ...state,
        manageSponsorUsersData: {
          studiesList: state.manageSponsorUsersData.studiesList,
          adminsList: state.manageSponsorUsersData.adminsList,
          fetching: true,
          error: null,
        },
      };
    case FETCH_MANAGE_SPONSOR_USERS_DATA_SUCCESS:
      _.forEach(action.payload.studiesList, (item) => {
        protocols.push({ id: item.id, name: item.protocolNumber });
      });
      return {
        ...state,
        protocols,
        manageSponsorUsersData: {
          studiesList: action.payload.studiesList,
          adminsList: action.payload.adminsList,
          fetching: false,
          error: null,
        },
      };
    case FETCH_MANAGE_SPONSOR_USERS_DATA_ERROR:
      return {
        ...state,
        manageSponsorUsersData: {
          studiesList: state.manageSponsorUsersData.studiesList,
          adminsList: state.manageSponsorUsersData.adminsList,
          fetching: false,
          error: action.payload,
        },
      };
    case EDIT_SPONSOR_USER:
      return {
        ...state,
        editUserProcess: {
          saving: true,
          error: null,
        },
      };
    case EDIT_SPONSOR_USER_SUCCESS:
      return {
        ...state,
        editUserProcess: {
          saving: false,
          error: null,
        },
      };
    case EDIT_SPONSOR_USER_ERROR:
      return {
        ...state,
        editUserProcess: {
          saving: false,
          error: action.payload,
        },
      };
    case DELETE_SPONSOR_USER:
      return {
        ...state,
        deleteUserProcess: {
          deleting: true,
          error: null,
        },
      };
    case DELETE_SPONSOR_USER_SUCCESS:
      return {
        ...state,
        deleteUserProcess: {
          deleting: false,
          error: null,
        },
      };
    case DELETE_SPONSOR_USER_ERROR:
      return {
        ...state,
        deleteUserProcess: {
          deleting: false,
          error: action.payload,
        },
      };
    case SET_ACTIVE_ADMIN_SORT:
      return {
        ...state,
        paginationOptionsAdmin: {
          activeSort: action.sort,
          activeDirection: action.direction,
        },
      };
    case SET_ACTIVE_PROTOCOLS_SORT:
      return {
        ...state,
        paginationOptionsProtocols: {
          activeSort: action.sort,
          activeDirection: action.direction,
        },
      };
    case EDIT_PROTOCOL:
      return {
        ...state,
        editProtocolProcess: {
          saving: true,
          error: null,
        },
      };
    case EDIT_PROTOCOL_SUCCESS:
      return {
        ...state,
        editProtocolProcess: {
          saving: false,
          error: null,
        },
      };
    case EDIT_PROTOCOL_ERROR:
      return {
        ...state,
        editProtocolProcess: {
          saving: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export default sponsorManageUsersReducer;
