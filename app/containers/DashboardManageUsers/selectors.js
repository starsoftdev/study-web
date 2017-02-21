import { createSelector } from 'reselect';

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

const selectDashboardManageUsers = () => createSelector(
  selectDashboardManageUsersDomain(),
  (substate) => substate
);

export default selectDashboardManageUsers;
export {
  selectDashboardManageUsersDomain,
};
