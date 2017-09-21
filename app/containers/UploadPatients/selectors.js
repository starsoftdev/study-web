import { omit, get } from 'lodash';
import { createSelector } from 'reselect';
import { selectStudiesFromSites } from '../App/selectors';

/**
 * Direct selector to the uploadPatientsPage state domain
 */
const selectUploadPatientsPageDomain = () => state => state.uploadPatientsPage;

/**
 * Default selector used by PatientDatabasePage
 */

const selectPatientDatabasePage = () => createSelector(
  selectUploadPatientsPageDomain(),
  (substate) => substate
);
export default selectPatientDatabasePage;

export const selectExportPatientsStatus = () => createSelector(
  selectUploadPatientsPageDomain(),
  (subState) => subState.exportPatientsStatus
);

export const selectPatients = () => createSelector(
  selectUploadPatientsPageDomain(),
  (substate) => substate.patients
);

export const selectTotalPatients = () => createSelector(
  selectUploadPatientsPageDomain(),
  (substate) => substate.totalPatients
);

export const selectPatientCategories = () => createSelector(
  selectUploadPatientsPageDomain(),
  (substate) => substate.patientCategories
);

export const selectSelectedPatient = () => createSelector(
  selectUploadPatientsPageDomain(),
  (substate) => substate.selectedPatient
);

export const selectSelectedPatientDetailsForForm = () => createSelector(
  selectUploadPatientsPageDomain(),
  selectStudiesFromSites(),
  (substate) => {
    const selectedPatientDetails = substate.selectedPatient.details;
    if (!selectedPatientDetails) {
      return null;
    }

    let protocolId;

    if (selectedPatientDetails.studyPatientCategory && selectedPatientDetails.studyPatientCategory.study) {
      protocolId = selectedPatientDetails.studyPatientCategory.study.id;
    }

    let selectedPatientDetailsForForm = omit(selectedPatientDetails, ['created', 'patientIndications', 'lastAction', 'study_patient_category_id', 'studyPatientCategory']);
    selectedPatientDetailsForForm = {
      ...selectedPatientDetailsForForm,
      indications: selectedPatientDetails.patientIndications ? selectedPatientDetails.patientIndications.map(piIterator => ({
        label: piIterator.indication.name,
        value: piIterator.indication.id,
        id: piIterator.indication.id,
        name: piIterator.indication.name,
        isOriginal: piIterator.isOriginal,
      })) : [],
      status: selectedPatientDetails.studyPatientCategory ? parseInt(selectedPatientDetails.studyPatientCategory.patient_category_id, 10) : false,
      protocol: protocolId,
    };
    return selectedPatientDetailsForForm;
  }
);

export const selectSavedPatient = () => createSelector(
  selectUploadPatientsPageDomain(),
  (substate) => substate.savedPatient
);

export const selectImportPatientsStatus = () => createSelector(
  selectUploadPatientsPageDomain(),
  (substate) => substate.importPatientsStatus
);

export const selectPaginationOptions = () => createSelector(
  selectUploadPatientsPageDomain(),
  (substate) => substate.paginationOptions
);

export const selectChat = () => createSelector(
  selectUploadPatientsPageDomain(),
  (substate) => substate.chat
);

export const selectAddPatientStatus = () => createSelector(
  selectUploadPatientsPageDomain(),
  (subState) => subState.addPatientStatus
);

const selectFormDomain = () => state => state.form;

export const selectProtocols = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.protocols.details`, [])
);

export const selectIsFetchingProtocols = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.protocols.fetching`, false)
);
