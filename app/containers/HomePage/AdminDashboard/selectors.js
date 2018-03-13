import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Direct selector to the Dashboard Page state domain
 */
const selectDashboardPageDomain = () => state => state.dashboardPage;
const selectFormDomain = () => state => state.form;
/**
 * Default selector used by Dashboard Page
 */

const selectDashboardPage = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate
);

const selectFilterFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'dashboardFilters.values', {})
);

const selectStudies = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.studies
);

const selectTaggedIndicationsForStudy = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.taggedIndicationsForStudy
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

const selectAllClientUsers = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.allClientUsers
);

const selectAllCustomNotificationEmails = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.allCustomNotificationEmails
);

const selectLandingPageUpdateProcess = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.updateLandingPageProcess
);

const selectFacebookLandingPageUpdateProcess = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.updateFacebookLandingPageProcess
);

const selectChangeStudyAddProcess = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.changeStudyAddProcess
);

const selectUpdatedStudyAd = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.updatedStudyAd
);

const selectRemovedStudyAdId = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.removedStudyAdId
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

const selectDashboardCampaigns = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate.campaigns
);

const selectDashboardEditCampaignProcess = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate.editCampaignProcess
);

const selectDashboardDeleteCampaignProcess = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate.deleteCampaignProcess
);

const selectDashboardfive9List = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate.five9List
);

const selectStudyLeadSources = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate.studyLeadSources
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
  selectAllClientUsers,
  selectAllCustomNotificationEmails,
  selectThankYouPageUpdateProcess,
  selectUpdatePatientThankYouEmailProcess,
  selectLandingPageUpdateProcess,
  selectChangeStudyAddProcess,
  selectMessagingNumbers,
  selectUpdatedStudyAd,
  selectRemovedStudyAdId,
  selectHoverRowIndex,
  selectTaggedIndicationsForStudy,
  selectDashboardCampaigns,
  selectDashboardEditCampaignProcess,
  selectDashboardDeleteCampaignProcess,
  selectDashboardfive9List,
  selectFacebookLandingPageUpdateProcess,
  selectStudyLeadSources,
};
