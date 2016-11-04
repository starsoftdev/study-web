import { createSelector } from 'reselect';

const selectHomePageDomain = () => state => state.homePage;

const selectHomePage = () => createSelector(
  selectHomePageDomain(),
  substate => substate
);

const selectPatientSignUps = () => createSelector(
  selectHomePageDomain(),
  substate => substate.patientSignUps
);

const selectPatientMessages = () => createSelector(
  selectHomePageDomain(),
  substate => substate.patientMessages
);

const selectRewardsPoint = () => createSelector(
  selectHomePageDomain(),
  substate => substate.rewardsPoint
);

const selectStudies = () => createSelector(
  selectHomePageDomain(),
  substate => substate.studies
);

const selectSelectedLevelPrice = () => createSelector(
  selectHomePageDomain(),
  substate => substate.selectedLevelPrice
);

export default selectHomePage;
export {
  selectHomePageDomain,
  selectPatientSignUps,
  selectPatientMessages,
  selectRewardsPoint,
  selectStudies,
  selectSelectedLevelPrice,
};
