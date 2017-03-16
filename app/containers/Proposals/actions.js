/*
 *
 * Proposals actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_PROPOSALS,
  PROPOSALS_RECEIVED,
  GET_PDF,
  CREATE_PDF,
  SHOW_PROPOSAL_PDF,
} from './constants';

import _ from 'lodash';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function proposalsReceived(payload) {
  const result = payload;
  _.forEach(result, (item, index) => {
    result[index].order_number = index + 1;
  });
  return {
    type: PROPOSALS_RECEIVED,
    payload: result,
  };
}

export function getProposals(payload) {
  return {
    type: GET_PROPOSALS,
    payload,
  };
}

export function createPDF(payload) {
  return {
    type: CREATE_PDF,
    payload,
  };
}

export function pdfCreated(payload) {
  return {
    type: GET_PDF,
    payload,
  };
}

export function showProposalPdf(proposalId) {
  return {
    type: SHOW_PROPOSAL_PDF,
    proposalId,
  };
}
