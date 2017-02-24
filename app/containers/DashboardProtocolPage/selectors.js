import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboardProtocolPage state domain
 */
const selectDashboardProtocolPageDomain = () => state => state.dashboardProtocolPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardProtocolPage
 */

const selectDashboardProtocolPage = () => createSelector(
  selectDashboardProtocolPageDomain(),
  (substate) => substate
);

export default selectDashboardProtocolPage;
export {
  selectDashboardProtocolPageDomain,
};
