import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Direct selector to the patientDatabasePage state domain
 */
const selectDashboardPageDomain = () => state => state.dashboardPage;
const selectFormDomain = () => state => state.form;
/**
 * Default selector used by PatientDatabasePage
 */

const selectDashboardPage = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate
);

const selectFilterFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'dashboardFilters.values', {})
);

const selectEditStudyValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'dashboardEditStudyForm.values', {})
);

const selectStudies = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.studies
);

const selectStudyIndicationTags = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.studyIndicationTags
);

const selectLevels = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.levels
);

const selectSiteNames = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.siteNames
);

const selectSiteLocations = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.siteLocations
);

const selectIndications = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.indications
);

const selectSponsors = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.sponsors
);

const selectProtocols = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.protocols
);

const selectCro = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.cro
);

const selectUsersByRoles = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.usersByRoles
);

const selectStudiesTotals = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.totals
);

const selectStudyUpdateProcess = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.updateStudyProcess
);

const selectAllClientUsers = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.allClientUsers
);

const selectAllCustomNotificationEmails = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.allCustomNotificationEmails
);

const selectAddNotificationProcess = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.addNotificationProcess
);

const selectStudyCampaigns = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.studyCampaigns
);

const selectLandingPageUpdateProcess = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.updateLandingPageProcess
);

const selectChangeStudyAddProcess = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.changeStudyAddProcess
);

const selectUpdatedStudyAd = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.updatedStudyAd
);

const selectThankYouPageUpdateProcess = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.updateThankYouPageProcess
);

const selectMessagingNumbers = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.messagingNumbers
);

const selectUpdatePatientThankYouEmailProcess = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.updatePatientThankYouEmailProcess
);

const selectHoverRowIndex = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.hoverRowIndex
);

const selectPaginationOptions = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.paginationOptions
);

const selectDashboardNote = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate.note
);

const selectDashboardEditNoteProcess = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate.editNoteProcess
);

export default selectDashboardPage;
export {
  selectDashboardPageDomain,
  selectStudies,
  selectFilterFormValues,
  selectPaginationOptions,
  selectDashboardNote,
  selectDashboardEditNoteProcess,
  selectLevels,
  selectSiteNames,
  selectSiteLocations,
  selectIndications,
  selectSponsors,
  selectProtocols,
  selectCro,
  selectUsersByRoles,
  selectStudiesTotals,
  selectStudyUpdateProcess,
  selectAllClientUsers,
  selectAllCustomNotificationEmails,
  selectEditStudyValues,
  selectAddNotificationProcess,
  selectStudyCampaigns,
  selectThankYouPageUpdateProcess,
  selectUpdatePatientThankYouEmailProcess,
  selectLandingPageUpdateProcess,
  selectChangeStudyAddProcess,
  selectMessagingNumbers,
  selectUpdatedStudyAd,
  selectHoverRowIndex,
  selectStudyIndicationTags,
};
