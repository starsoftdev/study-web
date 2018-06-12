import update from 'react-addons-update';

import {
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
  FETCH_SCHEDULES,
  FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_ERROR,
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
};

export default function callCenterHomePageReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
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
          details: payload,
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
          error: payload,
        },
      };
    case FETCH_SCHEDULES:
      return update(state, {
        schedules: {
          isFetching: { $set: true },
        },
      });
    case FETCH_SCHEDULES_SUCCESS:
      return update(state, {
        schedules: {
          isFetching: { $set: false },
          data: { $set: payload },
        },
      });
    case FETCH_SCHEDULES_ERROR:
      return update(state, {
        schedules: {
          isFetching: { $set: false },
          error: { $set: payload },
        },
      });
    default:
      return state;
  }
}
