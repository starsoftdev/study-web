import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Direct selector to the dashboardCROPage state domain
 */
const selectDashboardExposureLevelPageDomain = () => state => state.dashboardExposureLevelPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardCROPage
 */

const selectFormDomain = () => state => state.form;

const selectDashboardExposureLevelPage = () => createSelector(
  selectDashboardExposureLevelPageDomain(),
  (substate) => substate
);

const selectDashboardLevel = () => createSelector(
  selectDashboardExposureLevelPageDomain(),
  (substate) => substate.level
);

const selectDashboardEditLevelProcess = () => createSelector(
  selectDashboardExposureLevelPageDomain(),
  (substate) => substate.editLevelProcess
);

const selectDashboardLevelSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardExposureLevelForm.values', {})
);

const selectPaginationOptions = () => createSelector(
  selectDashboardExposureLevelPageDomain(),
  (substate) => substate.paginationOptions
);

export default selectDashboardExposureLevelPage;
export {
  selectDashboardExposureLevelPageDomain,
  selectDashboardLevel,
  selectDashboardEditLevelProcess,
  selectDashboardLevelSearchFormValues,
  selectPaginationOptions,
};
