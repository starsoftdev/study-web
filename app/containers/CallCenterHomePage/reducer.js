import {
  CLOSE_PATIENTS_LIST_MODAL,
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
  FETCH_SCHEDULES,
  FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_ERROR,
  SEARCH_FOR_PATIENTS,
  SEARCH_FOR_PATIENTS_SUCCESS,
  SEARCH_FOR_PATIENTS_ERROR,
} from './constants';

const initialState = {
  fetchedPatients: {
    details: [],
    fetching: false,
    error: null,
  },
  schedules: {
    isFetching: false,
    isSubmitting: false,
    isDeleting: false,
    data: [],
    error: null,
  },
  patients: {
    isFetching: false,
    data: [],
  },
  showPatientsListModal: false,
};

export default function callCenterHomePageReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_PATIENTS_LIST_MODAL:
      return {
        ...state,
        showPatientsListModal: false,
      };
    case FETCH_PATIENTS:
      return {
        ...state,
        fetchedPatients: {
          details: state.fetchedPatients.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        fetchedPatients: {
          details: action.response,
          fetching: false,
          error: null,
        },
      };
    case FETCH_PATIENTS_ERROR:
      return {
        ...state,
        fetchedPatients: {
          details: [],
          fetching: false,
          error: action.response,
        },
      };
    case FETCH_SCHEDULES:
      return {
        ...state,
        schedules: {
          ...state.schedules,
          isFetching: true,
        },
      };
    case FETCH_SCHEDULES_SUCCESS:
      return {
        ...state,
        schedules: {
          ...state.schedules,
          isFetching: false,
          data: action.response,
        },
      };
    case FETCH_SCHEDULES_ERROR:
      return {
        ...state,
        schedules: {
          ...state.schedules,
          isFetching: false,
          error: action.response,
        },
      };
    case SEARCH_FOR_PATIENTS:
      return {
        ...state,
        patients: {
          isFetching: true,
          data: [],
        },
        showPatientsListModal: true,
      };
    case SEARCH_FOR_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: {
          isFetching: false,
          data: action.response,
        },
      };
    case SEARCH_FOR_PATIENTS_ERROR:
      return {
        ...state,
        patients: {
          isFetching: false,
          data: [],
        },
        showPatientsListModal: false,
      };
    default:
      return state;
  }
}
