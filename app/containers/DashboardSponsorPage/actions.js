/*
 *
 * DashboardSponsorPage actions
 *
 */

import {
  FETCH_SPONSORS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_SPONSORS_ERROR,
  ADD_SPONSOR,
  ADD_SPONSOR_SUCCESS,
  ADD_SPONSOR_ERROR,
  EDIT_SPONSOR,
  EDIT_SPONSOR_SUCCESS,
  EDIT_SPONSOR_ERROR,
  DELETE_SPONSOR,
  DELETE_SPONSOR_SUCCESS,
  DELETE_SPONSOR_ERROR,
  SET_ACTIVE_SORT,
} from './constants';

export function fetchSponsors() {
  return {
    type: FETCH_SPONSORS,
  };
}

export function fetchSponsorsSuccess(payload) {
  return {
    type: FETCH_SPONSORS_SUCCESS,
    payload,
  };
}

export function fetchSponsorsError(payload) {
  return {
    type: FETCH_SPONSORS_ERROR,
    payload,
  };
}

export function addSponsor(payload) {
  return {
    type: ADD_SPONSOR,
    payload,
  };
}

export function addSponsorSuccess(payload) {
  return {
    type: ADD_SPONSOR_SUCCESS,
    payload,
  };
}

export function addSponsorError(payload) {
  return {
    type: ADD_SPONSOR_ERROR,
    payload,
  };
}

export function editSponsor(payload) {
  return {
    type: EDIT_SPONSOR,
    payload,
  };
}

export function editSponsorSuccess(payload) {
  return {
    type: EDIT_SPONSOR_SUCCESS,
    payload,
  };
}

export function editSponsorError(payload) {
  return {
    type: EDIT_SPONSOR_ERROR,
    payload,
  };
}

export function deleteSponsor(payload) {
  return {
    type: DELETE_SPONSOR,
    payload,
  };
}

export function deleteSponsorSuccess(payload) {
  return {
    type: DELETE_SPONSOR_SUCCESS,
    payload,
  };
}

export function deleteSponsorError(payload) {
  return {
    type: DELETE_SPONSOR_ERROR,
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
