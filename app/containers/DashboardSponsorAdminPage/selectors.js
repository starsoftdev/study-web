import { createSelector } from 'reselect';
import { get } from 'lodash';
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

const selectDashboardSponsorAdminsUsersByRoles = () => createSelector(
  selectDashboardSponsorAdminPage(),
  (substate) => substate.usersByRoles
);

const selectDashboardEditUserProcess = () => createSelector(
  selectDashboardSponsorAdminPage(),
  (substate) => substate.editUserProcess
);

const selectPaginationOptions = () => createSelector(
  selectDashboardSponsorAdminPage(),
  substate => substate.paginationOptions
);

const selectFormDomain = () => state => state.form;

const selectDashboardSponsorAdminSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardSponsorAdminSearchForm.values', {})
);

export default selectDashboardSponsorAdminPage;
export {
  selectDashboardSponsorAdminPageDomain,
  selectDashboardSponsorAdminsSponsors,
  selectDashboardSponsorAdminsSponsorsWithoutAdmin,
  selectDashboardSponsorAdminsUsersByRoles,
  selectDashboardEditUserProcess,
  selectPaginationOptions,
  selectDashboardSponsorAdminSearchFormValues,
};
