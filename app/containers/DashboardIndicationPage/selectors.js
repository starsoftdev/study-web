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

const selectIndications = () => createSelector(
  selectDashboardIndicationPageDomain(),
  (substate) => substate.indications
);

export default selectDashboardIndicationPage;
export {
  selectDashboardIndicationPageDomain,
  selectIndications,
};
