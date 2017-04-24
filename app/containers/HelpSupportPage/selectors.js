import { createSelector } from 'reselect';
import { map } from 'lodash';
/**
 * Direct selector to the helpSupportPage state domain
 */
const selectHelpSupportPageDomain = () => state => state.helpSupportPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by HelpSupportPage
 */

const selectHelpSupportPage = () => createSelector(
  selectHelpSupportPageDomain(),
  (substate) => substate
);

const selectCompanyTypes = () => createSelector(
  selectHelpSupportPageDomain(),
  (substate) => {
    const companyTypes = substate.companyTypes;
    return map(companyTypes, e => (
      {
        id: `${e}`,
        label: `${e}`,
        type: e,
      }
    ));
  }
);


export default selectHelpSupportPage;
export {
  selectHelpSupportPageDomain,
  selectCompanyTypes,
};
