import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Direct selector to the dashboardManageUsers state domain
 */
const selectDashboardManageUsersDomain = () => state => state.dashboardManageUsersPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardManageUsers
 */

const selectFormDomain = () => state => state.form;

const selectDashboardManageUsers = () => createSelector(
  selectDashboardManageUsersDomain(),
  (substate) => substate
);

const selectDashboardAdmins = () => createSelector(
  selectDashboardManageUsers(),
  (substate) => substate.admins
);

const selectDashboardRoles = () => createSelector(
  selectDashboardManageUsers(),
  (substate) => substate.roles
);

const selectDashboardEditUserProcess = () => createSelector(
  selectDashboardManageUsers(),
  (substate) => substate.editUserProcess
);

const selectDashboardManageUsersSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardManageUsersSearchForm.values', {})
);

const selectPaginationOptions = () => createSelector(
  selectDashboardManageUsers(),
  substate => substate.paginationOptions
);

export default selectDashboardManageUsers;
export {
  selectDashboardManageUsersDomain,
  selectDashboardAdmins,
  selectDashboardEditUserProcess,
  selectDashboardRoles,
  selectDashboardManageUsersSearchFormValues,
  selectPaginationOptions,
};
