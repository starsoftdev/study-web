/*
 *
 * DashboardLockedUsers actions
 *
 */

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

export function fetchLockedUsers(query, limit, skip) {
  return {
    type: FETCH_LOCKED_USERS,
    query,
    limit,
    skip,
  };
}

export function fetchLockedUsersSuccess(payload, hasMoreItems, page) {
  return {
    type: FETCH_LOCKED_USERS_SUCCESS,
    payload,
    hasMoreItems,
    page,
  };
}

export function fetchLockedUsersError(payload) {
  return {
    type: FETCH_LOCKED_USERS_ERROR,
    payload,
  };
}

export function unlockUser(userId) {
  return {
    type: UNLOCK_USER,
    userId,
  };
}

export function unlockUserSuccess(payload) {
  return {
    type: UNLOCK_USER_SUCCESS,
    payload,
  };
}

export function unlockUserError(payload) {
  return {
    type: UNLOCK_USER_ERROR,
    payload,
  };
}

export function setActiveSort(sort, direction) {
  return {
    type: SET_ACTIVE_SORT,
    sort,
    direction,
  };
}

export function setSearchQuery(query) {
  return {
    type: SET_SEARCH_QUERY,
    query,
  };
}
