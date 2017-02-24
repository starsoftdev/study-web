import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboardCROPage state domain
 */
const selectDashboardCROPageDomain = () => state => state.dashboardCROPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardCROPage
 */

const selectDashboardCROPage = () => createSelector(
  selectDashboardCROPageDomain(),
  (substate) => substate
);

export default selectDashboardCROPage;
export {
  selectDashboardCROPageDomain,
};
