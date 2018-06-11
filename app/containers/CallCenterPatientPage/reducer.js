import {
  FETCH_PATIENT,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_ERROR,
  FETCH_CALL_CENTER_PATIENT_CATEGORIES_SUCCESS,
  FETCH_CALL_CENTER_PATIENT_CATEGORIES_ERROR,
  ADD_PATIENT_NOTE_SUCCESS,
  SUBMIT_DELETE_NOTE_SUCCESS,
  SUBMIT_EMAIL,
  SUBMIT_EMAIL_SUCCESS,
  SUBMIT_EMAIL_ERROR,
} from './constants';

const initialState = {
  callCenterPatientCategories: [],
  selectedPatient: {
    details: null,
    fetching: false,
    error: null,
  },
  submittingEmail: false,
  submittingSchedule: {
    submitting: false,
    error: null,
  },
};

export default function callCenterPatientPageReducer(state = initialState, action) {
  const { payload } = action;
  let notes;
  let patient;

  switch (action.type) {
    case FETCH_PATIENT:
      return {
        ...state,
        selectedPatient: {
          details: null,
          id: action.id,
          fetching: true,
          error: null,
        },
      };
    case FETCH_PATIENT_SUCCESS:
      return {
        ...state,
        selectedPatient: {
          details: payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_PATIENT_ERROR:
      return {
        ...state,
        selectedPatient: {
          details: null,
          fetching: false,
          error: payload,
        },
      };
    case FETCH_CALL_CENTER_PATIENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        callCenterPatientCategories: action.payload,
      };
    case FETCH_CALL_CENTER_PATIENT_CATEGORIES_ERROR:
      return {
        ...state,
        callCenterPatientCategories: [],
      };
    case ADD_PATIENT_NOTE_SUCCESS:
      notes = state.selectedPatient.details.notes;
      return {
        ...state,
        selectedPatient: {
          ...state.selectedPatient,
          details: {
            ...state.selectedPatient.details,
            notes: [
              ...notes,
              {
                ...action.payload,
                user: action.currentUser.isProxy ? { ...action.currentUser, firstName: 'StudyKIK', lastName: '' } : action.currentUser,
              },
            ],
          },
        },
      };
    case SUBMIT_DELETE_NOTE_SUCCESS:
      patient = state.selectedPatient.details;
      notes = state.selectedPatient.details.notes;
      return {
        ...state,
        selectedPatient: {
          ...state.selectedPatient,
          details: {
            ...patient,
            notes: patient.notes.filter(note => note.id !== action.noteId),
          },
        },
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
    default:
      return state;
  }
}
