import {
  MARK_AS_READ_PATIENT_MESSAGES,
  DELETE_MESSAGES_COUNT_STAT,
  INCREMENT_STUDY_UNREAD_MESSAGES,
  SUBTRACT_STUDY_UNREAD_MESSAGES,
} from '../constants/app';

export function markAsReadPatientMessages(patientId) {
  return {
    type: MARK_AS_READ_PATIENT_MESSAGES,
    patientId,
  };
}
export function deleteMessagesCountStat(payload) {
  return {
    type: DELETE_MESSAGES_COUNT_STAT,
    payload,
  };
}

export function incrementStudyUnreadMessages(studyId) {
  return {
    type: INCREMENT_STUDY_UNREAD_MESSAGES,
    studyId,
  };
}

export function subtractStudyUnreadMessages(studyId, count) {
  return {
    type: SUBTRACT_STUDY_UNREAD_MESSAGES,
    studyId,
    count,
  };
}

