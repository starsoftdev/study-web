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

export default selectReceipts;
export {
  selectReceiptsDomain,
};
