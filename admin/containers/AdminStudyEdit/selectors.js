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

const selectEditMediaTypesProcess = () => createSelector(
  selectAdminStudyEditDomain(),
  (substate) => substate.editMediaTypesProcess
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

const selectFacebookLandingPageUpdateProcess = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.updateFacebookLandingPageProcess
);

export default selectAdminStudyEditPage;
export {
  selectAdminDashboardEditNoteFormValues,
  selectAdminDashboardNote,
  selectAdminDashboardEditNoteProcess,
  selectEditMediaTypesProcess,
  selectThankYouPageUpdateProcess,
  selectLanding,
  selectLandingIsFetching,
  selectLandingError,
  selectFacebookLandingPageUpdateProcess,
};
