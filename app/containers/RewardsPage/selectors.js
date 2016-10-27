import { createSelector } from 'reselect';

/**
 * Direct selector to the RewardsPage state domain
 */
const selectRewardsPageDomain = () => state => state.RewardsPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by RewardsPage
 */

const selectRewardsPage = () => createSelector(
  selectRewardsPageDomain(),
  (substate) => substate
);

const selectSiteLocations = () => createSelector(
  selectRewardsPageDomain(),
  (substate) => substate.siteLocations
);


export default selectRewardsPage;
export {
  selectRewardsPageDomain,
  selectSiteLocations,
};
