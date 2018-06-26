/*
 * adminHome actions
 */

import {
  FETCH_MEDIA_TOTALS_FOR_ADMIN, FETCH_MEDIA_TOTALS_FOR_ADMIN_SUCCESS, FETCH_MEDIA_TOTALS_FOR_ADMIN_ERROR,
} from './constants';


export function fetchMediaTotalsForAdmin(params) {
  return {
    type: FETCH_MEDIA_TOTALS_FOR_ADMIN,
    params,
  };
}

export function fetchMediaTotalsForAdminSuccess(payload) {
  return {
    type: FETCH_MEDIA_TOTALS_FOR_ADMIN_SUCCESS,
    payload,
  };
}

export function fetchMediaTotalsForAdminError(payload) {
  return {
    type: FETCH_MEDIA_TOTALS_FOR_ADMIN_ERROR,
    payload,
  };
}

