import { createSelector } from 'reselect';

/**
 * Direct selector to the callCenterHomePage state domain
 */
const selectCallCenterHomePageDomain = () => state => state.callCenterHomePage;

export const selectFetchedPatients = () => createSelector(
  selectCallCenterHomePageDomain(),
  (substate) => substate.fetchedPatients
);
