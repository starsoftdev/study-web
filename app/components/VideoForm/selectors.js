import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * VideoForm -> all values
 */
const selectVideoFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'video.values', {})
);

/**
 * VideoForm -> checking validation error
 */
const selectVideoFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'video.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export {
  selectVideoFormValues,
  selectVideoFormError,
};
