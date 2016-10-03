/*
 *
 * ProfilePage actions
 *
 */

import {
  FETCH_CAMPAIGNS_SUCCESS,
  FETCH_CAMPAIGNS_ERROR,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
  FETCH_PATIENT_CATEGORIES_SUCCESS,
  FETCH_PATIENT_CATEGORIES_ERROR,
  FETCH_SITES_SUCCESS,
  FETCH_SITES_ERROR,
  FETCH_SOURCES_SUCCESS,
  FETCH_SOURCES_ERROR,
  FETCH_STUDY_SUCCESS,
  FETCH_STUDY_ERROR
} from './constants';

export function campaignsFetched(payload) {
  return {
    type: FETCH_CAMPAIGNS_SUCCESS,
    payload,
  };
}

export function campaignsFetchingError(payload) {
  return {
    type: FETCH_CAMPAIGNS_ERROR,
    payload,
  };
}

export function patientsFetched(payload) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload,
  };
}

export function patientsFetchingError(payload) {
  return {
    type: FETCH_PATIENTS_ERROR,
    payload,
  };
}

export function patientCategoriesFetched(payload) {
  return {
    type: FETCH_PATIENT_CATEGORIES_SUCCESS,
    payload,
  };
}

export function patientCategoriesFetchingError(payload) {
  return {
    type: FETCH_PATIENT_CATEGORIES_ERROR,
    payload,
  };
}

export function sitesFetched(payload) {
  return {
    type: FETCH_SITES_SUCCESS,
    payload,
  };
}

export function sitesFetchingError(payload) {
  return {
    type: FETCH_SITES_ERROR,
    payload,
  };
}

export function sourcesFetched(payload) {
  return {
    type: FETCH_SOURCES_SUCCESS,
    payload,
  };
}

export function sourcesFetchingError(payload) {
  return {
    type: FETCH_SOURCES_ERROR,
    payload,
  };
}

export function studyFetched(payload) {
  return {
    type: FETCH_STUDY_SUCCESS,
    payload,
  };
}

export function studyFetchingError(payload) {
  return {
    type: FETCH_STUDY_ERROR,
    payload,
  };
}
