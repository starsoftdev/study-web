/*
 *
 * Proposals actions
 *
 */

import _ from 'lodash';
import {
  DEFAULT_ACTION,
  GET_PROPOSALS,
  PROPOSALS_RECEIVED,
  GET_PDF,
  CREATE_PDF,
  SHOW_PROPOSAL_PDF,
} from './constants';

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

export function getProposals(clientRoleId, searchParams) {
  return {
    type: GET_PROPOSALS,
    clientRoleId,
    searchParams,
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
