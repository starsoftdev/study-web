import { createSelector } from 'reselect';
import { get } from 'lodash';

const selectAdminHomeDomain = () => state => state;
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

export default selectAdminHomePage;
export {
  selectFilterFormValues,
  selectStudies,
};
