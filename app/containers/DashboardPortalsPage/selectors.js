import { createSelector } from 'reselect';
import { get } from 'lodash';

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

const selectFormDomain = () => state => state.form;

const selectDashboardPortalsPage = () => createSelector(
  selectDashboardPortalsPageDomain(),
  (substate) => substate
);

const selectDashboardPortalsClients = () => createSelector(
  selectDashboardPortalsPageDomain(),
  (substate) => substate.clients
);

const selectDashboardPortalsSponsors = () => createSelector(
  selectDashboardPortalsPageDomain(),
  (substate) => substate.sponsors
);

const selectDashboardPortalsFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardPortalsForm.values', {})
);

export default selectDashboardPortalsPage;
export {
  selectDashboardPortalsPageDomain,
  selectDashboardPortalsClients,
  selectDashboardPortalsFormValues,
  selectDashboardPortalsSponsors,
};
