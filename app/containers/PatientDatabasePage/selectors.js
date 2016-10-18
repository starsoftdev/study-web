import { omit, map } from 'lodash';
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

const selectPatients = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.patients
);

const selectPatientCategories = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.patientCategories
);

const selectSelectedPatient = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.selectedPatient
);

const selectSelectedPatientDetailsForForm = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => {
    const selectedPatientDetails = substate.selectedPatient.details;
    if (!selectedPatientDetails) {
      return null;
    }

    let selectedPatientDetailsForForm = omit(selectedPatientDetails, ['created', 'indications', 'source_id', 'source', 'lastAction', 'study_patient_category_id', 'studyPatientCategory']);
    selectedPatientDetailsForForm = {
      ...selectedPatientDetailsForForm,
      indications: map(selectedPatientDetails.indications, indicationIterator => ({
        label: indicationIterator.name,
        value: indicationIterator.id,
      })),
      status: parseInt(selectedPatientDetails.studyPatientCategory.patient_category_id, 10),
      source: selectedPatientDetails.source_id,
    };

    return selectedPatientDetailsForForm;
  }
);

const selectSavedPatient = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.savedPatient
);


const selectChat = () => createSelector(
  selectPatientDatabasePageDomain(),
  (substate) => substate.chat
);

export default selectPatientDatabasePage;
export {
  selectPatientDatabasePageDomain,
  selectPatients,
  selectPatientCategories,
  selectSelectedPatient,
  selectSelectedPatientDetailsForForm,
  selectSavedPatient,
  selectChat,
};
