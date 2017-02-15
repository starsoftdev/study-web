import { createSelector } from 'reselect';

/**
 * Direct selector to the projectAgreementsPage state domain
 */
const selectProjectAgreementsPageDomain = () => state => state.projectAgreementsPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProjectAgreementsPage
 */

const selectProjectAgreementsPage = () => createSelector(
  selectProjectAgreementsPageDomain(),
  (substate) => substate
);

export default selectProjectAgreementsPage;
export {
  selectProjectAgreementsPageDomain,
};
