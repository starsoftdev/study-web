/*
 *
 * DashboardSponsorAdminPage actions
 *
 */

import {
  FETCH_SPONSORS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_SPONSORS_ERROR,
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
