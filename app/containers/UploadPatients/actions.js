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
  VALIDATION_ERROR,
  ADD_PROTOCOL,
  ADD_PROTOCOL_SUCCESS,
  ADD_PROTOCOL_ERROR,
  FETCH_HISTORY,
  FETCH_HISTORY_SUCCESS,
  FETCH_HISTORY_ERROR,
  REVERT_BULK_UPLOAD,
  REVERT_BULK_UPLOAD_SUCCESS,
  REVERT_BULK_UPLOAD_ERROR,
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

export function fetchHistory(userId) {
  return {
    type: FETCH_HISTORY,
    userId,
  };
}

export function historyFetched(payload) {
  return {
    type: FETCH_HISTORY_SUCCESS,
    payload,
  };
}

export function historyFetchingError(payload) {
  return {
    type: FETCH_HISTORY_ERROR,
    payload,
  };
}

export function revertBulkUpload(uploadId) {
  return {
    type: REVERT_BULK_UPLOAD,
    uploadId,
  };
}

export function revertBulkUploadSucceess() {
  return {
    type: REVERT_BULK_UPLOAD_SUCCESS,
  };
}

export function revertBulkUploadError(payload) {
  return {
    type: REVERT_BULK_UPLOAD_ERROR,
    payload,
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

export function validationError(hasError) {
  return {
    type: VALIDATION_ERROR,
    hasError,
  };
}

export function addProtocol(payload) {
  return {
    type: ADD_PROTOCOL,
    payload,
  };
}

export function addProtocolSucceess(payload) {
  return {
    type: ADD_PROTOCOL_SUCCESS,
    payload,
  };
}

export function addProtocolError(payload) {
  return {
    type: ADD_PROTOCOL_ERROR,
    payload,
  };
}
