import { createSelector } from 'reselect';

const selectAdminReportsDomain = () => state => state.adminReportsPage;

const selectAdminReportsPage = () => createSelector(
  selectAdminReportsDomain(),
  substate => substate
);

const selectCampaignsStats = () => createSelector(
  selectAdminReportsPage(),
  (substate) => substate.campaigns
);

const selectCampaignsPaginationOptions = () => createSelector(
  selectAdminReportsPage(),
  (substate) => substate.campaignsPaginationOptions
);

const selectActiveReportTab = () => createSelector(
  selectAdminReportsPage(),
  (substate) => substate.activeReportTab
);


export default selectAdminReportsPage;
export {
  selectCampaignsStats,
  selectCampaignsPaginationOptions,
  selectActiveReportTab,
};
