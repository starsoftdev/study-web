import { createSelector } from 'reselect';

/**
 * Direct selector to the searchByProtocolPage state domain
 */
const selectSearchByProtocolPageDomain = () => state => state.searchByProtocolPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchByProtocolPage
 */

const selectSearchByProtocolPage = () => createSelector(
  selectSearchByProtocolPageDomain(),
  (substate) => substate
);

export default selectSearchByProtocolPage;
export {
  selectSearchByProtocolPageDomain,
};
