import {
  EDIT_PATIENT_SITE,
} from '../constants';

export default function editPatientReducer(state = {}, action) {
  switch (action.type) {
    case EDIT_PATIENT_SITE:
      return {
        ...state,
        values: {
          ...state.values,
          site: action.site,
        },
      };
    default:
      return state;
  }
}
