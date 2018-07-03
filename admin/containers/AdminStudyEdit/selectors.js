import { createSelector } from 'reselect';
import { get } from 'lodash';

const selectAdminStudyEditDomain = () => state => state.AdminStudyEditPage;
const selectFormDomain = () => state => state.form;

const selectAdminStudyEditPage = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate
);

const selectAdminDashboardEditNoteFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'AdminEditStudy.Notes.values', {})
);

const selectAdminDashboardNote = () => createSelector(
  selectAdminStudyEditDomain(),
  (substate) => substate.note
);

const selectAdminDashboardEditNoteProcess = () => createSelector(
  selectAdminStudyEditDomain(),
  (substate) => substate.editNoteProcess
);

const selectThankYouPageUpdateProcess = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.updateThankYouPageProcess
);

const selectLanding = () => createSelector(
  selectAdminStudyEditDomain(),
  (substate) => substate.landing.details
);

const selectLandingIsFetching = () => createSelector(
  selectAdminStudyEditDomain(),
  (substate) => substate.landing.fetching
);

const selectLandingError = () => createSelector(
  selectAdminStudyEditDomain(),
  (substate) => substate.landing.error
);

export default selectAdminStudyEditPage;
export {
  selectAdminDashboardEditNoteFormValues,
  selectAdminDashboardNote,
  selectAdminDashboardEditNoteProcess,
  selectThankYouPageUpdateProcess,
  selectLanding,
  selectLandingIsFetching,
  selectLandingError,
};
