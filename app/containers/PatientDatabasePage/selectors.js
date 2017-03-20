import { omit, map, get } from 'lodash';
import { createSelector } from 'reselect';

/**
 * Direct selector to the patientDatabasePage state domain
 */
const selectPatientDatabasePageDomain = () => state => state.patientDatabasePage;

/**
 * Default selector used by PatientDatabasePage
 */

const selectPatientDatabasePage = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate
);
export default selectPatientDatabasePage;

export const selectPatients = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.patients
);

export const selectPatientCategories = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.patientCategories
);

export const selectSelectedPatient = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.selectedPatient
);

export const selectSelectedPatientDetailsForForm = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => {
    const selectedPatientDetails = substate.selectedPatient.details;
    if (!selectedPatientDetails) {
      return null;
    }

    let selectedPatientDetailsForForm = omit(selectedPatientDetails, ['created', 'patientIndications', 'lastAction', 'study_patient_category_id', 'studyPatientCategory']);
    selectedPatientDetailsForForm = {
      ...selectedPatientDetailsForForm,
      indications: map(selectedPatientDetails.patientIndications, piIterator => ({
        label: piIterator.indication.name,
        value: piIterator.indication.id,
        id: piIterator.indication.id,
        name: piIterator.indication.name,
        isOriginal: piIterator.isOriginal,
      })),
      status: selectedPatientDetails.studyPatientCategory ? parseInt(selectedPatientDetails.studyPatientCategory.patient_category_id, 10) : false,
    };
    return selectedPatientDetailsForForm;
  }
);

export const selectSavedPatient = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.savedPatient
);

export const selectImportPatientsStatus = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.importPatientsStatus
);

export const selectPaginationOptions = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.paginationOptions
);

export const selectChat = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.chat
);

export const selectAddPatientStatus = () => createSelector(
  selectPatientDatabasePageDomain(),
  (subState) => subState.addPatientStatus
);

const selectFormDomain = () => state => state.form;

export const selectPatientDatabaseFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'searchPatients.values', {})
);
