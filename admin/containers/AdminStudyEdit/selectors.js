import { createSelector } from 'reselect';
import { get } from 'lodash';

const selectAdminStudyEditDomain = () => state => state.AdminStudyEditPage;
const selectFormDomain = () => state => state.form;
const selectDashboardPageDomain = () => state => state.dashboardPage;


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
};


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

const selectLevels = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.levels
);

const selectDashboardfive9List = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate.five9List
);

export {
  selectDashboardCampaigns,
  selectDashboardEditCampaignProcess,
  selectDashboardDeleteCampaignProcess,
  selectLevels,
  selectDashboardfive9List,
};
