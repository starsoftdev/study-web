import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * EditPatientForm -> all values
 */
const selectFilterFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'dashboardFilters.values', {})
);

export default selectFormDomain;
export {
  selectFilterFormValues,
};
