import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * SearchProtocolsForm -> all values
 */
const selectSearchProtocolsFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'searchProtocols.values', {})
);

/**
 * SearchProtocolsForm -> checking validation error
 */
const selectSearchProtocolsFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'searchProtocols.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export default selectFormDomain;
export {
  selectSearchProtocolsFormValues,
  selectSearchProtocolsFormError,
};
