import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * EditSiteForm -> all values
 */
const selectAddProtocolFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'addProtocol.values', {})
);

/**
 * EditSiteForm -> checking validation error
 */
const selectAddProtocolFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'addProtocol.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export default selectFormDomain;
export {
  selectAddProtocolFormValues,
  selectAddProtocolFormError,
};
