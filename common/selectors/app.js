import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the app state domain
 */
const selectGlobal = () => state => state.global;

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (substate) => substate.userData
);

// sites and users
const selectSites = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.sites.details', [])
);

export {
  selectGlobal,
  selectCurrentUser,
  selectSites,
};
