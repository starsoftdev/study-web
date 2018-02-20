/*
 *
 * Patient Database page actions
 *
 */
import _ from 'lodash';
import {
  ADD_PATIENT_INDICATION,
  REMOVE_PATIENT_INDICATION,
  UPDATE_PATIENT_INDICATION,
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
  FETCH_PATIENT_CATEGORIES,
  FETCH_PATIENT_CATEGORIES_SUCCESS,
  FETCH_PATIENT_CATEGORIES_ERROR,
  FETCH_PATIENT,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_ERROR,
  FETCH_FILTERED_PROTOCOLS,
  FETCH_FILTERED_PROTOCOLS_SUCCESS,
  FETCH_FILTERED_PROTOCOLS_ERROR,
  CLEAR_SELECTED_PATIENT,
  SAVE_PATIENT,
  SAVE_PATIENT_SUCCESS,
  SAVE_PATIENT_ERROR,
  INIT_CHAT,
  DISABLE_CHAT,
  ADD_PATIENTS_TO_TEXT_BLAST,
  REMOVE_PATIENT_FROM_TEXT_BLAST,
  REMOVE_PATIENTS_FROM_TEXT_BLAST,
  RESET_TEXT_BLAST,
  SUBMIT_TEXT_BLAST,
  SET_ACTIVE_SORT,
  DOWNLOAD_COMPLETE,
  IMPORT_PATIENTS,
  SUBMIT_ADD_PATIENT,
  SUBMIT_ADD_PATIENT_SUCCESS,
  SUBMIT_ADD_PATIENT_FAILURE,
  CLEAR_PATIENTS_LIST,
  CLEAR_IMPORT_FORM,
  UPDATE_SELECT_ALL,
  GET_TOTAL_PATIENTS_COUNT,
  GET_TOTAL_PATIENTS_COUNT_SUCCESS,
  GET_TOTAL_PATIENTS_COUNT_ERROR,
  SUBMIT_EMAIL_BLAST,
  ADD_PROTOCOL,
  ADD_PROTOCOL_SUCCESS,
  ADD_PROTOCOL_ERROR,
} from './constants';

export function fetchPatients(clientId, searchParams = {}, patients = {}, searchFilter = {}, isExport = false) {
  return {
    type: FETCH_PATIENTS,
    clientId,
    searchParams,
    patients,
    searchFilter,
    isExport,
  };
}

export function patientsFetched(searchParams, payload, patients, searchFilter, queryParams) {
  const result = payload.patients;
  const initResult = payload.patients;

  let resultArr = [];
  if (searchParams.skip === 0) {
    _.forEach(result, (item, index) => {
      result[index].orderNumber = index + 1;
    });
    resultArr = result;
  } else {
    const patientsCount = patients.length;
    _.forEach(result, (item, index) => {
      result[index].orderNumber = patientsCount + index + 1;
    });
    resultArr = patients.concat(result);
  }

  if (searchParams.sort && searchParams.sort === 'orderNumber') {
    const dir = ((searchParams.direction === 'down') ? 'desc' : 'asc');
    resultArr = _.orderBy(resultArr, [function (o) {
      return o.orderNumber;
    }], [dir]);
  }

  let hasMore = true;
  let page = (searchParams.skip / 50) + 1;
  if (initResult.length < searchParams.limit) {
    hasMore = false;
    page = 1;
  }

  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload: resultArr,
    hasMore,
    page,
    searchFilter,
    searchParams,
    result,
    queryParams,
    total: payload.total,
    totalUnsubscribed: payload.totalUnsubscribed,
  };
}

export function patientsFetchingError(payload) {
  return {
    type: FETCH_PATIENTS_ERROR,
    payload,
  };
}

export function getTotalPatientsCount(clientId, siteId) {
  return {
    type: GET_TOTAL_PATIENTS_COUNT,
    clientId,
    siteId,
  };
}

export function getTotalPatientsCountSuccess(payload) {
  return {
    type: GET_TOTAL_PATIENTS_COUNT_SUCCESS,
    total: payload.count,
    totalUnsubscribed: payload.countUnsubscribed,
  };
}

export function getTotalPatientsCountError(payload) {
  return {
    type: GET_TOTAL_PATIENTS_COUNT_ERROR,
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

export function addPatientIndication(patientId, indicationId, studyId) {
  return {
    type: ADD_PATIENT_INDICATION,
    patientId,
    indicationId,
    studyId,
  };
}

export function removePatientIndication(patientId, indicationId) {
  return {
    type: REMOVE_PATIENT_INDICATION,
    patientId,
    indicationId,
  };
}

export function updatePatientIndication(patientId, indicationId, studyId) {
  return {
    type: UPDATE_PATIENT_INDICATION,
    patientId,
    indicationId,
    studyId,
  };
}

export function savePatient(clientRoleId, id, data) {
  return {
    type: SAVE_PATIENT,
    clientRoleId,
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

export function resetTextBlast(patient) {
  return {
    type: RESET_TEXT_BLAST,
    patient,
  };
}

export function removePatientsFromTextBlast(patients) {
  return {
    type: REMOVE_PATIENTS_FROM_TEXT_BLAST,
    patients,
  };
}

export function submitTextBlast(formValues, clientRoleId, currentUser, onClose) {
  return {
    type: SUBMIT_TEXT_BLAST,
    formValues,
    clientRoleId,
    currentUser,
    onClose,
  };
}

export function setActiveSort(sort, direction) {
  return {
    type: SET_ACTIVE_SORT,
    sort,
    direction,
  };
}

export function importPatients(clientId, payload, onClose) {
  return {
    type: IMPORT_PATIENTS,
    clientId,
    payload,
    onClose,
  };
}

export function submitAddPatient(patient, onClose) {
  return {
    type: SUBMIT_ADD_PATIENT,
    patient,
    onClose,
  };
}

export function submitAddPatientSuccess(patients, fileName) {
  return {
    type: SUBMIT_ADD_PATIENT_SUCCESS,
    patients,
    fileName,
  };
}

export function submitAddPatientFailure() {
  return {
    type: SUBMIT_ADD_PATIENT_FAILURE,
  };
}

export function downloadComplete() {
  return {
    type: DOWNLOAD_COMPLETE,
  };
}

export function clearPatientsList() {
  return {
    type: CLEAR_PATIENTS_LIST,
  };
}

export function clearForm() {
  return {
    type: CLEAR_IMPORT_FORM,
  };
}

export function updateSelectAll(value) {
  return {
    type: UPDATE_SELECT_ALL,
    selectAll: value,
  };
}

export function submitEmailBlast(formValues, clientRoleId, currentUser, onClose) {
  return {
    type: SUBMIT_EMAIL_BLAST,
    formValues,
    clientRoleId,
    currentUser,
    onClose,
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
