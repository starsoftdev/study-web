import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboardIndicationPage state domain
 */
const selectDashboardIndicationPageDomain = () => state => state.dashboardIndicationPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardIndicationPage
 */

const selectDashboardIndicationPage = () => createSelector(
  selectDashboardIndicationPageDomain(),
  (substate) => substate
);

export default selectDashboardIndicationPage;
export {
  selectDashboardIndicationPageDomain,
};
