/**
 * Created by mike on 9/27/16.
 */

import { createSelector } from 'reselect';

/**
 * Direct selector to the studyPage state domain
 */
const selectStudyPageDomain = () => state => state.studyPage;
export default selectStudyPageDomain;

/**
 * Other selectors
 */
export const selectFormDomain = () => state => state.form;

export const selectCampaigns = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.campaigns
);

export const selectPatientUnder = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.patientUnder
);

export const selectPatientCategories = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.patientCategories
);

export const selectCurrentPatientCategoryId = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.currentPatientCategoryId
);

export const selectCurrentPatientId = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.currentPatientId
);

export const selectCurrentPatientCategory = () => createSelector(
  selectStudyPageDomain(),
  (subState) => {
    if (subState.patientCategories) {
      const filteredPatientCategory = Object.assign({}, subState.patientCategories.filter(patientCategory => (
        patientCategory.id === subState.currentPatientCategoryId
      ))[0]);
      if (filteredPatientCategory) {
        delete filteredPatientCategory.patients;
      }
      return filteredPatientCategory;
    }
    return null;
  }
);

export const selectCurrentPatientNotes = () => createSelector(
  selectStudyPageDomain(),
  (subState) => {
    if (subState.patientCategories) {
      const filteredPatientCategory = subState.patientCategories.filter(patientCategory => (
        patientCategory.id === subState.currentPatientCategoryId
      ))[0];
      if (filteredPatientCategory && filteredPatientCategory.patients) {
        const patient = filteredPatientCategory.patients.filter(patient => (
          patient.id === subState.currentPatientId
        ))[0];
        if (patient && patient.notes) {
          return patient.notes;
        }
      }
    }
    return [];
  }
);

export const selectCurrentPatient = () => createSelector(
  selectStudyPageDomain(),
  (subState) => {
    if (subState.patientCategories) {
      const filteredPatientCategory = subState.patientCategories.filter(patientCategory => (
        patientCategory.id === subState.currentPatientCategoryId
      ))[0];
      if (filteredPatientCategory && filteredPatientCategory.patients) {
        return filteredPatientCategory.patients.filter(patient => (
          patient.id === subState.currentPatientId
        ))[0];
      }
    }
    return null;
  }
);

export const selectStudyId = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.studyId
);

export const selectProtocol = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.protocol
);

export const selectSite = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.site
);

export const selectSources = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.sources
);

export const selectStudy = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.study
);

export const selectStudyStats = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.stats
);

export const selectFetchingStudy = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.fetchingStudy
);

export const selectFetchingPatients = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.fetchingPatients
);

export const selectFetchingPatientCategories = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.fetchingPatientCategories
);

export const selectCarousel = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.carousel
);

export const selectOpenPatientModal = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.openPatientModal
);


export const selectOpenScheduledModal = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.openScheduledModal
);

export const selectAddPatientStatus = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.addPatientStatus
);

export const selectIndicationId = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.study.indication_id
);

export const selectSelectedDate = () => createSelector(
  selectStudyPageDomain(),
  (subState) => (subState.ScheduledModal ? subState.ScheduledModal.selectedDate : null)
);

export const selectSubmittingSchedule = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.submittingSchedule
);

export const selectSubmittingEmail = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.submittingEmail
);

export const selectEmails = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.emails
);

export const selectDeletePatientProcess = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.deletePatientProcess
);

export const selectScheduledFormInitialized = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.scheduledFormInitialized
);

export const selectFetchingPatientsError = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.fetchingPatientsError
);

export const selectSchedulePatientFormValues = () => createSelector(
  selectFormDomain(),
  (subState) => (subState.ScheduledPatientModal ? subState.ScheduledPatientModal.values : null)
);

export const selectSchedulePatientFormErrors = () => createSelector(
  selectFormDomain(),
  (subState) => (subState.ScheduledPatientModal ? subState.ScheduledPatientModal.syncErrors : null)
);

export const selectStudySources = () => createSelector(
  selectStudyPageDomain(),
  (substate) => substate.studySources
);
