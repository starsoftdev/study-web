/*
 *
 * DashboardLockedUsers reducer
 *
 */

import _ from 'lodash';

import {
  FETCH_LOCKED_USERS,
  FETCH_LOCKED_USERS_SUCCESS,
  FETCH_LOCKED_USERS_ERROR,
  UNLOCK_USER,
  UNLOCK_USER_SUCCESS,
  UNLOCK_USER_ERROR,
  SET_ACTIVE_SORT,
  SET_SEARCH_QUERY,
} from './constants';

const initialState = {
  lockedUsers: {
    details: [],
    fetching: false,
    error: null,
  },
  unlockUserProcess: {
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

function dashboardLockedUsersReducer(state = initialState, action) {
  const newLockedUsers = _.cloneDeep(state.lockedUsers.details);
  let foundUserIndex = null;
  let newLockedUserList = [];


  switch (action.type) {
    case FETCH_LOCKED_USERS:
      return {
        ...state,
        users: {
          details: state.lockedUsers.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_LOCKED_USERS_SUCCESS:
      if (action.page === 1) {
        newLockedUserList = action.payload;
      } else {
        newLockedUserList = newLockedUsers.concat(action.payload);
      }

      return {
        ...state,
        lockedUsers: {
          details: newLockedUserList,
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
    case FETCH_LOCKED_USERS_ERROR:
      return {
        ...state,
        lockedUsers: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case UNLOCK_USER:
      return {
        ...state,
        unlockUserProcess: {
          saving: false,
          deleting: true,
          error: null,
        },
      };
    case UNLOCK_USER_SUCCESS:
      foundUserIndex = _.findIndex(newLockedUsers, item => (item.user_id === action.payload));
      if (foundUserIndex !== -1) {
        newLockedUsers.splice(foundUserIndex, 1);
      }
      return {
        ...state,
        lockedUsers: {
          details: newLockedUsers,
          fetching: false,
          error: null,
        },
        unlockUserProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case UNLOCK_USER_ERROR:
      return {
        ...state,
        unlockUserProcess: {
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

export default dashboardLockedUsersReducer;
