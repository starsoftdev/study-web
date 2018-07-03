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
