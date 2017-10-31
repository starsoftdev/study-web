import { get } from 'lodash';
import { createSelector } from 'reselect';

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

const selectFormDomain = () => state => state.form;

export const selectProtocols = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.protocols.details`, [])
);

export const selectIsFetchingProtocols = (formName) => createSelector(
  selectFormDomain(),
  (substate) => get(substate, `${formName}.protocols.fetching`, false)
);
