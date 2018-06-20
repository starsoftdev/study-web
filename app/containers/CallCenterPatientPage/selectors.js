import { createSelector } from 'reselect';

/**
 * Direct selector to the callCenterPatientPage state domain
 */
const selectCallCenterPatientPageDomain = () => state => state.callCenterPatientPage;

/**
 * Form selector
 */
export const selectFormDomain = () => state => state.form;

export const selectSelectedPatient = () => createSelector(
  selectCallCenterPatientPageDomain(),
  (substate) => substate.selectedPatient
);

export const selectCallCenterPatientCategories = () => createSelector(
  selectCallCenterPatientPageDomain(),
  (substate) => substate.callCenterPatientCategories
);

export const selectCurrentPatientCategory = () => createSelector(
  selectCallCenterPatientPageDomain(),
  (substate) => {
    if (substate.selectedPatient && substate.selectedPatient.details) {
      return substate.selectedPatient.details.studyPatientCategory;
    }
    return null;
  }
);

export const selectSubmittingEmail = () => createSelector(
  selectCallCenterPatientPageDomain(),
  (subState) => subState.submittingEmail
);

export const selectCallCenterScheduledModalFormValues = () => createSelector(
  selectCallCenterPatientPageDomain(),
  (subState) => (subState.CallCenterScheduledPatientModal ? subState.CallCenterScheduledPatientModal.values : null)
);
