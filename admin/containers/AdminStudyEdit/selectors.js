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

const selectLanding = () => createSelector(
  selectAdminStudyEditDomain(),
  (substate) => substate.landing
);

const selectUpdatePatientThankYouEmailProcess = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.updatePatientThankYouEmailProcess
);

const selectEditMediaTypesProcess = () => createSelector(
  selectAdminStudyEditDomain(),
  (substate) => substate.editMediaTypesProcess
);

const selectThankYouPageUpdateProcess = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.updateThankYouPageProcess
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

const selectLandingPageUpdateProcess = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.updateLandingPageProcess
);

const selectUpdatedStudyAd = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.updatedStudyAd
);

const selectChangeStudyAdProcess = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.changeStudyAdProcess
);

const selectRemovedStudyAdId = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.removedStudyAdId
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

const selectAllClientUsers = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.allClientUsers
);

const selectAllCustomNotificationEmails = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.allCustomNotificationEmails
);

const selectUpdateStudyProcess = () => createSelector(
  selectAdminStudyEditDomain(),
  substate => substate.editStudyProcess
);

export default selectAdminStudyEditPage;
export {
  selectAdminDashboardEditNoteFormValues,
  selectAdminDashboardNote,
  selectAdminDashboardEditNoteProcess,
  selectLanding,
  selectUpdatePatientThankYouEmailProcess,
  selectEditMediaTypesProcess,
  selectThankYouPageUpdateProcess,
  selectLandingIsFetching,
  selectLandingError,
  selectFacebookLandingPageUpdateProcess,
  selectLandingPageUpdateProcess,
  selectUpdatedStudyAd,
  selectChangeStudyAdProcess,
  selectRemovedStudyAdId,
  selectStudyInfo,
  selectIndications,
  selectCro,
  selectProtocols,
  selectSponsors,
  selectSiteLocations,
  selectUsersByRoles,
  selectMessagingNumbers,
  selectAllClientUsers,
  selectAllCustomNotificationEmails,
  selectUpdateStudyProcess,
};
