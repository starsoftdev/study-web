import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Direct selector to the dashboardLockedUsers state domain
 */
const selectDashboardLockedUsersDomain = () => state => state.dashboardLockedUsersPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardLockedUsers
 */

const selectFormDomain = () => state => state.form;

const selectDashboardLockedUsers = () => createSelector(
  selectDashboardLockedUsersDomain(),
  (substate) => substate
);

const selectLockedUsers = () => createSelector(
  selectDashboardLockedUsers(),
  (substate) => substate.lockedUsers
);

const selectUnlockUserProcess = () => createSelector(
  selectDashboardLockedUsers(),
  (substate) => substate.unlockUserProcess
);


const selectDashboardLockedUsersSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardLockedUsersSearchForm.values', {})
);

const selectPaginationOptions = () => createSelector(
  selectDashboardLockedUsers(),
  substate => substate.paginationOptions
);

export default selectDashboardLockedUsers;
export {
  selectDashboardLockedUsersDomain,
  selectLockedUsers,
  selectUnlockUserProcess,
  selectDashboardLockedUsersSearchFormValues,
  selectPaginationOptions,
};
