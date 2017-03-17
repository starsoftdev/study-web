import { createSelector } from 'reselect';
import { get } from 'lodash';

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

const selectManageSponsorUsersData = () => createSelector(
  selectSponsorManageUsersDomain(),
  substate => substate.manageSponsorUsersData
);

const selectFormDomain = () => state => state.form;

const selectEditSponsorUserFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'editSponsorUserForm.values', {})
);

const selectSearchSponsorsFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'searchSponsorManageUsers.values', {})
);

const selectEditProtocolFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'editProtocolForm.values', {})
);

const selectEditUserProcess = () => createSelector(
  selectSponsorManageUsersDomain(),
  substate => substate.editUserProcess
);

const selectEditProtocolProcess = () => createSelector(
  selectSponsorManageUsersDomain(),
  substate => substate.editProtocolProcess
);

const selectDeleteUserProcess = () => createSelector(
  selectSponsorManageUsersDomain(),
  substate => substate.deleteUserProcess
);

const selectPaginationOptionsAdmin = () => createSelector(
  selectSponsorManageUsersDomain(),
  substate => substate.paginationOptionsAdmin
);

const selectPaginationOptionsProtocols = () => createSelector(
  selectSponsorManageUsersDomain(),
  substate => substate.paginationOptionsProtocols
);

export default selectSponsorManageUsers;
export {
  selectSponsorManageUsersDomain,
  selectManageSponsorUsersData,
  selectEditSponsorUserFormValues,
  selectEditUserProcess,
  selectDeleteUserProcess,
  selectPaginationOptionsAdmin,
  selectPaginationOptionsProtocols,
  selectSearchSponsorsFormValues,
  selectEditProtocolFormValues,
  selectEditProtocolProcess,
};
