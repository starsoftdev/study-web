import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * ReferForm -> all values
 */
const selectReferFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'refer.values', {})
);

/**
 * ReferForm -> checking validation error
 */
const selectReferFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'refer.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export {
  selectReferFormValues,
  selectReferFormError,
};
