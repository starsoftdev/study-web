import {
  FETCH_VENDOR_SITES,
  FETCH_VENDOR_SITES_SUCCESS,
  FETCH_VENDOR_SITES_ERROR,

  FETCH_PATIENT_SIGN_UPS,
  FETCH_PATIENT_SIGN_UPS_SUCCESS,
  FETCH_PATIENT_SIGN_UPS_ERROR,

  FETCH_PATIENT_MESSAGES_COUNT,
  FETCH_PATIENT_MESSAGES_COUNT_SUCCESS,
  FETCH_PATIENT_MESSAGES_COUNT_ERROR,

  SET_ACTIVE_SORT,
  SORT_SUCCESS,

  FETCH_STUDIES,
  FETCH_STUDIES_SUCCESS,
  FETCH_STUDIES_ERROR,
} from './constants';

export function fetchVendorSites(vendorId) {
  return {
    type: FETCH_VENDOR_SITES,
    vendorId,
  };
}

export function fetchVendorSitesSuccess(payload) {
  return {
    type: FETCH_VENDOR_SITES_SUCCESS,
    payload,
  };
}

export function fetchVendorSitesError(payload) {
  return {
    type: FETCH_VENDOR_SITES_ERROR,
    payload,
  };
}

export function fetchPatientSignUps(vendorId, timezone) {
  return {
    type: FETCH_PATIENT_SIGN_UPS,
    vendorId,
    timezone,
  };
}

export function fetchPatientSignUpsSuccess(payload) {
  return {
    type: FETCH_PATIENT_SIGN_UPS_SUCCESS,
    payload,
  };
}

export function fetchPatientSignUpsError(payload) {
  return {
    type: FETCH_PATIENT_SIGN_UPS_ERROR,
    payload,
  };
}

export function fetchPatientMessagesCount(vendorId) {
  return {
    type: FETCH_PATIENT_MESSAGES_COUNT,
    vendorId,
  };
}

export function fetchPatientMessagesCountSuccess(payload) {
  return {
    type: FETCH_PATIENT_MESSAGES_COUNT_SUCCESS,
    payload,
  };
}

export function fetchPatientMessagesCountError(payload) {
  return {
    type: FETCH_PATIENT_MESSAGES_COUNT_ERROR,
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

export function sortSuccess(payload) {
  return {
    type: SORT_SUCCESS,
    payload,
  };
}

export function fetchStudies(currentUser, searchParams) {
  return {
    type: FETCH_STUDIES,
    currentUser,
    searchParams,
  };
}

export function studiesFetched(payload) {
  return {
    type: FETCH_STUDIES_SUCCESS,
    payload,
  };
}

export function studiesFetchingError(payload) {
  return {
    type: FETCH_STUDIES_ERROR,
    payload,
  };
}
