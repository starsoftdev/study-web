/**
 * Created by mike on 10/31/16.
 */

import {
  ADD_PATIENTS_TO_TEXT_BLAST,
  REMOVE_PATIENT_FROM_TEXT_BLAST,
  REMOVE_PATIENTS_FROM_TEXT_BLAST,
} from '../constants';
import _ from 'lodash';

export default function TextBlastModal(state, action) {
  switch (action.type) {
    case ADD_PATIENTS_TO_TEXT_BLAST:
      return {
        ...state,
        values: {
          ...state.values,
          patients: _.unionWith(state.values.patients, action.patients, (patient, patientToAdd) => (
            patient.id === patientToAdd.id
          )),
        },
      };
    case REMOVE_PATIENT_FROM_TEXT_BLAST:
      return {
        ...state,
        values: {
          ...state.values,
          patients: state.values.patients.filter(patient => (
            patient.id !== action.patient.id
          )),
        },
      };
    case REMOVE_PATIENTS_FROM_TEXT_BLAST:
      return {
        ...state,
        values: {
          ...state.values,
          patients: [],
        },
      };
    default:
      return state;
  }
}
