import {
  EXPORT_PATIENTS,
  EXPORT_PATIENTS_SUCCESS,
  EXPORT_PATIENTS_ERROR,
  ADD_PROTOCOL,
  ADD_PROTOCOL_SUCCESS,
  ADD_PROTOCOL_ERROR,
  FETCH_HISTORY,
  FETCH_HISTORY_SUCCESS,
  FETCH_HISTORY_ERROR,
  REVERT_BULK_UPLOAD,
  REVERT_BULK_UPLOAD_SUCCESS,
  REVERT_BULK_UPLOAD_ERROR,
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
  revertBulkUploadProcess:{
    processing: false,
    error: null,
  },
  uploadHistory:{
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
    case FETCH_HISTORY:
      return {
        ...state,
        uploadHistory:{
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        uploadHistory:{
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_HISTORY_ERROR:
      return {
        ...state,
        uploadHistory:{
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case REVERT_BULK_UPLOAD:
      return {
        ...state,
        revertBulkUploadProcess:{
          processing: true,
          error: null,
        },
      };
    case REVERT_BULK_UPLOAD_SUCCESS:
      return {
        ...state,
        revertBulkUploadProcess:{
          processing: false,
          error: null,
        },
      };
    case REVERT_BULK_UPLOAD_ERROR:
      return {
        ...state,
        revertBulkUploadProcess:{
          processing: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
