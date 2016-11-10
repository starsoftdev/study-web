import { createSelector } from 'reselect';

/**
 * Direct selector to the receipts state domain
 */
const selectReceiptsDomain = () => state => state.receipts;

/**
 * Other specific selectors
 */


/**
 * Default selector used by Receipts
 */

const selectReceipts = () => createSelector(
  selectReceiptsDomain(),
  (substate) => substate
);

const selectReceiptsList = () => createSelector(
  selectReceiptsDomain(),
  (substate) => substate.receiptsList
);

const selectHasMoreItems = () => createSelector(
  selectReceiptsDomain(),
  (substate) => substate.hasMoreItems
);

export default selectReceipts;
export {
  selectReceiptsDomain,
  selectReceiptsList,
  selectHasMoreItems,
};
