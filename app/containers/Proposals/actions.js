/*
 *
 * Proposals actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_PROPOSALS,
  PROPOSALS_RECEIVED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function proposalsReceived(payload) {
  return {
    type: PROPOSALS_RECEIVED,
    payload,
  };
}

export function getProposals(payload) {
  return {
    type: GET_PROPOSALS,
    payload,
  };
}
