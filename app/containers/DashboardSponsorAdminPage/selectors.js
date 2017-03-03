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

const selectDashboardSponsorAdminsSponsors = () => createSelector(
  selectDashboardSponsorAdminPage(),
  (substate) => substate.sponsors
);

const selectDashboardSponsorAdminsSponsorsWithoutAdmin = () => createSelector(
  selectDashboardSponsorAdminPage(),
  (substate) => substate.sponsorsWithoutAdmin
);

export default selectDashboardSponsorAdminPage;
export {
  selectDashboardSponsorAdminPageDomain,
  selectDashboardSponsorAdminsSponsors,
  selectDashboardSponsorAdminsSponsorsWithoutAdmin,
};
