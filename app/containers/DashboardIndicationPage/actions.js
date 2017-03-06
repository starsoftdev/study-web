/*
 *
 * DashboardIndicationPage actions
 *
 */

import {
  FETCH_INDICATIONS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_INDICATIONS_ERROR,
} from './constants';

export function fetchIndications() {
  return {
    type: FETCH_INDICATIONS,
  };
}

export function fetchIndicationsSuccess(payload) {
  return {
    type: FETCH_INDICATIONS_SUCCESS,
    payload,
  };
}

export function fetchIndicationsError(payload) {
  return {
    type: FETCH_INDICATIONS_ERROR,
    payload,
  };
}
