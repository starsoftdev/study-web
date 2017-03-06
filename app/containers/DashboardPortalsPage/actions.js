/*
 *
 * DashboardPortalsPage actions
 *
 */

import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,

  FETCH_SPONSORS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_SPONSORS_ERROR,

  SUBMIT_TO_CLIENT_PORTAL,
  SUBMIT_TO_SPONSOR_PORTAL,
} from './constants';

export function fetchClients() {
  return {
    type: FETCH_CLIENTS,
  };
}

export function fetchClientsSuccess(payload) {
  return {
    type: FETCH_CLIENTS_SUCCESS,
    payload,
  };
}

export function fetchClientsError(payload) {
  return {
    type: FETCH_CLIENTS_ERROR,
    payload,
  };
}

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

export function submitToClientPortal(userId) {
  return {
    type: SUBMIT_TO_CLIENT_PORTAL,
    userId,
  };
}

export function submitToSponsorsPortal(userId) {
  return {
    type: SUBMIT_TO_SPONSOR_PORTAL,
    userId,
  };
}
