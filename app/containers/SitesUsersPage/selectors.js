import { findIndex } from 'lodash';
import { createSelector } from 'reselect';

/**
 * Direct selector to the sitesUsersPage state domain
 */
const selectSitesUsersPageDomain = () => state => state.sitesUsersPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by SitesUsersPage
 */

const selectSitesUsersPage = () => createSelector(
  selectSitesUsersPageDomain(),
  (substate) => substate
);

const selectClientSites = () => createSelector(
  selectSitesUsersPageDomain(),
  (substate) => substate.clientSites
);

const selectClientRoles = () => createSelector(
  selectSitesUsersPageDomain(),
  (substate) => substate.clientRoles
);

const selectSelectedSite = () => createSelector(
  selectSitesUsersPageDomain(),
  (substate) => substate.selectedSite
);

const selectSelectedSiteDetailsForForm = () => createSelector(
  selectSitesUsersPageDomain(),
  (substate) => substate.selectedSite.details
);

const selectSelectedUser = () => createSelector(
  selectSitesUsersPageDomain(),
  (substate) => substate.selectedUser
);

const selectSelectedUserDetailsForForm = () => createSelector(
  selectSitesUsersPageDomain(),
  (substate) => {
    const selectedUserInput = {};
    const selectedUserDetails = substate.selectedUser.details;
    const clientSitesDetails = substate.clientSites.details;

    if (selectedUserDetails) {
      selectedUserInput.firstName = selectedUserDetails.firstName;
      selectedUserInput.lastName = selectedUserDetails.lastName;
      selectedUserInput.email = selectedUserDetails.email;

      if (!selectedUserDetails.roleForClient) {
        const foundSiteIndex = findIndex(clientSitesDetails, (siteIterator) => (findIndex(siteIterator.users, { id: selectedUserDetails.id }) > -1));
        if (foundSiteIndex > -1) {
          selectedUserInput.site = clientSitesDetails[foundSiteIndex].id.toString();
        } else {
          selectedUserInput.site = null;
        }
      } else {
        selectedUserInput.site = '0';
        selectedUserInput.purchase = selectedUserDetails.roleForClient.purchase;
        selectedUserInput.reward = selectedUserDetails.roleForClient.reward;
      }
    }

    return selectedUserInput;
  }
);

const selectDeletedUser = () => createSelector(
  selectSitesUsersPageDomain(),
  (substate) => substate.deletedUser
);

const selectDeletedClientRole = () => createSelector(
  selectSitesUsersPageDomain(),
  (substate) => substate.deletedClientRole
);

const selectSavedSite = () => createSelector(
  selectSitesUsersPageDomain(),
  (substate) => substate.savedSite
);

const selectSavedUser = () => createSelector(
  selectSitesUsersPageDomain(),
  (substate) => substate.savedUser
);

export default selectSitesUsersPage;
export {
  selectSitesUsersPageDomain,
  selectClientSites,
  selectClientRoles,
  selectSelectedSite,
  selectSelectedSiteDetailsForForm,
  selectSelectedUser,
  selectSelectedUserDetailsForForm,
  selectDeletedUser,
  selectDeletedClientRole,
  selectSavedSite,
  selectSavedUser,
};
