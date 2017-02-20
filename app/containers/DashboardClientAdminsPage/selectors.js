import { createSelector } from 'reselect';

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

export default selectDashboardClientAdminsPage;
export {
  selectDashboardClientAdminsPageDomain,
};
