import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * HelpSupportForm -> all values
 */
const selectHelpSupportFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'helpSupport.values', {})
);

/**
 * HelpSupportForm -> checking validation error
 */
const selectHelpSupportFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'helpSupport.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export {
  selectHelpSupportFormValues,
  selectHelpSupportFormError,
};
