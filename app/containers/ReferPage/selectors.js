import { createSelector } from 'reselect';

/**
 * Direct selector to the referPage state domain
 */
const selectReferPageDomain = () => state => state.referPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by ReferPage
 */

const selectReferPage = () => createSelector(
  selectReferPageDomain(),
  (substate) => substate
);

const selectCompanyTypes = () => createSelector(
  selectReferPageDomain(),
  (substate) => substate.companyTypes
);


export default selectReferPage;
export {
  selectReferPageDomain,
  selectCompanyTypes,
};
