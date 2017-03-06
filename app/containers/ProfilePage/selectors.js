import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the profilePage state domain
 */
const selectProfilePageDomain = () => state => state.profilePage;

const selectFormDomain = () => state => state.form;

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfilePage
 */

const selectProfilePage = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate
);

const selectChangePasswordResult = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.changePasswordResult
);

const selectOtherUser = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.otherUser
);

const selectProfileFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'profile.values', {})
);

export default selectProfilePage;
export {
  selectProfilePageDomain,
  selectChangePasswordResult,
  selectProfilePage,
  selectOtherUser,
  selectProfileFormValues,
};
