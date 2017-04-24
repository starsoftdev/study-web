import { createSelector } from 'reselect';
import { map } from 'lodash';
/**
 * Direct selector to the videoPage state domain
 */
const selectVideoPageDomain = () => state => state.videoPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by VideoPage
 */

const selectVideoPage = () => createSelector(
  selectVideoPageDomain(),
  (substate) => substate
);

const selectCompanyTypes = () => createSelector(
  selectVideoPageDomain(),
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


export default selectVideoPage;
export {
  selectVideoPageDomain,
  selectCompanyTypes,
};
