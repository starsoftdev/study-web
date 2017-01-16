import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Direct selector to the patientDatabasePage state domain
 */
const selectDashboardPageDomain = () => state => state.dashboardPage;
const selectFormDomain = () => state => state.form;
/**
 * Default selector used by PatientDatabasePage
 */

const selectDashboardPage = () => createSelector(
  selectDashboardPageDomain(),
  (substate) => substate
);

const selectFilterFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'dashboardFilters.values', {})
);

const selectStudies = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.studies
);

const selectPaginationOptions = () => createSelector(
  selectDashboardPageDomain(),
  substate => substate.paginationOptions
);

export default selectDashboardPage;
export {
  selectDashboardPageDomain,
  selectStudies,
  selectFilterFormValues,
  selectPaginationOptions,
};
