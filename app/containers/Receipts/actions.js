/*
 *
 * Receipts actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_RECEIPT,
  RECEIPTS_RECEIVED,
  GET_PDF,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function receiptsReceived(payload) {
  return {
    type: RECEIPTS_RECEIVED,
    payload,
  };
}

export function getReceipts(payload) {
  return {
    type: GET_RECEIPT,
    payload,
  };
}

export function getPDF(payload) {
  return {
    type: GET_PDF,
    payload,
  };
}
