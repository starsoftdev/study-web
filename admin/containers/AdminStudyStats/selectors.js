import { createSelector } from 'reselect';

const selectAdminStudyStatsDomain = () => state => state.AdminStudyStatsPage;

const selectAdminStudyStatsPage = () => createSelector(
  selectAdminStudyStatsDomain(),
  substate => substate
);

const selectStudyInfo = () => createSelector(
  selectAdminStudyStatsDomain(),
  substate => substate.studyInfo
);

const selectStudyCampaigns = () => createSelector(
  selectAdminStudyStatsDomain(),
  substate => substate.studyCampaigns
);

export default selectAdminStudyStatsPage;
export {
  selectStudyInfo,
  selectStudyCampaigns,
};
