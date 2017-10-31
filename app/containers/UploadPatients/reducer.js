import {
  EXPORT_PATIENTS,
  EXPORT_PATIENTS_SUCCESS,
  EXPORT_PATIENTS_ERROR,
} from './constants';

const initialState = {
  exportPatientsStatus:{
    exporting: false,
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
    default:
      return state;
  }
}
