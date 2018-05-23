import { createSelector } from 'reselect';

/**
 * Direct selector to the callCenterPatientPage state domain
 */
const selectCallCenterPatientPageDomain = () => state => state.callCenterPatientPage;

export const selectSelectedPatient = () => createSelector(
  selectCallCenterPatientPageDomain(),
  (substate) => substate.selectedPatient
);
