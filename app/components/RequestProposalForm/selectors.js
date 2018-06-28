import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * RequestProposalForm -> all values
 */
const selectProposalFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'requestProposal.values', {})
);

/**
 * RequestProposalForm -> checking validation error
 */
const selectProposalFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'requestProposal.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

/**
 * RequestProposalForm -> `mediaTracking`
 */
const selectCallTracking = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'requestProposal.values.mediaTracking')
);

/**
 * RequestProposalForm -> count of `mediaTypes`
 */
const selectLeadsCount = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const mediaTypes = get(substate, 'requestProposal.values.mediaType', []);
    return mediaTypes.length;
  }
);

export default selectFormDomain;
export {
  selectProposalFormValues,
  selectProposalFormError,
  selectCallTracking,
  selectLeadsCount,
};
