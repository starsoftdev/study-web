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

const selectStudyInfo = () => createSelector(
  selectAdminStudyEditDomain(),
  (substate) => substate.studyInfo
);

const selectIndications = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.indications
);

const selectSponsors = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.sponsors
);

const selectProtocols = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.protocols
);

const selectCro = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.cro
);

const selectSiteLocations = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.siteLocations
);

const selectUsersByRoles = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.usersByRoles
);

const selectMessagingNumbers = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.messagingNumbers
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
  selectStudyInfo,
  selectIndications,
  selectCro,
  selectProtocols,
  selectSponsors,
  selectSiteLocations,
  selectUsersByRoles,
  selectMessagingNumbers,
};
