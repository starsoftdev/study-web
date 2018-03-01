/*
 *
 * ProfilePage reducer
 *
 */

import _ from 'lodash';
import {
  ADD_PATIENT_INDICATION_SUCCESS,
  ADD_PATIENT_NOTE_SUCCESS,
  CLEAR_FORM_UPLOAD,
  EXPORT_PATIENTS_SUCCESS,
  FETCHING_STUDY,
  FETCH_CAMPAIGNS_SUCCESS,
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
  FETCH_PATIENT_DETAILS_SUCCESS,
  FETCH_PATIENT_CATEGORIES,
  FETCH_PATIENT_CATEGORIES_SUCCESS,
  FETCH_PROTOCOL_SUCCESS,
  FETCH_SITE_SUCCESS,
  FETCH_STUDY_VIEWS_SUCCESS,
  FETCH_STUDY_CALLS_SUCCESS,
  FETCH_STUDY_STATS_SUCCESS,
  FETCH_SOURCES_SUCCESS,
  FETCH_STUDY_SUCCESS,
  REMOVE_PATIENT_INDICATION_SUCCESS,
  SHOW_SCHEDULED_MODAL,
  HIDE_SCHEDULED_MODAL,
  SET_STUDY_ID,
  SET_CURRENT_PATIENT_ID,
  SET_CURRENT_PATIENT_CATEGORY_ID,
  SET_OPEN_PATIENT_MODAL,
  SUBMIT_DELETE_NOTE_SUCCESS,
  SUBMIT_ADD_PATIENT_SUCCESS,
  SUBMIT_ADD_PATIENT_FAILURE,
  SUBMIT_PATIENT_IMPORT,
  MOVE_PATIENT_BETWEEN_CATEGORIES_LOADING,
  MOVE_PATIENT_BETWEEN_CATEGORIES_FAILED,
  MOVE_PATIENT_BETWEEN_CATEGORIES_SUCCESS,
  UPDATE_PATIENT_SUCCESS,
  SWITCH_TO_NOTE_SECTION_DETAIL,
  SWITCH_TO_TEXT_SECTION_DETAIL,
  SWITCH_TO_EMAIL_SECTION_DETAIL,
  SWITCH_TO_OTHER_SECTION_DETAIL,
  SUBMIT_ADD_PATIENT,
  CHANGE_SCHEDULED_DATE,
  SUBMIT_SCHEDULE,
  SUBMIT_SCHEDULE_SUCCEEDED,
  SUBMIT_SCHEDULE_FAILED,
  SET_SCHEDULED_FORM_INITIALIZED,
  DELETE_PATIENT,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_ERROR,
  SUBMIT_EMAIL,
  SUBMIT_EMAIL_SUCCESS,
  SUBMIT_EMAIL_ERROR,
  FETCH_EMAILS,
  FETCH_EMAILS_SUCCESS,
  FETCH_EMAILS_ERROR,
  PATIENT_CATEGORIES_TOTALS_FETCHED,
} from './constants';

const initialState = {
  stats: {},
  patientCategoriesTotals: [],
  carousel: {
    note: true,
    text: false,
    email: false,
    other: false,
  },
  openScheduledModal: false,
  openPatientModal: false,
  addPatientStatus:{
    adding: false,
  },
  fetchingPatientsError: {},
  submittingSchedule:false,
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
  paginationOptions: {
    hasMoreItems: true,
    page: 1,
  },
};

function studyPageReducer(state = initialState, action) {
  let hasMoreItems;

  switch (action.type) {
    case FETCH_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        campaigns: action.payload,
      };
    case EXPORT_PATIENTS_SUCCESS:
      return {
        ...state,
      };
    case FETCHING_STUDY:
      return {
        ...state,
        fetchingStudy: true,
      };
    case FETCH_PATIENTS:
      return {
        ...state,
        fetchingPatients: true,
      };
    case FETCH_PATIENTS_SUCCESS:
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
    case FETCH_PATIENTS_ERROR:
      return {
        ...state,
        fetchingPatientsError: action.payload,
        fetchingPatients: false,
      };
    case ADD_PATIENT_NOTE_SUCCESS:
    case ADD_PATIENT_INDICATION_SUCCESS:
    case REMOVE_PATIENT_INDICATION_SUCCESS:
    case SUBMIT_DELETE_NOTE_SUCCESS:
    case FETCH_PATIENT_DETAILS_SUCCESS:
    case UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        patientCategories: patientCategories(state.patientCategories, action.patientId, action),
      };
    case CLEAR_FORM_UPLOAD:
      return {
        ...state,
        fileUploaded:null,
      };
    case SUBMIT_PATIENT_IMPORT:
      return {
        ...state,
        fileUploaded: null,
        uploadStarted: true,
      };
    case SUBMIT_ADD_PATIENT:
      return {
        ...state,
        addPatientStatus: {
          adding: true,
        },
      };
    case SUBMIT_ADD_PATIENT_SUCCESS:
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
    case SUBMIT_EMAIL:
      return {
        ...state,
        submittingEmail: true,
      };
    case SUBMIT_EMAIL_SUCCESS:
      return {
        ...state,
        submittingEmail: false,
      };
    case SUBMIT_EMAIL_ERROR:
      return {
        ...state,
        submittingEmail: false,
      };
    case FETCH_EMAILS:
      return {
        ...state,
        emails: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_EMAILS_SUCCESS:
      return {
        ...state,
        emails: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_EMAILS_ERROR:
      return {
        ...state,
        emails: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case SUBMIT_ADD_PATIENT_FAILURE:
      return {
        ...state,
        uploadStarted: null,
        addPatientStatus: {
          adding: false,
        },
      };
    case MOVE_PATIENT_BETWEEN_CATEGORIES_SUCCESS:
      return {
        ...state,
        patientBoardLoading: false,
        patientCategories: patientCategories(state.patientCategories, action.patientId, action),
      };
    case FETCH_PATIENT_CATEGORIES:
      return {
        ...state,
        fetchingPatients: true,
        fetchingPatientCategories: true,
      };
    case FETCH_PATIENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        patientCategories: action.payload.map(patientCategory => {
          const patientCategoryTemp = Object.assign({}, patientCategory);
          patientCategoryTemp.patients = [];
          return patientCategoryTemp;
        }),
        fetchingPatientCategories: false,
      };
    case FETCH_PROTOCOL_SUCCESS:
      return {
        ...state,
        protocol: action.payload,
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
    case FETCH_STUDY_CALLS_SUCCESS:
      return {
        ...state,
        stats: {
          ...state.stats,
          calls: action.payload.count,
          callsDuration: action.payload.totalDuration,
        },
      };
    case FETCH_STUDY_STATS_SUCCESS:
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
          referrals: action.payload.totalReferrals,
        },
      };
    case PATIENT_CATEGORIES_TOTALS_FETCHED:
      return {
        ...state,
        patientCategoriesTotals: action.payload,
      };
    case SET_STUDY_ID:
      return {
        ...state,
        studyId: action.id,
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
    case SET_OPEN_PATIENT_MODAL:
      return {
        ...state,
        openPatientModal: action.show,
      };
    case SHOW_SCHEDULED_MODAL:
      return {
        ...state,
        openScheduledModal: true,
      };
    case HIDE_SCHEDULED_MODAL:
      return {
        ...state,
        openScheduledModal: false,
        scheduledFormInitialized: false,
      };
    case MOVE_PATIENT_BETWEEN_CATEGORIES_LOADING:
      return {
        ...state,
        patientBoardLoading: true,
      };
    case MOVE_PATIENT_BETWEEN_CATEGORIES_FAILED:
      return {
        ...state,
        patientBoardLoading: false,
      };
    case SWITCH_TO_NOTE_SECTION_DETAIL:
      return {
        ...state,
        carousel: {
          note: true,
          text: false,
          email: false,
          other: false,
        },
      };
    case SWITCH_TO_TEXT_SECTION_DETAIL:
      return {
        ...state,
        carousel: {
          note: false,
          text: true,
          email: false,
          other: false,
        },
      };
    case SWITCH_TO_EMAIL_SECTION_DETAIL:
      return {
        ...state,
        carousel: {
          note: false,
          text: false,
          email: true,
          other: false,
        },
      };
    case SWITCH_TO_OTHER_SECTION_DETAIL:
      return {
        ...state,
        carousel: {
          note: false,
          text: false,
          email: false,
          other: true,
        },
      };
    case CHANGE_SCHEDULED_DATE:
      return {
        ...state,
        ScheduledModal: {
          selectedDate: action.date.startOf('day'),
        },
      };
    case SUBMIT_SCHEDULE:
      return {
        ...state,
        submittingSchedule: true,
      };
    case SUBMIT_SCHEDULE_SUCCEEDED:
      return {
        ...state,
        patientCategories: state.patientCategories.map(category => {
          if (category.name === 'Scheduled') {
            return {
              ...category,
              patients: category.patients.map(patient => {
                if (patient.id === action.patientId) {
                  const updatedAppointment = _.find(action.schedules, { patient_id: action.patientId });

                  return {
                    ...patient,
                    appointments: [updatedAppointment],
                  };
                }

                return patient;
              }),
            };
          }

          return category;
        }),
        submittingSchedule: false,
        scheduledFormInitialized: false,
        openScheduledModal: false,
        currentPatientId: state.openPatientModal ? state.currentPatientId : -1,
      };
    case SUBMIT_SCHEDULE_FAILED:
      return {
        ...state,
        submittingSchedule: false,
      };
    case SET_SCHEDULED_FORM_INITIALIZED:
      return {
        ...state,
        scheduledFormInitialized: action.formInitialized,
      };
    case DELETE_PATIENT:
      return {
        ...state,
        deletePatientProcess: {
          isDeleting: true,
          error: null,
        },
      };
    case DELETE_PATIENT_SUCCESS:
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
    case DELETE_PATIENT_ERROR:
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
    case ADD_PATIENT_NOTE_SUCCESS:
    case ADD_PATIENT_INDICATION_SUCCESS:
    case REMOVE_PATIENT_INDICATION_SUCCESS:
    case SUBMIT_DELETE_NOTE_SUCCESS:
      return state.map(patientCategory => {
        if (patientCategory.id === action.patientCategoryId) {
          return {
            ...patientCategory,
            patients: patients(patientCategory.patients, currentPatientId, action),
          };
        }
        return patientCategory;
      });
    case FETCH_PATIENT_DETAILS_SUCCESS:
    case UPDATE_PATIENT_SUCCESS:
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
    case MOVE_PATIENT_BETWEEN_CATEGORIES_SUCCESS: {
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
            if (fromPatientCategory.name === 'Scheduled') {
              return {
                ...patientCategory,
                patients: [
                  {
                    ...transformedPatient,
                    appointments: [],
                  },
                  ...patientCategory.patients,
                ],
              };
            }
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
    case ADD_PATIENT_INDICATION_SUCCESS:
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
    case ADD_PATIENT_NOTE_SUCCESS:
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
    case REMOVE_PATIENT_INDICATION_SUCCESS:
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
    case SUBMIT_DELETE_NOTE_SUCCESS:
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
