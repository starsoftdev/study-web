import { createSelector } from 'reselect';

/**
 * Direct selector to the proposals state domain
 */
const selectProposalsDomain = () => state => state.proposals;

/**
 * Other specific selectors
 */


/**
 * Default selector used by Proposals
 */

const selectProposals = () => createSelector(
  selectProposalsDomain(),
  (substate) => substate
);

const selectProposalsList = () => createSelector(
  selectProposalsDomain(),
  (substate) => substate.proposalsList
);

const selectProposalsStatus = () => createSelector(
  selectProposalsDomain(),
  (substate) => substate.proposalsFetching
);

const selectPaginationOptions = () => createSelector(
  selectProposalsDomain(),
  (substate) => substate.paginationOptions
);

export default selectProposals;
export {
  selectProposalsDomain,
  selectProposals,
  selectProposalsList,
  selectProposalsStatus,
  selectPaginationOptions,
};
