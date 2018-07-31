import {
  FETCH_PATIENT_DETAILS,
  READ_STUDY_PATIENT_MESSAGES,
  READ_STUDY_PATIENT_MESSAGES_SUCCESS,
  READ_STUDY_PATIENT_MESSAGES_ERROR,
  SET_CURRENT_PATIENT_CATEGORY_ID,
  SET_OPEN_PATIENT_MODAL,
  SHOW_SCHEDULED_MODAL,
  HIDE_SCHEDULED_MODAL,
  UPDATE_PATIENT_SUCCESS,
  SWITCH_TO_NOTE_SECTION_DETAIL,
  SWITCH_TO_TEXT_SECTION_DETAIL,
  SWITCH_TO_EMAIL_SECTION_DETAIL,
  SWITCH_TO_OTHER_SECTION_DETAIL,
  CHANGE_SCHEDULED_DATE,
  SUBMIT_SCHEDULE,
  SUBMIT_SCHEDULE_SUCCEEDED,
  SUBMIT_SCHEDULE_FAILED,
} from '../constants/patients';

export function fetchPatientDetails(patientId, patientCategoryId) {
  return {
    type: FETCH_PATIENT_DETAILS,
    patientId,
    patientCategoryId,
  };
}

export function showScheduledModal(modalType) {
  return {
    type: SHOW_SCHEDULED_MODAL,
    modalType,
  };
}


export function hideScheduledModal() {
  return {
    type: HIDE_SCHEDULED_MODAL,
  };
}

export function setCurrentPatientCategoryId(id) {
  return {
    type: SET_CURRENT_PATIENT_CATEGORY_ID,
    id,
  };
}

export function setOpenPatientModal(show) {
  return {
    type: SET_OPEN_PATIENT_MODAL,
    show,
  };
}


export function switchToNoteSectionDetail() {
  return {
    type: SWITCH_TO_NOTE_SECTION_DETAIL,
  };
}

export function switchToTextSectionDetail() {
  return {
    type: SWITCH_TO_TEXT_SECTION_DETAIL,
  };
}

export function switchToEmailSectionDetail() {
  return {
    type: SWITCH_TO_EMAIL_SECTION_DETAIL,
  };
}

export function switchToOtherSectionDetail() {
  return {
    type: SWITCH_TO_OTHER_SECTION_DETAIL,
  };
}


export function readStudyPatientMessages(patientId) {
  return {
    type: READ_STUDY_PATIENT_MESSAGES,
    patientId,
  };
}

export function readStudyPatientMessagesSuccess(payload) {
  return {
    type: READ_STUDY_PATIENT_MESSAGES_SUCCESS,
    payload,
  };
}

export function readStudyPatientMessagesError(payload) {
  return {
    type: READ_STUDY_PATIENT_MESSAGES_ERROR,
    payload,
  };
}

export function changeScheduledDate(date) {
  return {
    type: CHANGE_SCHEDULED_DATE,
    date,
  };
}


export function submitSchedule(data, fromCategoryId, scheduledCategoryId) {
  return {
    type: SUBMIT_SCHEDULE,
    data,
    fromCategoryId,
    scheduledCategoryId,
  };
}

export function submitScheduleSucceeded(schedules, patientId) {
  return {
    type: SUBMIT_SCHEDULE_SUCCEEDED,
    schedules,
    patientId,
  };
}

export function submitScheduleFailed() {
  return {
    type: SUBMIT_SCHEDULE_FAILED,
  };
}


export function updatePatientSuccess(patientId, patientCategoryId, payload) {
  return {
    type: UPDATE_PATIENT_SUCCESS,
    patientId,
    patientCategoryId,
    payload,
  };
}

