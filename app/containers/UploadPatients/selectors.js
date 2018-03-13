import { get } from 'lodash';
import { createSelector } from 'reselect';

/**
 * Direct selector to the uploadPatientsPage state domain
 */
const selectUploadPatientsPageDomain = () => state => state.uploadPatientsPage;

/**
 * Default selector used by PatientDatabasePage
 */


// steel need this?
const selectPatientDatabasePage = () => createSelector(
  selectUploadPatientsPageDomain(),
  (substate) => substate
);
export default selectPatientDatabasePage;

export const selectExportPatientsStatus = () => createSelector(
  selectUploadPatientsPageDomain(),
  (subState) => subState.exportPatientsStatus
);

export const selectAddProtocolProcessStatus = () => createSelector(
  selectUploadPatientsPageDomain(),
  (subState) => subState.addProtocolProcess
);

export const selectUploadHistory = () => createSelector(
  selectUploadPatientsPageDomain(),
  (subState) => subState.uploadHistory
);

const selectFormDomain = () => state => state.form;

export const selectProtocols = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.protocols.details`, [])
);

export const selectEmptyRowRequiredError = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.emptyRowRequiredError`, false)
);

export const selectValidationError = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.validationError`, false)
);

export const selectIsFetchingProtocols = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.protocols.fetching`, false)
);

export const selectStudySources = () => createSelector(
  selectUploadPatientsPageDomain(),
  (substate) => substate.studySources
);
