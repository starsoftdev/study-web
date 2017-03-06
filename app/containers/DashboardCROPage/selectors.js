import { createSelector } from 'reselect';
import { get } from 'lodash';
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

const selectFormDomain = () => state => state.form;

const selectDashboardCROPage = () => createSelector(
  selectDashboardCROPageDomain(),
  (substate) => substate
);

const selectDashboardCro = () => createSelector(
  selectDashboardCROPageDomain(),
  (substate) => substate.cro
);

const selectDashboardEditCroProcess = () => createSelector(
  selectDashboardCROPageDomain(),
  (substate) => substate.editCroProcess
);

const selectDashboardCroSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardCROForm.values', {})
);

const selectPaginationOptions = () => createSelector(
  selectDashboardCROPageDomain(),
  (substate) => substate.paginationOptions
);

export default selectDashboardCROPage;
export {
  selectDashboardCROPageDomain,
  selectDashboardCro,
  selectDashboardEditCroProcess,
  selectDashboardCroSearchFormValues,
  selectPaginationOptions,
};
