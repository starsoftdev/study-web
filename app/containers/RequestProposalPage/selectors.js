import { createSelector } from 'reselect';
import { get, map } from 'lodash';

/**
 * Direct selector to the requestProposalPage state domain
 */
const selectRequestProposalPageDomain = () => state => state.requestProposalPage;

const selectFormDomain = () => state => state.form;
/**
 * Other specific selectors
 */


/**
 * Default selector used by RequestProposalPage
 */

const selectRequestProposalPage = () => createSelector(
  selectRequestProposalPageDomain(),
  (substate) => substate
);

const selectFormSubmissionStatus = () => createSelector(
  selectRequestProposalPageDomain(),
  (substate) => substate.formSubmissionStatus
);

const selectCoupon = () => createSelector(
  selectRequestProposalPageDomain(),
  (substate) => substate.coupon
);

const selectProposalDetail = () => createSelector(
  selectRequestProposalPageDomain(),
  (substate) => substate.proposalDetail,
);

const selectProposalsFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'requestProposal.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

const selectProposalsFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'requestProposal.values', {})
);

const selectRegisteredFields = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const regFieldsArr = get(substate, 'requestProposal.registeredFields', []);
    return map(regFieldsArr, (item) => {
      return item.name;
    });
  }
);

const selectIndicationLevelPrice = () => createSelector(
  selectRequestProposalPageDomain(),
  (substate) => substate.indicationLevelPrice,
);

export default selectRequestProposalPage;
export {
  selectRequestProposalPageDomain,
  selectFormSubmissionStatus,
  selectCoupon,
  selectProposalDetail,
  selectProposalsFormError,
  selectProposalsFormValues,
  selectIndicationLevelPrice,
  selectRegisteredFields,
};
