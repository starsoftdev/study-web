/*
 *
 * Patient Database page actions
 *
 */

import { filter, findIndex } from 'lodash';

import {
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,

  FETCH_PATIENT_CATEGORIES,
  FETCH_PATIENT_CATEGORIES_SUCCESS,
  FETCH_PATIENT_CATEGORIES_ERROR,

  FETCH_PATIENT,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_ERROR,

  CLEAR_SELECTED_PATIENT,

  SAVE_PATIENT,
  SAVE_PATIENT_SUCCESS,
  SAVE_PATIENT_ERROR,

  INIT_CHAT,
  DISABLE_CHAT,

  ADD_PATIENTS_TO_TEXT_BLAST,
  REMOVE_PATIENT_FROM_TEXT_BLAST,
  REMOVE_PATIENTS_FROM_TEXT_BLAST,
  SUBMIT_TEXT_BLAST,
} from './constants';

export function fetchPatients(searchParams = {}) {
  return {
    type: FETCH_PATIENTS,
    searchParams,
  };
}

export function patientsFetched(searchParams, payload) {
  let result = payload;
  if (searchParams.includeIndication) {
    const includeIndications = searchParams.includeIndication.split(',');
    result = filter(result, patientIterator => {
      const foundIndications = filter(includeIndications, includeIterator => {
        const foundIndex = findIndex(patientIterator.indications, { id: parseInt(includeIterator, 10) });
        return (foundIndex > -1);
      });
      return foundIndications.length;
    });
  }

  if (searchParams.excludeIndication) {
    const excludeIndications = searchParams.excludeIndication.split(',');
    result = filter(result, patientIterator => {
      const foundIndications = filter(excludeIndications, excludeIterator => {
        const foundIndex = findIndex(patientIterator.indications, { id: parseInt(excludeIterator, 10) });
        return (foundIndex > -1);
      });
      return !foundIndications.length;
    });
  }

  if (searchParams.status) {
    result = filter(result, patientIterator => (patientIterator.studyPatientCategory.patient_category_id === searchParams.status));
  }

  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload: result,
  };
}

export function patientsFetchingError(payload) {
  return {
    type: FETCH_PATIENTS_ERROR,
    payload,
  };
}

export function fetchPatientCategories(searchParams) {
  return {
    type: FETCH_PATIENT_CATEGORIES,
    searchParams,
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

export function fetchPatient(id) {
  return {
    type: FETCH_PATIENT,
    id,
  };
}

export function patientFetched(payload) {
  return {
    type: FETCH_PATIENT_SUCCESS,
    payload,
  };
}

export function patientFetchingError(payload) {
  return {
    type: FETCH_PATIENT_ERROR,
    payload,
  };
}

export function clearSelectedPatient() {
  return {
    type: CLEAR_SELECTED_PATIENT,
  };
}

export function savePatient(id, data) {
  return {
    type: SAVE_PATIENT,
    id,
    data,
  };
}

export function patientSaved(payload) {
  return {
    type: SAVE_PATIENT_SUCCESS,
    payload,
  };
}

export function patientSavingError(payload) {
  return {
    type: SAVE_PATIENT_ERROR,
    payload,
  };
}

export function initChat(payload) {
  return {
    type: INIT_CHAT,
    payload,
  };
}

export function disableChat() {
  return {
    type: DISABLE_CHAT,
  };
}

export function addPatientsToTextBlast(patients) {
  return {
    type: ADD_PATIENTS_TO_TEXT_BLAST,
    patients,
  };
}

export function removePatientFromTextBlast(patient) {
  return {
    type: REMOVE_PATIENT_FROM_TEXT_BLAST,
    patient,
  };
}

export function removePatientsFromTextBlast() {
  return {
    type: REMOVE_PATIENTS_FROM_TEXT_BLAST,
  };
}

export function submitTextBlast(patients, message, onClose) {
  return {
    type: SUBMIT_TEXT_BLAST,
    patients,
    message,
    onClose,
  };
}
