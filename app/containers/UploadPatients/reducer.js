import {
  EXPORT_PATIENTS,
  EXPORT_PATIENTS_SUCCESS,
  EXPORT_PATIENTS_ERROR,
  ADD_PROTOCOL,
  ADD_PROTOCOL_SUCCESS,
  ADD_PROTOCOL_ERROR,
} from './constants';

const initialState = {
  exportPatientsStatus:{
    exporting: false,
  },
  addProtocolProcess:{
    details: [],
    fetching: false,
    error: null,
  },
};

export default function uploadPatientsPageReducer(state = initialState, action) {
  switch (action.type) {
    case EXPORT_PATIENTS:
      return {
        ...state,
        exportPatientsStatus:{
          exporting: true,
        },
      };
    case EXPORT_PATIENTS_SUCCESS:
      return {
        ...state,
        exportPatientsStatus:{
          exporting: false,
        },
      };
    case EXPORT_PATIENTS_ERROR:
      return {
        ...state,
        exportPatientsStatus:{
          exporting: false,
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
