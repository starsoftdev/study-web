import { map, cloneDeep, findIndex } from 'lodash';

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
  SET_ACTIVE_SORT,
  IMPORT_PATIENTS,
  SUBMIT_ADD_PATIENT,
  SUBMIT_ADD_PATIENT_FAILURE,
  SUBMIT_ADD_PATIENT_SUCCESS,
  DOWNLOAD_COMPLETE,

  CLEAR_PATIENTS_LIST,
  CLEAR_IMPORT_FORM,

  GET_TOTAL_PATIENTS_COUNT,
  GET_TOTAL_PATIENTS_COUNT_ERROR,
  GET_TOTAL_PATIENTS_COUNT_SUCCESS,

  ADD_PROTOCOL,
  ADD_PROTOCOL_SUCCESS,
  ADD_PROTOCOL_ERROR,
} from './constants';

import {
  CLEAR_STUDY_SOURCES,
  FETCH_STUDY_SOURCES,
  FETCH_STUDY_SOURCES_SUCCESS,
  FETCH_STUDY_SOURCES_ERROR,
} from '../App/constants';

const initialState = {
  totalPatients: 0,
  patients: {
    details: [],
    total: null,
    totalUnsubscribed: null,
    fetching: false,
    error: null,
  },
  patientCategories: {
    details: [],
    fetching: false,
    error: null,
  },
  selectedPatient: {
    details: null,
    fetching: false,
    error: null,
  },
  savedPatient: {
    details: null,
    saving: false,
    error: null,
  },
  chat: {
    details: null,
    active: false,
    error: null,
  },
  paginationOptions: {
    hasMoreItems: true,
    page: 1,
    activeSort: null,
    activeDirection: null,
    prevSearchFilter: {},
  },
  importPatientsStatus: {
    uploadStart: false,
    fileUploaded: null,
  },
  addPatientStatus:{
    adding: false,
  },
  addProtocolProcess:{
    details: [],
    fetching: false,
    error: null,
  },
  studySources: {
    details: [],
    fetching: false,
    error: null,
  },
};

export default function patientDatabasePageReducer(state = initialState, action) {
  const { payload, total, totalUnsubscribed } = action;
  const patientsCollection = map(state.patients.details, cloneDeep);
  let foundIndex = -1;
  let totalAfterSave = 0;
  let totalUnsubscibedAfterSave = 0;
  let totalPatients = 0;

  switch (action.type) {
    case CLEAR_STUDY_SOURCES:
      return {
        ...state,
        studySources: {
          details: [],
          fetching: false,
          error: null,
        },
      };
    case FETCH_STUDY_SOURCES:
      return {
        ...state,
        studySources: {
          details: state.studySources.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_STUDY_SOURCES_SUCCESS:
      return {
        ...state,
        studySources: {
          details: action.payload.map((item) => {
            return {
              source: { value: item.source_id, label: item.type },
              sourceName: item.sourceName,
              studySourceId: item.studySourceId,
              isMediaType: item.isMediaType,
            };
          }),
          fetching: false,
          error: null,
        },
      };

    case FETCH_STUDY_SOURCES_ERROR:
      return {
        ...state,
        studySources: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case CLEAR_IMPORT_FORM:
      return {
        ...state,
        importPatientsStatus: {
          uploadStart: false,
          fileUploaded: null,
        },
      };
    case IMPORT_PATIENTS:
      return {
        ...state,
        importPatientsStatus: {
          uploadStart: true,
          fileUploaded: null,
        },
      };
    case SUBMIT_ADD_PATIENT:
      return {
        ...state,
        addPatientStatus: {
          adding: true,
        },
      };
    case SUBMIT_ADD_PATIENT_SUCCESS:
      return {
        ...state,
        importPatientsStatus: {
          uploadStart: false,
          fileUploaded: action.fileName,
        },
        addPatientStatus: {
          adding: false,
        },
      };
    case SUBMIT_ADD_PATIENT_FAILURE:
      return {
        ...state,
        importPatientsStatus: {
          uploadStart: false,
        },
        addPatientStatus:{
          adding: false,
        },
      };
    case DOWNLOAD_COMPLETE:
      return {
        ...state,
        patients: {
          details: state.patients.details,
          total: state.patients.total,
          totalUnsubscribed: state.patients.totalUnsubscribed,
          fetching: false,
          error: null,
        },
      };
    case FETCH_PATIENTS:
      return {
        ...state,
        patients: {
          details: state.patients.details,
          total: state.patients.total,
          totalUnsubscribed: state.patients.totalUnsubscribed,
          fetching: !action.isExport,
          error: null,
        },
        paginationOptions: state.paginationOptions,
      };
    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: {
          details: payload,
          total,
          totalUnsubscribed,
          fetching: false,
          error: null,
        },
        paginationOptions: {
          hasMoreItems: action.hasMore,
          page: action.page,
          activeSort: state.paginationOptions.activeSort,
          activeDirection: state.paginationOptions.activeDirection,
          prevSearchFilter: action.searchFilter,
        },
      };
    case FETCH_PATIENTS_ERROR:
      return {
        ...state,
        patients: {
          details: [],
          total: null,
          totalUnsubscribed: null,
          fetching: false,
          error: payload,
        },
      };
    case GET_TOTAL_PATIENTS_COUNT:
      return {
        ...state,
        totalPatients: 0,
      };
    case GET_TOTAL_PATIENTS_COUNT_SUCCESS:
      return {
        ...state,
        totalPatients: total,
        patients: {
          ...state.patients,
          totalUnsubscribed: action.totalUnsubscribed,
        },
      };
    case GET_TOTAL_PATIENTS_COUNT_ERROR:
      return {
        ...state,
        totalPatients: 0,
      };
    case CLEAR_PATIENTS_LIST:
      return {
        ...state,
        patients: {
          details: [],
          total: null,
          totalUnsubscribed: null,
          fetching: false,
          error: null,
        },
        paginationOptions: {
          hasMoreItems: true,
          page: 1,
          activeSort: state.paginationOptions.activeSort,
          activeDirection: state.paginationOptions.activeDirection,
          prevSearchFilter: {},
        },
      };
    case FETCH_PATIENT_CATEGORIES:
      return {
        ...state,
        patientCategories: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_PATIENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        patientCategories: {
          details: payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_PATIENT_CATEGORIES_ERROR:
      return {
        ...state,
        patientCategories: {
          details: [],
          fetching: false,
          error: payload,
        },
      };
    case FETCH_PATIENT:
      return {
        ...state,
        selectedPatient: {
          details: null,
          id: action.id,
          fetching: true,
          error: null,
        },
      };
    case FETCH_PATIENT_SUCCESS:
      return {
        ...state,
        selectedPatient: {
          details: payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_PATIENT_ERROR:
      return {
        ...state,
        selectedPatient: {
          details: null,
          fetching: false,
          error: payload,
        },
      };
    case CLEAR_SELECTED_PATIENT:
      return {
        ...state,
        selectedPatient: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case SAVE_PATIENT:
      return {
        ...state,
        savedPatient: {
          details: null,
          saving: true,
          error: null,
        },
      };
    case SAVE_PATIENT_SUCCESS:
      foundIndex = findIndex(patientsCollection, { id: payload.id });
      totalAfterSave = state.patients.total;
      totalUnsubscibedAfterSave = state.patients.totalUnsubscribed;
      totalPatients = state.totalPatients;
      if (foundIndex > -1) {
        if (payload.unsubscribed === false && patientsCollection[foundIndex].unsubscribed === true) {
          totalUnsubscibedAfterSave--;
          totalAfterSave++;
          totalPatients++;
        }
        if (payload.unsubscribed === true && patientsCollection[foundIndex].unsubscribed === false) {
          totalUnsubscibedAfterSave++;
          totalAfterSave--;
          totalPatients--;
        }

        patientsCollection[foundIndex] = payload;
      }

      return {
        ...state,
        totalPatients,
        savedPatient: {
          details: payload,
          saving: false,
          error: null,
        },
        patients: {
          details: patientsCollection,
          total: totalAfterSave,
          totalUnsubscribed: totalUnsubscibedAfterSave,
          fetching: false,
          error: null,
        },
        selectedPatient: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case SAVE_PATIENT_ERROR:
      return {
        ...state,
        savedPatient: {
          details: null,
          saving: false,
          error: payload,
        },
        selectedPatient: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case INIT_CHAT:
      return {
        ...state,
        chat: {
          details: payload,
          active: true,
          error: null,
        },
      };
    case DISABLE_CHAT:
      return {
        ...state,
        chat: {
          details: null,
          active: false,
          error: null,
        },
      };
    case SET_ACTIVE_SORT:
      return {
        ...state,
        paginationOptions: {
          hasMoreItems: true,
          page: 1,
          activeSort: action.sort,
          activeDirection: action.direction,
          prevSearchFilter: state.paginationOptions.prevSearchFilter,
        },
      };
    case ADD_PROTOCOL:
      return {
        ...state,
        addProtocolProcess:{
          details: [],
          fetching: true,
          error: null,
        },
      };
    case ADD_PROTOCOL_SUCCESS:
      return {
        ...state,
        addProtocolProcess:{
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case ADD_PROTOCOL_ERROR:
      return {
        ...state,
        addProtocolProcess:{
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
