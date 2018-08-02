/*
 *
 * ProfilePage actions
 *
 */

import {
  VENDOR_CLEAR_FORM_UPLOAD,
  VENDOR_FIND_PATIENTS_TEXT_BLAST,
  VENDOR_FIND_PATIENTS_TEXT_BLAST_SUCCESS,
  VENDOR_FILTER_PATIENTS_TEXT_BLAST,
  VENDOR_ADD_PATIENTS_TO_TEXT_BLAST,
  VENDOR_REMOVE_PATIENT_FROM_TEXT_BLAST,
  VENDOR_REMOVE_PATIENTS_FROM_TEXT_BLAST,
  VENDOR_FETCHING_STUDY,
  VENDOR_FETCH_CAMPAIGNS_SUCCESS,
  VENDOR_FETCH_PATIENTS,
  VENDOR_FETCH_PATIENTS_SUCCESS,
  VENDOR_FETCH_PATIENT_DETAILS,
  VENDOR_FETCH_PATIENT_DETAILS_SUCCESS,
  VENDOR_FETCH_PATIENT_CATEGORIES,
  VENDOR_FETCH_PATIENT_CATEGORIES_SUCCESS,
  VENDOR_FETCH_STUDY,
  VENDOR_FETCH_STUDY_STATS,
  VENDOR_FETCH_PROTOCOL_SUCCESS,
  VENDOR_FETCH_SITE_SUCCESS,
  VENDOR_FETCH_STUDY_VIEWS_SUCCESS,
  VENDOR_FETCH_STUDY_CALLS_SUCCESS,
  VENDOR_FETCH_STUDY_STATS_SUCCESS,
  VENDOR_FETCH_STUDY_SUCCESS,
  VENDOR_EXPORT_PATIENTS_SUCCESS,
  VENDOR_READ_STUDY_PATIENT_MESSAGES,
  VENDOR_READ_STUDY_PATIENT_MESSAGES_SUCCESS,
  VENDOR_READ_STUDY_PATIENT_MESSAGES_ERROR,
  VENDOR_SET_STUDY_ID,
  VENDOR_SET_CURRENT_PATIENT_ID,
  VENDOR_SET_CURRENT_PATIENT_CATEGORY_ID,
  VENDOR_SET_OPEN_PATIENT_MODAL,
  VENDOR_SCHEDULE_PATIENT,
  VENDOR_SHOW_SCHEDULED_MODAL,
  VENDOR_HIDE_SCHEDULED_MODAL,
  VENDOR_SUBMIT_MOVE_PATIENT_BETWEEN_CATEGORIES,
  VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_LOADING,
  VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_SUCCESS,
  VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_FAILED,
  VENDOR_SUBMIT_ADD_PATIENT_SUCCESS,
  VENDOR_SUBMIT_PATIENT_IMPORT,
  VENDOR_SUBMIT_ADD_PATIENT,
  VENDOR_ADD_PATIENT_INDICATION,
  VENDOR_SUBMIT_ADD_PATIENT_FAILURE,
  VENDOR_REMOVE_PATIENT_INDICATION,
  VENDOR_SUBMIT_PATIENT_UPDATE,
  VENDOR_SUBMIT_PATIENT_NOTE,
  VENDOR_SUBMIT_DELETE_NOTE,
  VENDOR_SUBMIT_DELETE_NOTE_SUCCESS,
  VENDOR_ADD_PATIENT_INDICATION_SUCCESS,
  VENDOR_REMOVE_PATIENT_INDICATION_SUCCESS,
  VENDOR_UPDATE_PATIENT_SUCCESS,
  VENDOR_ADD_PATIENT_NOTE_SUCCESS,
  VENDOR_SWITCH_TO_NOTE_SECTION_DETAIL,
  VENDOR_SWITCH_TO_TEXT_SECTION_DETAIL,
  VENDOR_SWITCH_TO_EMAIL_SECTION_DETAIL,
  VENDOR_SWITCH_TO_OTHER_SECTION_DETAIL,
  VENDOR_CHANGE_SCHEDULED_DATE,
  VENDOR_SUBMIT_SCHEDULE,
  VENDOR_SUBMIT_SCHEDULE_SUCCEEDED,
  VENDOR_SUBMIT_SCHEDULE_FAILED,
  VENDOR_SET_SCHEDULED_FORM_INITIALIZED,
  VENDOR_FETCH_PATIENTS_ERROR,
  VENDOR_DELETE_PATIENT,
  VENDOR_DELETE_PATIENT_SUCCESS,
  VENDOR_DELETE_PATIENT_ERROR,
  VENDOR_DOWNLOAD_CLIENT_REPORT,
  VENDOR_GENERATE_PATIENT_REFERRAL,
  VENDOR_DOWNLOAD_PATIENT_REFERRAL,
  VENDOR_SUBMIT_EMAIL,
  VENDOR_SUBMIT_EMAIL_SUCCESS,
  VENDOR_FETCH_EMAILS,
  VENDOR_FETCH_EMAILS_SUCCESS,
  VENDOR_FETCH_EMAILS_ERROR,
  VENDOR_FETCH_PATIENT_CATEGORIES_TOTALS,
  VENDOR_PATIENT_CATEGORIES_TOTALS_FETCHED,
  VENDOR_SET_SELECTED_STUDY_SOURCES,
  EXPORT_PATIENTS,
  FETCH_CLIENT_CREDITS,
  FETCH_CLIENT_CREDITS_SUCCESS,
  FETCH_CLIENT_CREDITS_ERROR,
} from './constants';

export function campaignsFetched(payload) {
  return {
    type: VENDOR_FETCH_CAMPAIGNS_SUCCESS,
    payload,
  };
}

export function clearForm() {
  return {
    type: VENDOR_CLEAR_FORM_UPLOAD,
  };
}

export function fetchingStudy() {
  return {
    type: VENDOR_FETCHING_STUDY,
  };
}

export function findPatientsForTextBlast(studyId, text, categoryIds, sourceIds, campaignId) {
  return {
    type: VENDOR_FIND_PATIENTS_TEXT_BLAST,
    studyId,
    text,
    categoryIds,
    sourceIds,
    campaignId,
  };
}

export function findPatientsForTextBlastSuccess(payload) {
  return {
    type: VENDOR_FIND_PATIENTS_TEXT_BLAST_SUCCESS,
    payload,
  };
}

export function filterPatientsForTextBlast(text) {
  return {
    type: VENDOR_FILTER_PATIENTS_TEXT_BLAST,
    text,
  };
}

export function addPatientsToTextBlast(patients) {
  return {
    type: VENDOR_ADD_PATIENTS_TO_TEXT_BLAST,
    patients,
  };
}

export function removePatientFromTextBlast(patient) {
  return {
    type: VENDOR_REMOVE_PATIENT_FROM_TEXT_BLAST,
    patient,
  };
}

export function removePatientsFromTextBlast() {
  return {
    type: VENDOR_REMOVE_PATIENTS_FROM_TEXT_BLAST,
  };
}

export function fetchPatients(studyId, text, campaignId, sourceId, skip) {
  return {
    type: VENDOR_FETCH_PATIENTS,
    studyId,
    text,
    campaignId,
    sourceId,
    skip,
  };
}

export function downloadReport(reportName) {
  return {
    type: VENDOR_DOWNLOAD_CLIENT_REPORT,
    reportName,
  };
}

export function patientsExported() {
  return {
    type: VENDOR_EXPORT_PATIENTS_SUCCESS,
  };
}

export function setStudyId(id) {
  return {
    type: VENDOR_SET_STUDY_ID,
    id,
  };
}

export function patientsFetched(payload, page, limit, skip) {
  return {
    type: VENDOR_FETCH_PATIENTS_SUCCESS,
    payload,
    page,
    limit,
    skip,
  };
}

export function patientsFetchedError(payload) {
  return {
    type: VENDOR_FETCH_PATIENTS_ERROR,
    payload,
  };
}

export function fetchPatientDetails(patientId, patientCategoryId) {
  return {
    type: VENDOR_FETCH_PATIENT_DETAILS,
    patientId,
    patientCategoryId,
  };
}

export function patientDetailsFetched(patientId, patientCategoryId, payload) {
  return {
    type: VENDOR_FETCH_PATIENT_DETAILS_SUCCESS,
    patientId,
    patientCategoryId,
    payload,
  };
}

export function fetchPatientCategories(studyId) {
  return {
    type: VENDOR_FETCH_PATIENT_CATEGORIES,
    studyId,
  };
}

export function patientCategoriesFetched(payload) {
  return {
    type: VENDOR_FETCH_PATIENT_CATEGORIES_SUCCESS,
    payload,
  };
}

export function fetchStudy(studyId, sourceId) {
  return {
    type: VENDOR_FETCH_STUDY,
    studyId,
    sourceId,
  };
}

export function fetchStudyStats(studyId, campaignId, sourceId) {
  return {
    type: VENDOR_FETCH_STUDY_STATS,
    studyId,
    campaignId,
    sourceId,
  };
}

export function protocolFetched(payload) {
  return {
    type: VENDOR_FETCH_PROTOCOL_SUCCESS,
    payload,
  };
}

export function siteFetched(payload) {
  return {
    type: VENDOR_FETCH_SITE_SUCCESS,
    payload,
  };
}

export function studyFetched(payload) {
  return {
    type: VENDOR_FETCH_STUDY_SUCCESS,
    payload,
  };
}

export function studyViewsStatFetched(payload) {
  return {
    type: VENDOR_FETCH_STUDY_VIEWS_SUCCESS,
    payload,
  };
}

export function readStudyPatientMessages(patientId) {
  return {
    type: VENDOR_READ_STUDY_PATIENT_MESSAGES,
    patientId,
  };
}

export function readStudyPatientMessagesSuccess(payload) {
  return {
    type: VENDOR_READ_STUDY_PATIENT_MESSAGES_SUCCESS,
    payload,
  };
}

export function readStudyPatientMessagesError(payload) {
  return {
    type: VENDOR_READ_STUDY_PATIENT_MESSAGES_ERROR,
    payload,
  };
}

export function callStatsFetched(payload) {
  return {
    type: VENDOR_FETCH_STUDY_CALLS_SUCCESS,
    payload,
  };
}

export function studyStatsFetched(payload) {
  return {
    type: VENDOR_FETCH_STUDY_STATS_SUCCESS,
    payload,
  };
}

export function fetchPatientCategoriesTotals(studyId, campaignId, sourceId) {
  return {
    type: VENDOR_FETCH_PATIENT_CATEGORIES_TOTALS,
    studyId,
    campaignId,
    sourceId,
  };
}

export function patientCategoriesTotalsFetched(payload) {
  return {
    type: VENDOR_PATIENT_CATEGORIES_TOTALS_FETCHED,
    payload,
  };
}

export function setCurrentPatientId(id) {
  return {
    type: VENDOR_SET_CURRENT_PATIENT_ID,
    id,
  };
}

export function setCurrentPatientCategoryId(id) {
  return {
    type: VENDOR_SET_CURRENT_PATIENT_CATEGORY_ID,
    id,
  };
}

export function setOpenPatientModal(show) {
  return {
    type: VENDOR_SET_OPEN_PATIENT_MODAL,
    show,
  };
}

export function addPatientIndication(patientId, patientCategoryId, indication) {
  return {
    type: VENDOR_ADD_PATIENT_INDICATION,
    patientId,
    patientCategoryId,
    indication,
  };
}

export function removePatientIndication(patientId, patientCategoryId, indicationId) {
  return {
    type: VENDOR_REMOVE_PATIENT_INDICATION,
    patientId,
    patientCategoryId,
    indicationId,
  };
}

export function submitPatientUpdate(patientId, patientCategoryId, fields) {
  return {
    type: VENDOR_SUBMIT_PATIENT_UPDATE,
    patientId,
    patientCategoryId,
    fields,
  };
}

export function addPatientIndicationSuccess(patientId, patientCategoryId, indication, isOriginal) {
  return {
    type: VENDOR_ADD_PATIENT_INDICATION_SUCCESS,
    patientId,
    patientCategoryId,
    indication,
    isOriginal,
  };
}

export function removePatientIndicationSuccess(patientId, patientCategoryId, indicationId, payload) {
  return {
    type: VENDOR_REMOVE_PATIENT_INDICATION_SUCCESS,
    patientId,
    patientCategoryId,
    indicationId,
    payload,
  };
}

export function updatePatientSuccess(patientId, patientCategoryId, payload) {
  return {
    type: VENDOR_UPDATE_PATIENT_SUCCESS,
    patientId,
    patientCategoryId,
    payload,
  };
}

export function addPatientNoteSuccess(patientId, patientCategoryId, currentUser, payload) {
  return {
    type: VENDOR_ADD_PATIENT_NOTE_SUCCESS,
    patientId,
    patientCategoryId,
    currentUser,
    payload,
  };
}

export function schedulePatient(studyId, fromCategoryId, toCategoryId, patientId) {
  return {
    type: VENDOR_SCHEDULE_PATIENT,
    studyId,
    fromCategoryId,
    toCategoryId,
    patientId,
  };
}

export function submitMovePatientBetweenCategories(studyId, fromCategoryId, toCategoryId, patientId, afterPatientId) {
  return {
    type: VENDOR_SUBMIT_MOVE_PATIENT_BETWEEN_CATEGORIES,
    studyId,
    fromCategoryId,
    toCategoryId,
    patientId,
    afterPatientId,
  };
}

export function movePatientBetweenCategoriesLoading() {
  return {
    type: VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_LOADING,
  };
}

export function movePatientBetweenCategoriesSuccess(fromCategoryId, toCategoryId, orderNumber, patientId, updatedAt) {
  return {
    type: VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_SUCCESS,
    fromCategoryId,
    toCategoryId,
    orderNumber,
    patientId,
    updatedAt,
  };
}

export function movePatientBetweenCategoriesFailed() {
  return {
    type: VENDOR_MOVE_PATIENT_BETWEEN_CATEGORIES_FAILED,
  };
}


export function showScheduledModal(modalType) {
  return {
    type: VENDOR_SHOW_SCHEDULED_MODAL,
    modalType,
  };
}

export function hideScheduledModal() {
  return {
    type: VENDOR_HIDE_SCHEDULED_MODAL,
  };
}

export function submitPatientNote(studyId, patientId, patientCategoryId, currentUser, note) {
  return {
    type: VENDOR_SUBMIT_PATIENT_NOTE,
    studyId,
    patientId,
    patientCategoryId,
    currentUser,
    note,
  };
}

export function submitEmail(studyId, patientId, currentUser, email, message, subject) {
  return {
    type: VENDOR_SUBMIT_EMAIL,
    studyId,
    patientId,
    currentUser,
    email,
    message,
    subject,
  };
}

export function submitEmailSuccess(payload) {
  return {
    type: VENDOR_SUBMIT_EMAIL_SUCCESS,
    payload,
  };
}

export function fetchEmails(studyId, patientId) {
  return {
    type: VENDOR_FETCH_EMAILS,
    studyId,
    patientId,
  };
}

export function emailsFetched(payload) {
  return {
    type: VENDOR_FETCH_EMAILS_SUCCESS,
    payload,
  };
}

export function emailsFetchError(payload) {
  return {
    type: VENDOR_FETCH_EMAILS_ERROR,
    payload,
  };
}

export function submitDeleteNote(patientId, patientCategoryId, noteId) {
  return {
    type: VENDOR_SUBMIT_DELETE_NOTE,
    patientId,
    patientCategoryId,
    noteId,
  };
}

export function deletePatientNoteSuccess(patientId, patientCategoryId, noteId) {
  return {
    type: VENDOR_SUBMIT_DELETE_NOTE_SUCCESS,
    patientId,
    patientCategoryId,
    noteId,
  };
}

export function submitPatientImport(clientId, studyId, file, onClose) {
  return {
    type: VENDOR_SUBMIT_PATIENT_IMPORT,
    clientId,
    studyId,
    file,
    onClose,
  };
}

export function submitAddPatient(studyId, patient, onClose) {
  return {
    type: VENDOR_SUBMIT_ADD_PATIENT,
    studyId,
    patient,
    onClose,
  };
}

export function submitAddPatientSuccess(patients, fileName) {
  return {
    type: VENDOR_SUBMIT_ADD_PATIENT_SUCCESS,
    patients,
    fileName,
  };
}

export function submitAddPatientFailure() {
  return {
    type: VENDOR_SUBMIT_ADD_PATIENT_FAILURE,
  };
}

export function switchToNoteSectionDetail() {
  return {
    type: VENDOR_SWITCH_TO_NOTE_SECTION_DETAIL,
  };
}

export function switchToTextSectionDetail() {
  return {
    type: VENDOR_SWITCH_TO_TEXT_SECTION_DETAIL,
  };
}

export function switchToEmailSectionDetail() {
  return {
    type: VENDOR_SWITCH_TO_EMAIL_SECTION_DETAIL,
  };
}

export function switchToOtherSectionDetail() {
  return {
    type: VENDOR_SWITCH_TO_OTHER_SECTION_DETAIL,
  };
}

export function changeScheduledDate(date) {
  return {
    type: VENDOR_CHANGE_SCHEDULED_DATE,
    date,
  };
}

export function submitSchedule(data, fromCategoryId, scheduledCategoryId) {
  return {
    type: VENDOR_SUBMIT_SCHEDULE,
    data,
    fromCategoryId,
    scheduledCategoryId,
  };
}

export function submitScheduleSucceeded(schedules, patientId) {
  return {
    type: VENDOR_SUBMIT_SCHEDULE_SUCCEEDED,
    schedules,
    patientId,
  };
}

export function submitScheduleFailed() {
  return {
    type: VENDOR_SUBMIT_SCHEDULE_FAILED,
  };
}

export function setScheduledFormInitialized(formInitialized) {
  return {
    type: VENDOR_SET_SCHEDULED_FORM_INITIALIZED,
    formInitialized,
  };
}

export function deletePatient(id) {
  return {
    type: VENDOR_DELETE_PATIENT,
    id,
  };
}

export function deletePatientSuccess(payload) {
  return {
    type: VENDOR_DELETE_PATIENT_SUCCESS,
    payload,
  };
}

export function deletePatientError(payload) {
  return {
    type: VENDOR_DELETE_PATIENT_ERROR,
    payload,
  };
}

export function generateReferral(patientId, studyId) {
  return {
    type: VENDOR_GENERATE_PATIENT_REFERRAL,
    patientId,
    studyId,
  };
}

export function downloadReferral(reportName, studyId) {
  return {
    type: VENDOR_DOWNLOAD_PATIENT_REFERRAL,
    reportName,
    studyId,
  };
}

export function setSelectedStudySources(list) {
  return {
    type: VENDOR_SET_SELECTED_STUDY_SOURCES,
    list,
  };
}

export function exportPatients(studyId, vendorRoleId, text, campaignId, sourceId) {
  return {
    type: EXPORT_PATIENTS,
    studyId,
    vendorRoleId,
    text,
    campaignId,
    sourceId,
  };
}

export function fetchClientCredits(userId) {
  return {
    type: FETCH_CLIENT_CREDITS,
    userId,
  };
}

export function clientCreditsFetched(payload) {
  return {
    type: FETCH_CLIENT_CREDITS_SUCCESS,
    payload,
  };
}

export function clientCreditsFetchingError(payload) {
  return {
    type: FETCH_CLIENT_CREDITS_ERROR,
    payload,
  };
}
