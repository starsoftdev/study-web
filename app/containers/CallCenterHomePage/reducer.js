import {
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
} from './constants';

const initialState = {
  fetchedPatients: {
    details: [],
    fetching: false,
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
    default:
      return state;
  }
}
