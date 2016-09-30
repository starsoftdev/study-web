import { createSelector } from 'reselect';

const selectHomePageDomain = (state) => state.homePage;

const selectPatientSignUps = createSelector(
  selectHomePageDomain,
  (substate) => substate.patientSignUps,
);

const selectPatientMessages = createSelector(
  selectHomePageDomain,
  (substate) => substate.patientMessages,
);

const selectRewardsPoint = createSelector(
  selectHomePageDomain,
  (substate) => substate.rewardsPoint,
);

export {
  selectHomePageDomain,
  selectPatientSignUps,
  selectPatientMessages,
  selectRewardsPoint,
};
