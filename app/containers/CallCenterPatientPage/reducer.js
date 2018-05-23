import {
  FETCH_PATIENT,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_ERROR,
} from './constants';

const initialState = {
  selectedPatient: {
    details: null,
    fetching: false,
    error: null,
  },
};

export default function callCenterPatientPageReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
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
    default:
      return state;
  }
}
