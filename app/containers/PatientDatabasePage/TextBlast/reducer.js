/**
 * Created by mike on 10/31/16.
 */

import _ from 'lodash';

import {
  ADD_PATIENTS_TO_TEXT_BLAST,
  REMOVE_PATIENT_FROM_TEXT_BLAST,
  REMOVE_PATIENTS_FROM_TEXT_BLAST,
  FETCH_PATIENTS_SUCCESS,
  RESET_TEXT_BLAST,
  UPDATE_SELECT_ALL,
} from '../constants';

const initialState = {
  values: {
    queryParams: {},
    selectAll: true,
    uncheckedPatients: [],
    selectAllUncheckedManually: false,
  },
};

export default function TextBlastModal(state = initialState, action) {
  let patientsIdsToAdd = [];
  let patientsIdsToRemove = [];
  let patientToRemove = null;
  const checkedPatients = {};
  let patients = {};
  let allPatients = false;
  let selectAllUncheckedManually = false;
  let uncheckedPatients = [];
  switch (action.type) {
    case ADD_PATIENTS_TO_TEXT_BLAST:
      patientsIdsToAdd = _.map(action.patients, patient => (patient.id));
      uncheckedPatients = _.filter(state.values.uncheckedPatients, (id) => {
        if (_.indexOf(patientsIdsToAdd, id) === -1) {
          return true;
        }
        return false;
      });
      return {
        ...state,
        values: {
          ...state.values,
          patients: _.unionWith(state.values.patients, action.patients, (patient, patientToAdd) => (
            patient.id === patientToAdd.id
          )),
          uncheckedPatients,
          selectAll: uncheckedPatients.length === 0,
        },
      };
    case REMOVE_PATIENT_FROM_TEXT_BLAST:
      patientToRemove = _.find(state.values.patients, p => (p.id === action.patient[0].id));
      return {
        ...state,
        values: {
          ...state.values,
          patients: state.values.patients.filter(patient => (
            patient.id !== action.patient[0].id
          )),
          uncheckedPatients: _.uniq([...state.values.uncheckedPatients, action.patient[0].id]),
          selectAll: !patientToRemove,
        },
      };
    case REMOVE_PATIENTS_FROM_TEXT_BLAST:
      patientsIdsToRemove = _.map(action.patients, patient => (patient.id));
      return {
        ...state,
        values: {
          ...state.values,
          patients: [],
          uncheckedPatients: patientsIdsToRemove,
          'all-patients': false,
          selectAll: false,
          selectAllUncheckedManually: true,
        },
      };
    case RESET_TEXT_BLAST:
      return {
        ...state,
        values: {
          ...state.values,
          patients: [],
          uncheckedPatients: [],
          'all-patients': false,
          selectAll: true,
        },
      };
    case FETCH_PATIENTS_SUCCESS:
      allPatients = state.values['all-patients'];
      selectAllUncheckedManually = state.values.selectAllUncheckedManually;
      if (action.queryParams.filter.skip === 0) {
        allPatients = true;
        selectAllUncheckedManually = false;
      }
      patients = _.filter(action.payload, (patient) => {
        /* if (_.find(state.values.patients, p => p.id === patient.id)) {
          return true;
        }*/
        if (patient.unsubscribed) {
          uncheckedPatients.push(patient.id);
        }
        if (patient.unsubscribed || (action.queryParams.filter.skip !== 0 && _.indexOf(state.values.uncheckedPatients, patient.id) !== -1)) {
          return false;
        }
        /* if (_.indexOf(state.values.uncheckedPatients, patient.id) === -1) {
          return true;
        }*/
        return true;
      });

      _.forEach(patients, (patient) => {
        if (!patient.unsubscribed) {
          // if (state.values[`patient-${patient.id}`] === true) {
          //   checkedPatients[`patient-${patient.id}`] = true;
          // } else if (state.values[`patient-${patient.id}`] === false) {
          //   checkedPatients[`patient-${patient.id}`] = false;
          // } else {
          //   checkedPatients[`patient-${patient.id}`] = (state.values['all-patients'] === true) && true;
          // }
          checkedPatients[`patient-${patient.id}`] = true;
        }
      });

      /* if (patients.length === action.payload.length) {
        allPatients = true;
      }*/


      return {
        ...state,
        values: {
          ...state.values,
          patients,
          ...checkedPatients,
          'all-patients': allPatients,
          queryParams: action.queryParams,
          selectAllUncheckedManually,
          uncheckedPatients,
        },
      };
    case UPDATE_SELECT_ALL:
      return {
        ...state,
        values: {
          ...state.values,
          selectAll: action.selectAll,
        },
      };
    default:
      return state;
  }
}
