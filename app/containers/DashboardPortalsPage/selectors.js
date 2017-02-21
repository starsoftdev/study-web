import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboardPortalsPage state domain
 */
const selectDashboardPortalsPageDomain = () => state => state.dashboardPortalsPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardPortalsPage
 */

const selectDashboardPortalsPage = () => createSelector(
  selectDashboardPortalsPageDomain(),
  (substate) => substate
);

export default selectDashboardPortalsPage;
export {
  selectDashboardPortalsPageDomain,
};
