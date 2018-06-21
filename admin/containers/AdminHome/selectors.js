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

const selectStudiesTotals = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate.totals
);

const selectStudies = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate.studies
);

const selectSources = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate.sources
);

export default selectAdminHomePage;
export {
  selectStudiesTotals,
  selectFilterFormValues,
  selectStudies,
  selectSources,
};
