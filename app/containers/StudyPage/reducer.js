/*
 *
 * ProfilePage reducer
 *
 */

import {
  FETCH_CAMPAIGNS_SUCCESS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENT_DETAILS_SUCCESS,
  FETCH_PATIENT_CATEGORIES_SUCCESS,
  FETCH_SITE_SUCCESS,
  FETCH_STUDY_VIEWS_SUCCESS,
  FETCH_STUDY_PATIENT_REFERRALS_SUCCESS,
  FETCH_SOURCES_SUCCESS,
  FETCH_STUDY_SUCCESS,
  SET_CURRENT_PATIENT_ID,
  SET_CURRENT_PATIENT_CATEGORY_ID,
  UPDATE_PATIENT_SUCCESS,
} from './constants';
import _ from 'lodash';

const initialState = {
  stats: {}
};

function studyPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        campaigns: action.payload,
      };
    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        patientCategories: state.patientCategories.map(patientCategory => {
          const tempCategory = _.find(action.payload, category => {
            return category.id === patientCategory.id
          })
          if (tempCategory) {
            return tempCategory;
          }
          patientCategory.patients = [];
          return patientCategory;
        }),
        fetchingPatients: false,
      };
    case FETCH_PATIENT_DETAILS_SUCCESS:
    case UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        patientCategories: patientCategories(state.patientCategories, state.currentPatientCategoryId, action),
      };
    case FETCH_PATIENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        patientCategories: action.payload.map(patientCategory => {
          const patientCategoryTemp = Object.assign({}, patientCategory);
          patientCategoryTemp.patients = [];
          return patientCategoryTemp;
        }),
      };
    case FETCH_SITE_SUCCESS:
      return {
        ...state,
        site: action.payload,
      };
    case FETCH_SOURCES_SUCCESS:
      return {
        ...state,
        sources: action.payload,
      };
    case FETCH_STUDY_SUCCESS:
      return {
        ...state,
        study: action.payload,
        fetchingStudy: false,
      };
    case FETCH_STUDY_VIEWS_SUCCESS:
      return {
        ...state,
        stats: {
          ...state.stats,
          views: action.payload,
        },
      };
    case FETCH_STUDY_PATIENT_REFERRALS_SUCCESS:
      return {
        ...state,
        stats: {
          ...state.stats,
          referrals: action.payload,
        },
      };
    case SET_CURRENT_PATIENT_ID:
      return {
        ...state,
        currentPatientId: action.id,
      };
    case SET_CURRENT_PATIENT_CATEGORY_ID:
      return {
        ...state,
        currentPatientCategoryId: action.id,
      };
    default:
      return state;
  }
}

// additional reducer specifically for patient categories
function patientCategories(state, currentPatientCategoryId, action) {
  switch (action.type) {
    case FETCH_PATIENT_DETAILS_SUCCESS:
      return state.map(patientCategory => {
        if (patientCategory.id === currentPatientCategoryId) {
          return {
            ...patientCategory,
            patients: patientCategory.patients.map(patient => {
              if (patient.id == action.currentPatientId) {
                return {
                  ...patient,
                  ...action.payload,
                };
              } else {
                return patient;
              }
            })
          };
        } else {
          return patientCategory;
        }
      });
    case UPDATE_PATIENT_SUCCESS:
      return state.map(patientCategory => {
        if (patientCategory.id === currentPatientCategoryId) {
          return {
            ...patientCategory,
            patients: patientCategory.patients.map(patient => {
              if (patient.id == action.currentPatientId) {
                return {
                  ...patient,
                  ...action.payload,
                };
              } else {
                return patient;
              }
            })
          };
        } else {
          return patientCategory;
        }
      });
    default:
      return state;
  }
}

export default studyPageReducer;
