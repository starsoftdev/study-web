import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the dashboardClientAdminsPage state domain
 */
const selectDashboardClientAdminsPageDomain = () => state => state.dashboardClientAdminsPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardClientAdminsPage
 */

const selectDashboardClientAdminsPage = () => createSelector(
  selectDashboardClientAdminsPageDomain(),
  (substate) => substate
);

const selectDashboardClientAdmins = () => createSelector(
  selectDashboardClientAdminsPage(),
  (substate) => substate.clientAdmins
);

const selectDashboardEditUserProcess = () => createSelector(
  selectDashboardClientAdminsPage(),
  (substate) => substate.editUserProcess
);

const selectPaginationOptions = () => createSelector(
  selectDashboardClientAdminsPage(),
  substate => substate.paginationOptions
);

const selectFormDomain = () => state => state.form;

const selectDashboardClientAdminSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardClientAdminSearchForm.values', {})
);

const selectDashboardClientAdminsUsersByRoles = () => createSelector(
  selectDashboardClientAdminsPage(),
  (substate) => substate.usersByRoles
);

export default selectDashboardClientAdminsPage;
export {
  selectDashboardClientAdminsPageDomain,
  selectDashboardClientAdmins,
  selectDashboardEditUserProcess,
  selectPaginationOptions,
  selectDashboardClientAdminSearchFormValues,
  selectDashboardClientAdminsUsersByRoles,
};
