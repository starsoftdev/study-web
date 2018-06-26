import { createSelector } from 'reselect';
import { get } from 'lodash';

const selectAdminHomeDomain = () => state => state.adminHomePage;
const selectFormDomain = () => state => state.form;

const selectAdminHomePage = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate
);

const selectFilterFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'adminDashboardFilters.values', {})
);

const selectStudies = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate.studies
);

const selectTotals = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate.totals
);

const selectCustomFilters = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate.customFilters
);

const selectPaginationOptions = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate.paginationOptions
);

export default selectAdminHomePage;
export {
  selectFilterFormValues,
  selectStudies,
  selectTotals,
  selectCustomFilters,
  selectPaginationOptions,
};
