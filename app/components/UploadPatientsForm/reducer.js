import {
  FETCH_FILTERED_PROTOCOLS,
  FETCH_FILTERED_PROTOCOLS_SUCCESS,
  FETCH_FILTERED_PROTOCOLS_ERROR,
  EMPTY_ROW_REQUIRED_ERROR,
} from '../../containers/UploadPatients/constants';

const initialState = {
  protocols: {
    details: [],
    fetching: false,
  },
  emptyRowRequiredError: {
    hasEmpty: false,
  },
};

export default function addPatientReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FILTERED_PROTOCOLS:
      return {
        ...state,
        protocols: {
          ...state.protocols,
          fetching: true,
        },
      };
    case FETCH_FILTERED_PROTOCOLS_SUCCESS:
      return {
        ...state,
        protocols: {
          details: action.payload,
          fetching: false,
        },
      };
    case FETCH_FILTERED_PROTOCOLS_ERROR:
      return {
        ...state,
        protocols: {
          details: [],
          fetching: false,
        },
      };
    case EMPTY_ROW_REQUIRED_ERROR:
      return {
        ...state,
        emptyRowRequiredError: {
          hasEmpty: action.hasEmpty,
        },
      };
    default:
      return state;
  }
}
