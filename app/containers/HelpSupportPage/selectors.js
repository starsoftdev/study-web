import { createSelector } from 'reselect';
/**
 * Direct selector to the helpAndSupportPage state domain
 */
const selectHelpAndSupportPageDomain = () => state => state.helpAndSupportPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by HelpAndSupportPage
 */

const selectHelpAndSupportPage = () => createSelector(
  selectHelpAndSupportPageDomain(),
  (substate) => substate
);

export default selectHelpAndSupportPage;
export {
  selectHelpAndSupportPageDomain,
};
