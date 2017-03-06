import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboardSponsorAdminPage state domain
 */
const selectDashboardSponsorAdminPageDomain = () => state => state.dashboardSponsorAdminPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardSponsorAdminPage
 */

const selectDashboardSponsorAdminPage = () => createSelector(
  selectDashboardSponsorAdminPageDomain(),
  (substate) => substate
);

export default selectDashboardSponsorAdminPage;
export {
  selectDashboardSponsorAdminPageDomain,
};
