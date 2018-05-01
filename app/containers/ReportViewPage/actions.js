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
  CHANGE_PROTOCOL_STATUS,
  CHANGE_PROTOCOL_STATUS_SUCCESS,
  CHANGE_PROTOCOL_STATUS_ERROR,
  EXPORT_STUDIES,
  GET_REPORTS_TOTALS,
  GET_REPORTS_TOTALS_SUCCESS,
  GET_REPORTS_TOTALS_ERROR,
  GET_CATEGORY_NOTES,
  GET_CATEGORY_NOTES_SUCCESS,
  GET_CATEGORY_NOTES_ERROR,
  CLEAR_REPORT_LIST,
} from './constants';

export function getReportsList(searchParams, limit, offset, sort, order) {
  return {
    type: GET_REPORTS_LIST,
    searchParams,
    limit,
    offset,
    sort,
    order,
  };
}

export function getReportsListSuccess(payload, hasMoreItems, page) {
  return {
    type: GET_REPORTS_LIST_SUCCESS,
    payload,
    hasMoreItems,
    page,
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

export function changeProtocolStatus(payload) {
  return {
    type: CHANGE_PROTOCOL_STATUS,
    payload,
  };
}

export function changeProtocolStatusSuccess(payload) {
  return {
    type: CHANGE_PROTOCOL_STATUS_SUCCESS,
    payload,
  };
}

export function changeProtocolStatusError(payload) {
  return {
    type: CHANGE_PROTOCOL_STATUS_ERROR,
    payload,
  };
}

export function exportStudies(payload) {
  return {
    type: EXPORT_STUDIES,
    payload,
  };
}

export function getReportsTotals(searchParams) {
  return {
    type: GET_REPORTS_TOTALS,
    searchParams,
  };
}

export function getReportsTotalsSuccess(source, payload) {
  return {
    type: GET_REPORTS_TOTALS_SUCCESS,
    source,
    payload,
  };
}

export function getReportsTotalsError(payload) {
  return {
    type: GET_REPORTS_TOTALS_ERROR,
    payload,
  };
}

export function getCategoryNotes(searchParams, category, studyId, limit, offset) {
  return {
    type: GET_CATEGORY_NOTES,
    searchParams,
    category,
    studyId,
    limit,
    offset,
  };
}

export function getCategoryNotesSuccess(payload, hasMoreItems, page) {
  return {
    type: GET_CATEGORY_NOTES_SUCCESS,
    payload,
    hasMoreItems,
    page,
  };
}

export function getCategoryNotesError(payload) {
  return {
    type: GET_CATEGORY_NOTES_ERROR,
    payload,
  };
}

export function clearReportList() {
  return {
    type: CLEAR_REPORT_LIST,
  };
}
