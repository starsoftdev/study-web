/*
 *
 * DashboardSponsorAdminPage actions
 *
 */

import {
  FETCH_SPONSORS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_SPONSORS_ERROR,
  FETCH_SPONSORS_WITHOUT_ADMIN,
  FETCH_SPONSORS_WITHOUT_ADMIN_SUCCESS,
  FETCH_SPONSORS_WITHOUT_ADMIN_ERROR,
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

export function fetchSponsorsWithoutAdmin() {
  return {
    type: FETCH_SPONSORS_WITHOUT_ADMIN,
  };
}

export function fetchSponsorsWithoutAdminSuccess(payload) {
  return {
    type: FETCH_SPONSORS_WITHOUT_ADMIN_SUCCESS,
    payload,
  };
}

export function fetchSponsorsWithoutAdminError(payload) {
  return {
    type: FETCH_SPONSORS_WITHOUT_ADMIN_ERROR,
    payload,
  };
}
