/*
 *
 * ReportViewPage actions
 *
 */

import {
  GET_REPORTS_LIST,
  GET_REPORTS_LIST_SUCCESS,
  GET_REPORTS_LIST_ERROR,
  SET_ACTIVE_SORT,
  SORT_REPORTS_SUCCESS,
} from './constants';

export function getReportsList(searchParams) {
  return {
    type: GET_REPORTS_LIST,
    searchParams,
  };
}

export function getReportsListSuccess(payload) {
  return {
    type: GET_REPORTS_LIST_SUCCESS,
    payload,
  };
}

export function getReportsListError(payload) {
  return {
    type: GET_REPORTS_LIST_ERROR,
    payload,
  };
}

export function setActiveSort(sort, direction) {
  return {
    type: SET_ACTIVE_SORT,
    sort,
    direction,
  };
}

export function sortReportsSuccess(reports) {
  return {
    type: SORT_REPORTS_SUCCESS,
    reports,
  };
}
