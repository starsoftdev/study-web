/* eslint-disable comma-dangle, no-case-declarations */
import { concat, cloneDeep } from 'lodash';
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

const initialState = {
  sites: {
    details: [],
    fetching: false,
    error: null,
  },
  studies: {
    details: [],
    fetching: false,
    error: null,
    total: null,
    active: null,
    inactive: null,
  },
  patientSignUps: {
    today: 0,
    yesterday: 0,
    total: 0,
  },
  patientMessagesCount: {
    unreadTexts: 0,
    emailsSent: 0,
    textTotal: 0,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
    hasMoreItems: true,
    page: 1,
  },
  queryParams: {
    filter: false,
    name: null,
    siteId: null,
    status: null,
    hasMoreItems: true,
    limit: 50,
    skip: 0,
  },
};

export default function vendorHomeReducer(state = initialState, action) {
  let queryParams;
  let studiesCollection = [];

  switch (action.type) {
    case FETCH_VENDOR_SITES:
      return {
        ...state,
        sites: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_VENDOR_SITES_SUCCESS:
      return {
        ...state,
        sites: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_VENDOR_SITES_ERROR:
      return {
        ...state,
        sites: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };

    case FETCH_PATIENT_SIGN_UPS:
      return {
        ...state,
        patientSignUps: {
          today: 0,
          yesterday: 0,
          total: 0,
        },
      };

    case FETCH_PATIENT_SIGN_UPS_SUCCESS:
      return {
        ...state,
        patientSignUps: {
          today: action.payload.today,
          yesterday: action.payload.yesterday,
          total: action.payload.total,
        },
      };

    case FETCH_PATIENT_SIGN_UPS_ERROR:
      return {
        ...state,
        patientSignUps: {
          today: 0,
          yesterday: 0,
          total: 0,
        },
      };

    case FETCH_PATIENT_MESSAGES_COUNT:
      return {
        ...state,
        patientMessagesCount: {
          unreadTexts: 0,
          emailsSent: 0,
          textTotal: 0,
        },
      };

    case FETCH_PATIENT_MESSAGES_COUNT_SUCCESS:
      return {
        ...state,
        patientMessagesCount: {
          unreadTexts: action.payload.unreadTexts,
          emailsSent: action.payload.emailsSent,
          textTotal: action.payload.textTotal,
        },
      };

    case FETCH_PATIENT_MESSAGES_COUNT_ERROR:
      return {
        ...state,
        patientMessagesCount: {
          unreadTexts: 0,
          emailsSent: 0,
          textTotal: 0,
        },
      };

    case SET_ACTIVE_SORT:
      return {
        ...state,
        paginationOptions: {
          activeSort: action.sort,
          activeDirection: action.direction,
          hasMoreItems: state.paginationOptions.hasMoreItems,
          page: state.paginationOptions.page,
        },
      };
    case SORT_SUCCESS:
      return {
        ...state,
        studies: {
          details: action.payload,
          fetching: false,
          error: null,
          total: state.studies.total || 0,
          active: state.studies.active || 0,
          inactive: state.studies.inactive || 0,
        },
      };

    case FETCH_STUDIES:
      queryParams = state.queryParams;
      return {
        ...state,
        studies: {
          details: cloneDeep(state.studies.details),
          total: state.studies.total || 0,
          active: state.studies.active || 0,
          inactive: state.studies.inactive || 0,
          fetching: true,
          error: null,
        },
      };

    case FETCH_STUDIES_SUCCESS:
      queryParams = state.queryParams;
      studiesCollection = (queryParams.skip) ? concat(state.studies.details, action.payload.studies) : action.payload.studies;

      return {
        ...state,
        studies: {
          details: studiesCollection,
          total: action.payload.total,
          active: action.payload.active,
          inactive: action.payload.inactive,
          fetching: false,
          error: null,
        },
        queryParams: {
          ...queryParams,
          skip: (queryParams.hasMoreItems) ? queryParams.skip + queryParams.limit : queryParams.skip,
          hasMoreItems: action.payload.hasMoreItems,
        },
      };
    case FETCH_STUDIES_ERROR:
      return {
        ...state,
        studies: {
          details: [],
          total: null,
          active: null,
          inactive: null,
          fetching: false,
          error: action.payload,
        },
        queryParams: {
          filter: false,
          name: null,
          siteId: null,
          status: null,
          hasMoreItems: true,
          limit: 15,
          skip: 0,
        },
      };
    default:
      return state;
  }
}
