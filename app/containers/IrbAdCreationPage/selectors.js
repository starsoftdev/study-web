import { createSelector } from 'reselect';

/**
 * Direct selector to the irbAdCreationPage state domain
 */
const selectIrbAdCreationPageDomain = () => state => state.irbAdCreationPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by IrbAdCreationPage
 */

const selectIrbAdCreationPage = () => createSelector(
  selectIrbAdCreationPageDomain(),
  (substate) => substate
);

export default selectIrbAdCreationPage;
export {
  selectIrbAdCreationPageDomain,
};
