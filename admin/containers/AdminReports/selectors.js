import { createSelector } from 'reselect';
import { get } from 'lodash';

const selectAdminHomeDomain = () => state => state.adminHome;
const selectFormDomain = () => state => state.form;

const selectAdminHomePage = () => createSelector(
  selectAdminHomeDomain(),
  substate => substate
);

const selectFilterFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'adminReportsFilters.values', {})
);

export default selectAdminHomePage;
export {
  selectFilterFormValues,
};
