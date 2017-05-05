import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * HelpAndSupportForm -> all values
 */
const selectHelpAndSupportFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'helpAndSupport.values', {})
);

/**
 * HelpAndSupportForm -> checking validation error
 */
const selectHelpAndSupportFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'helpAndSupport.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export {
  selectHelpAndSupportFormValues,
  selectHelpAndSupportFormError,
};
