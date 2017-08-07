import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * SearchStudiesForm -> all values
 */
const selectGlobalPMSFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'globalPMS.values', {})
);

/**
 * SearchStudiesForm -> checking validation error
 */
const selectGlobalPMSFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'globalPMS.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export default selectFormDomain;
export {
  selectGlobalPMSFormValues,
  selectGlobalPMSFormError,
};
