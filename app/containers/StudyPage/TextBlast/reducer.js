/**
 * Created by mike on 10/31/16.
 */

import {
  FIND_PATIENTS_TEXT_BLAST_SUCCESS,
  FILTER_PATIENTS_TEXT_BLAST,
  ADD_PATIENTS_TO_TEXT_BLAST,
  REMOVE_PATIENT_FROM_TEXT_BLAST,
  REMOVE_PATIENTS_FROM_TEXT_BLAST,
} from '../constants';
import _ from 'lodash';

export default function TextBlastModal(state, action) {
  switch (action.type) {
    case FIND_PATIENTS_TEXT_BLAST_SUCCESS:
      return {
        ...state,
        values: {
          ...state.values,
          filteredPatientSearchValues: action.payload,
          patientSearchValues: action.payload,
        },
      };
    case FILTER_PATIENTS_TEXT_BLAST: {
      // separate the first and last name apart
      let search = _.trim(action.text);
      // const firstNameEndIndex = search.indexOf(' ');
      // let firstName = search;
      // let lastName;
      // if (firstNameEndIndex !== -1) {
      //   firstName = search.slice(0, firstNameEndIndex);
      //   lastName = search.slice(firstNameEndIndex + 1);
      // }
      if (search) {
        search = search.toUpperCase();
      }
      console.log('Search', search);
      return {
        ...state,
        values: {
          ...state.values,
          filteredPatientSearchValues: state.values.patientSearchValues.filter(patient => {
            let firstname = patient.firstName;
            let lastname = patient.lastName;
            console.log('Firstname', firstname);
            console.log('Lastname', lastname);
            if (firstname) {
              firstname = firstname.toUpperCase();
            }
            if (lastname) {
              lastname = lastname.toUpperCase();
            }
            return _.includes(firstname, search) || (_.includes(lastname, search));
          }),
        },
      };
    }
    case ADD_PATIENTS_TO_TEXT_BLAST:
      return {
        ...state,
        values: {
          ...state.values,
          // patients: _.unionWith(state.values.patients, action.patients, (patient, patientToAdd) => (
          //   patient.id === patientToAdd.id
          // )),
          patients: action.patients,
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
