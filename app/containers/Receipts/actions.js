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

export function getReceipts(limit, offset, payload) {
  return {
    type: GET_RECEIPT,
    limit,
    offset,
    payload,
  };
}

export function getPDF(payload) {
  return {
    type: GET_PDF,
    payload,
  };
}
