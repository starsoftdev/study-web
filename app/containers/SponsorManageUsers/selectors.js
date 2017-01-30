import { createSelector } from 'reselect';

/**
 * Direct selector to the sponsorManageUsers state domain
 */
const selectSponsorManageUsersDomain = () => state => state.sponsorManageUsersPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by SponsorManageUsers
 */

const selectSponsorManageUsers = () => createSelector(
  selectSponsorManageUsersDomain(),
  (substate) => substate
);

export default selectSponsorManageUsers;
export {
  selectSponsorManageUsersDomain,
};
