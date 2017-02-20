import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboardSponsorPage state domain
 */
const selectDashboardSponsorPageDomain = () => state => state.dashboardSponsorPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardSponsorPage
 */

const selectDashboardSponsorPage = () => createSelector(
  selectDashboardSponsorPageDomain(),
  (substate) => substate
);

export default selectDashboardSponsorPage;
export {
  selectDashboardSponsorPageDomain,
};
