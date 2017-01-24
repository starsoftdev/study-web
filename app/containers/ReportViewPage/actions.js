/*
 *
 * ReportViewPage actions
 *
 */

import {
  GET_REPORTS_LIST,
  GET_REPORTS_LIST_SUCCESS,
  GET_REPORTS_LIST_ERROR,
} from './constants';

export function getReportsList(searchParams) {
  return {
    type: GET_REPORTS_LIST,
    searchParams
  };
}

export function getReportsListSuccess(payload) {
  return {
    type: GET_REPORTS_LIST_SUCCESS,
    payload
  };
}

export function getReportsListError(payload) {
  return {
    type: GET_REPORTS_LIST_ERROR,
    payload
  };
}
