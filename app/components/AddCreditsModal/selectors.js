import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * UpgradeStudyForm -> all values
 */
const selectAddCreditsFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'addCredits.values', {})
);

/**
 * AddCreditsForm -> checking validation error
 */
const selectAddCreditsFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'addCredits.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export default selectFormDomain;
export {
  selectAddCreditsFormValues,
  selectAddCreditsFormError,
};
