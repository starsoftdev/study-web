/*
 *
 * ProfilePage reducer
 *
 */

import _ from 'lodash';
import {
  VENDOR_ADD_PATIENT_INDICATION_SUCCESS,
  VENDOR_ADD_PATIENT_NOTE_SUCCESS,
  VENDOR_CLEAR_FORM_UPLOAD,
  VENDOR_EXPORT_PATIENTS_SUCCESS,
  VENDOR_FETCHING_STUDY,
  VENDOR_FETCH_CAMPAIGNS_SUCCESS,
  VENDOR_FETCH_PATIENTS,
  VENDOR_FETCH_PATIENTS_SUCCESS,
  VENDOR_FETCH_PATIENTS_ERROR,
  VENDOR_FETCH_PATIENT_DETAILS_SUCCESS,
  VENDOR_FETCH_PATIENT_CATEGORIES,
  VENDOR_FETCH_PATIENT_CATEGORIES_SUCCESS,
  VENDOR_FETCH_PROTOCOL_SUCCESS,
  VENDOR_FETCH_SITE_SUCCESS,
  VENDOR_FETCH_STUDY_VIEWS_SUCCESS,
  VENDOR_FETCH_STUDY_CALLS_SUCCESS,
  VENDOR_FETCH_STUDY_STATS_SUCCESS,
  VENDOR_FETCH_STUDY_SUCCESS,
  VENDOR_REMOVE_PATIENT_INDICATION_SUCCESS,
  VENDOR_SET_STUDY_ID,
  VENDOR_SET_CURRENT_PATIENT_ID,
  VENDOR_SET_CURRENT_PATIENT_CATEGORY_ID,
  VENDOR_SET_OPEN_PATIENT_MODAL,
  VENDOR_SUBMIT_DELETE_NOTE_SUCCESS,
  VENDOR_SUBMIT_ADD_PATIENT_SUCCESS,
  VENDOR_SUBMIT_ADD_PATIENT_FAILURE,
  VENDOR_SUBMIT_PATIENT_IMPORT,
  VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_LOADING,
  VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_FAILED,
  VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_SUCCESS,
  VENDOR_UPDATE_PATIENT_SUCCESS,
  VENDOR_SWITCH_TO_NOTE_SECTION_DETAIL,
  VENDOR_SWITCH_TO_TEXT_SECTION_DETAIL,
  VENDOR_SWITCH_TO_EMAIL_SECTION_DETAIL,
  VENDOR_SWITCH_TO_OTHER_SECTION_DETAIL,
  VENDOR_SUBMIT_ADD_PATIENT,
  VENDOR_DELETE_PATIENT,
  VENDOR_DELETE_PATIENT_SUCCESS,
  VENDOR_DELETE_PATIENT_ERROR,
  VENDOR_SUBMIT_EMAIL,
  VENDOR_SUBMIT_EMAIL_SUCCESS,
  VENDOR_SUBMIT_EMAIL_ERROR,
  VENDOR_FETCH_EMAILS,
  VENDOR_FETCH_EMAILS_SUCCESS,
  VENDOR_FETCH_EMAILS_ERROR,
  VENDOR_SET_SELECTED_STUDY_SOURCES,
  VENDOR_PATIENT_CATEGORIES_TOTALS_FETCHED,
} from './constants';

import {
  VENDOR_FETCH_STUDY_SOURCES,
  VENDOR_FETCH_STUDY_SOURCES_SUCCESS,
  VENDOR_FETCH_STUDY_SOURCES_ERROR,
} from '../App/constants';

const initialState = {
  stats: {},
  patientCategoriesTotals: [],
  carousel: {
    note: true,
    text: false,
    email: false,
    other: false,
  },
  openPatientModal: false,
  addPatientStatus:{
    adding: false,
  },
  fetchingPatientsError: {},
  submittingEmail:false,
  deletePatientProcess: {
    isDeleting: false,
    error: null,
  },
  emails: {
    details: [],
    fetching: false,
    error: null,
  },
  studySources: {
    details: [],
    fetching: false,
    error: null,
  },
  selectedStudySources: [],
  paginationOptions: {
    hasMoreItems: true,
    page: 1,
  },
};

function studyPageReducer(state = initialState, action) {
  let hasMoreItems;

  switch (action.type) {
    case VENDOR_SET_SELECTED_STUDY_SOURCES:
      return {
        ...state,
        selectedStudySources: action.list,
      };
    case VENDOR_FETCH_STUDY_SOURCES:
      return {
        ...state,
        studySources: {
          details: state.studySources.details,
          fetching: true,
          error: null,
        },
      };

    case VENDOR_FETCH_STUDY_SOURCES_SUCCESS:
      return {
        ...state,
        studySources: {
          details: action.payload.map((item) => {
            return {
              source: { value: item.source_id, label: item.type },
              sourceName: item.sourceName,
              studySourceId: item.studySourceId,
              isMediaType: item.isMediaType,
            };
          }),
          fetching: false,
          error: null,
        },
      };

    case VENDOR_FETCH_STUDY_SOURCES_ERROR:
      return {
        ...state,
        studySources: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case VENDOR_FETCH_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        campaigns: action.payload,
      };
    case VENDOR_EXPORT_PATIENTS_SUCCESS:
      return {
        ...state,
      };
    case VENDOR_FETCHING_STUDY:
      return {
        ...state,
        fetchingStudy: true,
      };
    case VENDOR_FETCH_PATIENTS:
      return {
        ...state,
        fetchingPatients: true,
      };
    case VENDOR_FETCH_PATIENTS_SUCCESS:
      hasMoreItems = action.payload.length > 0;
      return {
        ...state,
        patientCategories: state.patientCategories.map(patientCategory => {
          const tempCategory = _.find(action.payload, category => (
            category.id === patientCategory.id
          ));
          let patients = [];
          // try to find the category in the payload
          // if it's not found, clear the patient list
          if (tempCategory) {
            // return the payload as the mapping
            if (action.skip !== 0) {
              patients = patientCategory.patients.concat(tempCategory.patients);
            } else {
              patients = tempCategory.patients;
            }
            return {
              ...patientCategory,
              patients,
            };
          }

          if (action.skip !== 0) {
            patients = patientCategory.patients;
          } else {
            patients = [];
          }

          return {
            ...patientCategory,
            patients,
          };
        }),
        fetchingPatients: false,
        paginationOptions: {
          hasMoreItems,
          page: action.page,
        },
      };
    case VENDOR_FETCH_PATIENTS_ERROR:
      return {
        ...state,
        fetchingPatientsError: action.payload,
        fetchingPatients: false,
      };
    case VENDOR_ADD_PATIENT_NOTE_SUCCESS:
    case VENDOR_ADD_PATIENT_INDICATION_SUCCESS:
    case VENDOR_REMOVE_PATIENT_INDICATION_SUCCESS:
    case VENDOR_SUBMIT_DELETE_NOTE_SUCCESS:
    case VENDOR_FETCH_PATIENT_DETAILS_SUCCESS:
    case VENDOR_UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        patientCategories: patientCategories(state.patientCategories, action.patientId, action),
      };
    case VENDOR_CLEAR_FORM_UPLOAD:
      return {
        ...state,
        fileUploaded:null,
      };
    case VENDOR_SUBMIT_PATIENT_IMPORT:
      return {
        ...state,
        fileUploaded: null,
        uploadStarted: true,
      };
    case VENDOR_SUBMIT_ADD_PATIENT:
      return {
        ...state,
        addPatientStatus: {
          adding: true,
        },
      };
    case VENDOR_SUBMIT_ADD_PATIENT_SUCCESS:
      return {
        ...state,
        uploadStarted: null,
        fileUploaded: action.fileName,
        addPatientStatus: {
          adding: false,
        },
        patientCategories: state.patientCategories.map(category => {
          if (category.name === 'New Patient') {
            if (!category.patients) {
              return {
                ...category,
                patients: [...action.patients],
              };
            } else if (Array.isArray(action.patients)) {
              return {
                ...category,
                patients: [
                  ...category.patients,
                  ...action.patients,
                ],
              };
            }
            return {
              ...category,
              patients: [
                ...category.patients,
                action.patients,
              ],
            };
          }
          return category;
        }),
      };
    case VENDOR_SUBMIT_EMAIL:
      return {
        ...state,
        submittingEmail: true,
      };
    case VENDOR_SUBMIT_EMAIL_SUCCESS:
      return {
        ...state,
        submittingEmail: false,
      };
    case VENDOR_SUBMIT_EMAIL_ERROR:
      return {
        ...state,
        submittingEmail: false,
      };
    case VENDOR_FETCH_EMAILS:
      return {
        ...state,
        emails: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case VENDOR_FETCH_EMAILS_SUCCESS:
      return {
        ...state,
        emails: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case VENDOR_FETCH_EMAILS_ERROR:
      return {
        ...state,
        emails: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case VENDOR_SUBMIT_ADD_PATIENT_FAILURE:
      return {
        ...state,
        uploadStarted: null,
        addPatientStatus: {
          adding: false,
        },
      };
    case VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_SUCCESS:
      return {
        ...state,
        patientBoardLoading: false,
        patientCategories: patientCategories(state.patientCategories, action.patientId, action),
      };
    case VENDOR_FETCH_PATIENT_CATEGORIES:
      return {
        ...state,
        fetchingPatients: true,
        fetchingPatientCategories: true,
      };
    case VENDOR_FETCH_PATIENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        patientCategories: action.payload.map(patientCategory => {
          const patientCategoryTemp = Object.assign({}, patientCategory);
          patientCategoryTemp.patients = [];
          return patientCategoryTemp;
        }),
        fetchingPatientCategories: false,
      };
    case VENDOR_FETCH_PROTOCOL_SUCCESS:
      return {
        ...state,
        protocol: action.payload,
      };
    case VENDOR_FETCH_SITE_SUCCESS:
      return {
        ...state,
        site: action.payload,
      };
    case VENDOR_FETCH_STUDY_SUCCESS:
      return {
        ...state,
        study: action.payload,
        fetchingStudy: false,
      };
    case VENDOR_FETCH_STUDY_VIEWS_SUCCESS:
      return {
        ...state,
        stats: {
          ...state.stats,
          views: action.payload,
        },
      };
    case VENDOR_FETCH_STUDY_CALLS_SUCCESS:
      return {
        ...state,
        stats: {
          ...state.stats,
          calls: action.payload.count,
          callsDuration: action.payload.totalDuration,
        },
      };
    case VENDOR_FETCH_STUDY_STATS_SUCCESS:
      return {
        ...state,
        stats: {
          ...state.stats,
          texts: action.payload.total,
          textsSent: action.payload.sent,
          textsReceived: action.payload.received,
          views: action.payload.views,
          calls: action.payload.countReceived,
          callsDuration: action.payload.totalDuration,
          totalReferrals: action.payload.totalReferrals,
          referrals: action.payload.totalReferrals,
        },
      };
    case VENDOR_PATIENT_CATEGORIES_TOTALS_FETCHED:
      return {
        ...state,
        patientCategoriesTotals: action.payload,
      };
    case VENDOR_SET_STUDY_ID:
      return {
        ...state,
        studyId: action.id,
      };
    case VENDOR_SET_CURRENT_PATIENT_ID:
      return {
        ...state,
        currentPatientId: action.id,
      };
    case VENDOR_SET_CURRENT_PATIENT_CATEGORY_ID:
      return {
        ...state,
        currentPatientCategoryId: action.id,
      };
    case VENDOR_SET_OPEN_PATIENT_MODAL:
      return {
        ...state,
        openPatientModal: action.show,
      };
    case VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_LOADING:
      return {
        ...state,
        patientBoardLoading: true,
      };
    case VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_FAILED:
      return {
        ...state,
        patientBoardLoading: false,
      };
    case VENDOR_SWITCH_TO_NOTE_SECTION_DETAIL:
      return {
        ...state,
        carousel: {
          note: true,
          text: false,
          email: false,
          other: false,
        },
      };
    case VENDOR_SWITCH_TO_TEXT_SECTION_DETAIL:
      return {
        ...state,
        carousel: {
          note: false,
          text: true,
          email: false,
          other: false,
        },
      };
    case VENDOR_SWITCH_TO_EMAIL_SECTION_DETAIL:
      return {
        ...state,
        carousel: {
          note: false,
          text: false,
          email: true,
          other: false,
        },
      };
    case VENDOR_SWITCH_TO_OTHER_SECTION_DETAIL:
      return {
        ...state,
        carousel: {
          note: false,
          text: false,
          email: false,
          other: true,
        },
      };
    case VENDOR_DELETE_PATIENT:
      return {
        ...state,
        deletePatientProcess: {
          isDeleting: true,
          error: null,
        },
      };
    case VENDOR_DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        patientCategories: state.patientCategories.map(category => {
          const foundPatientIndex = _.findIndex(category.patients, { id: action.payload });
          if (foundPatientIndex !== -1) {
            const patientsArr = _.cloneDeep(category.patients);
            patientsArr.splice(foundPatientIndex, 1);
            return {
              ...category,
              patients: patientsArr,
            };
          }
          return category;
        }),
        deletePatientProcess: {
          isDeleting: false,
          error: null,
        },
        openPatientModal: false,
      };
    case VENDOR_DELETE_PATIENT_ERROR:
      return {
        ...state,
        deletePatientProcess: {
          isDeleting: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

// additional reducer specifically for patient categories
function patientCategories(state, currentPatientId, action) {
  switch (action.type) {
    case VENDOR_ADD_PATIENT_NOTE_SUCCESS:
    case VENDOR_ADD_PATIENT_INDICATION_SUCCESS:
    case VENDOR_REMOVE_PATIENT_INDICATION_SUCCESS:
    case VENDOR_SUBMIT_DELETE_NOTE_SUCCESS:
      return state.map(patientCategory => {
        if (patientCategory.id === action.patientCategoryId) {
          return {
            ...patientCategory,
            patients: patients(patientCategory.patients, currentPatientId, action),
          };
        }
        return patientCategory;
      });
    case VENDOR_FETCH_PATIENT_DETAILS_SUCCESS:
    case VENDOR_UPDATE_PATIENT_SUCCESS:
      return state.map(patientCategory => {
        if (patientCategory.id === action.patientCategoryId) {
          return {
            ...patientCategory,
            patients: patientCategory.patients.map(patient => {
              if (patient.id === action.patientId) {
                return {
                  ...patient,
                  ...action.payload,
                };
              }
              return patient;
            }),
          };
        }
        return patientCategory;
      });
    case VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_SUCCESS: {
      if (action.fromCategoryId !== action.toCategoryId) {
        const fromPatientCategory = _.find(state, { id: action.fromCategoryId });
        const toPatientCategory = _.find(state, { id: action.toCategoryId });
        const patient = _.find(fromPatientCategory.patients, { id: currentPatientId });
        const transformedPatient = {
          ...patient,
          orderNumber: action.orderNumber,
          updatedAt: action.updatedAt,
        };
        return state.map(patientCategory => {
          if (patientCategory.id === fromPatientCategory.id) {
            return {
              ...patientCategory,
              patients: patientCategory.patients.filter(patient => (
                patient.id !== currentPatientId
              )),
            };
          }
          if (patientCategory.id === toPatientCategory.id) {
            return {
              ...patientCategory,
              patients: [
                transformedPatient,
                ...patientCategory.patients,
              ],
            };
          }
          return patientCategory;
        });
      }
      return state;
    }
    default:
      return state;
  }
}

function patients(state, currentPatientId, action) {
  switch (action.type) {
    case VENDOR_ADD_PATIENT_INDICATION_SUCCESS:
      return state.map(patient => {
        if (patient.id === currentPatientId) {
          return {
            ...patient,
            patientIndications: [
              ...patient.patientIndications,
              {
                // isOriginal: false,      // always false on manual addition of indication
                isOriginal: action.isOriginal,
                indication: action.indication,
                indication_id: action.indication.id,
                patient_id: action.patientId,
              },
            ],
          };
        }
        return patient;
      });
    case VENDOR_ADD_PATIENT_NOTE_SUCCESS:
      return state.map(patient => {
        if (patient.id === currentPatientId) {
          return {
            ...patient,
            notes: [
              ...patient.notes,
              {
                ...action.payload,
                user: action.currentUser.isProxy ? { ...action.currentUser, firstName: 'StudyKIK', lastName: '' } : action.currentUser,
              },
            ],
          };
        }
        return patient;
      });
    case VENDOR_REMOVE_PATIENT_INDICATION_SUCCESS:
      return state.map(patient => {
        if (patient.id === currentPatientId) {
          return {
            ...patient,
            patientIndications: patient.patientIndications.filter(pi => (
              pi.indication.id !== action.indicationId
            )),
          };
        }
        return patient;
      });
    case VENDOR_SUBMIT_DELETE_NOTE_SUCCESS:
      return state.map(patient => {
        if (patient.id === currentPatientId) {
          return {
            ...patient,
            notes: patient.notes.filter(note => note.id !== action.noteId),
          };
        }
        return patient;
      });
    default:
      return state;
  }
}

export default studyPageReducer;
