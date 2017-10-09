/*
 *
 * Patient Database page actions
 *
 */
import {
  FETCH_FILTERED_PROTOCOLS,
  FETCH_FILTERED_PROTOCOLS_SUCCESS,
  FETCH_FILTERED_PROTOCOLS_ERROR,
  EXPORT_PATIENTS,
  EXPORT_PATIENTS_SUCCESS,
  EXPORT_PATIENTS_ERROR,
  EMPTY_ROW_REQUIRED_ERROR,
} from './constants';

export function exportPatients(data) {
  return {
    type: EXPORT_PATIENTS,
    data,
  };
}

export function patientsExported(payload) {
  return {
    type: EXPORT_PATIENTS_SUCCESS,
    payload,
  };
}

export function exportPatientsError(payload) {
  return {
    type: EXPORT_PATIENTS_ERROR,
    payload,
  };
}

export function fetchFilteredProtcols(clientId, siteId) {
  return {
    type: FETCH_FILTERED_PROTOCOLS,
    clientId,
    siteId,
  };
}

export function filteredProtcolsFetched(payload) {
  return {
    type: FETCH_FILTERED_PROTOCOLS_SUCCESS,
    payload,
  };
}

export function filteredProtcolsFetchingError(payload) {
  return {
    type: FETCH_FILTERED_PROTOCOLS_ERROR,
    payload,
  };
}

export function emptyRowRequiredError(hasEmpty) {
  return {
    type: EMPTY_ROW_REQUIRED_ERROR,
    hasEmpty,
  };
}
