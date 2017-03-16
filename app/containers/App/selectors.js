import { createSelector } from 'reselect';
import { get, map, pick, filter, findIndex } from 'lodash';

/**
 * Direct selector to the app state domain
 */
const selectGlobal = () => state => state.global;

const selectAuthState = () => createSelector(
  selectGlobal(),
  (substate) => substate.loggedIn
);

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (substate) => substate.userData
);

const selectLoginError = () => createSelector(
  selectGlobal(),
  (substate) => substate.loginError
);

const selectUserRoleType = () => createSelector(
  selectGlobal(),
  (substate) => substate.userRoleType
);

const selectEvents = () => createSelector(
  selectGlobal(),
  (substate) => substate.pageEvents
);

const selectCurrentUserClientId = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'userData.roleForClient.client.id', null)
);

const selectCurrentUserStripeCustomerId = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'userData.roleForClient.client.stripeCustomerId', null)
);

// ///////////////////////////////////////////
// base data used across pages
// ///////////////////////////////////////////
const selectSites = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.sites', [])
);

// get user's sites based on siteId and ClientId
const selectUserSites = () => createSelector(
  selectGlobal(),
  (substate) => {
    const currentUser = get(substate, 'userData');
    const siteId = currentUser.roleForClient.site_id;
    let sites = get(substate, 'baseData.sites', []);
    if (siteId) {
      sites = filter(sites, e => e.id === siteId);
    } else {
      const clientId = get(substate, 'userData.roleForClient.client.id', null);
      if (clientId) {
        sites = get(substate, 'baseData.clientSites', {});
      }
    }
    return sites;
  }
);

// get user's site locations based on siteId and ClientId
const selectUserSiteLocations = () => createSelector(
  selectGlobal(),
  (substate) => {
    const currentUser = get(substate, 'userData');
    const siteId = currentUser.roleForClient.site_id;
    const sites = get(substate, 'baseData.sites', []);

    let userSites = [];
    if (siteId) {
      userSites = filter(sites, e => e.id === siteId);
    } else {
      const clientId = get(substate, 'userData.roleForClient.client.id', null);
      if (clientId) {
        userSites = get(substate, 'baseData.clientSites.details', {});
        userSites = [{ id: 0, name: 'All' }, ...userSites];
      }
    }
    const returnArray = map(userSites, e => pick(e, ['id', 'name']));

    return returnArray;
  }
);

// Deccorated site locations
const selectSiteLocations = () => createSelector(
  selectGlobal(),
  (substate) => {
    const sites = get(substate, 'baseData.sites', []);
    return map(sites, e => pick(e, ['id', 'name']));
  }
);

const selectIndications = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.indications', [])
);

const selectSources = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.sources', [])
);

const selectLevels = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.levels', [])
);

// Decorated study levels
const selectStudyLevels = () => createSelector(
  selectGlobal(),
  (substate) => {
    const levels = get(substate, 'baseData.levels', []);
    return map(levels, e => (
      {
        id: e.id,
        label: `${e.name}`,
        type: e.name,
        stripeProductId: e.stripe_product_id,
        isTop: e.isTop,
      }
    ));
  }
);

const selectCoupon = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.coupon', {})
);

const selectProtocols = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.protocols', {})
);

const selectRewards = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.rewards', [])
);

const selectRewardsBalance = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.rewardsBalance', [])
);

const selectCards = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.cards', {})
);

const selectSavedCard = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.savedCard', {})
);

const selectDeletedCard = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.deletedCard', {})
);

const selectAddCredits = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.addCredits', {})
);

// sites and users
const selectClientSites = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.clientSites', {})
);

const selectSitePatients = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.sitePatients', {})
);

const selectClientCredits = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.clientCredits', {})
);

const selectPatientMessages = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.patientMessages', {})
);

const selectPatientMessageUnreadCount = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.patientMessages.stats.unreadTexts', 0)
);

const selectClientRoles = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.clientRoles', {})
);

const selectSelectedSite = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.selectedSite', {})
);

const selectSelectedSiteDetailsForForm = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.selectedSite.details', {})
);

const selectSelectedUser = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.selectedUser', {})
);

const selectSelectedUserDetailsForForm = () => createSelector(
  selectGlobal(),
  (substate) => {
    const selectedUserInput = {};
    const selectedUserDetails = get(substate, 'baseData.selectedUser.details', {});
    const clientSitesDetails = get(substate, 'baseData.clientSites.details', []);

    if (selectedUserDetails) {
      selectedUserInput.firstName = selectedUserDetails.firstName;
      selectedUserInput.lastName = selectedUserDetails.lastName;
      selectedUserInput.email = selectedUserDetails.email;

      if (!selectedUserDetails.roleForClient.site) {
        const foundSiteIndex = findIndex(clientSitesDetails, (siteIterator) => (findIndex(siteIterator.users, { id: selectedUserDetails.id }) > -1));
        if (foundSiteIndex > -1) {
          selectedUserInput.site = clientSitesDetails[foundSiteIndex].id.toString();
        } else {
          selectedUserInput.site = null;
        }
      } else {
        selectedUserInput.isAdmin = selectedUserDetails.roleForClient.isAdmin;
        selectedUserInput.canPurchase = selectedUserDetails.roleForClient.canPurchase;
        selectedUserInput.canRedeemRewards = selectedUserDetails.roleForClient.canRedeemRewards;
      }
    }

    return selectedUserInput;
  }
);

const selectDeletedUser = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.deletedUser', {})
);

const selectDeletedClientRole = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.deletedClientRole', {})
);

const selectSavedSite = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.savedSite', {})
);

const selectSavedUser = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.savedUser', {})
);

const selectAvailPhoneNumbers = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.availPhoneNumbers', [])
);

const selectCreditsPrice = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.creditsPrice', {})
);

const selectChangeTimezoneState = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.changeUsersTimezoneState', {})
);

// TODO: debug this to select study instead landing
const selectLanding = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.landing.details', {})
);

const selectLandingIsFetching = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.landing.fetching', {})
);

const selectLandingError = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.landing.error', {})
);

const selectSubscribedFromLanding = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.subscribedFromLanding', {})
);

const selectSubscriptionError = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.subscriptionError', {})
);

const selectFindOutPosted = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.findOutPosted', {})
);

const selectListSiteNowSuccess = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.listSiteNowSuccess', {})
);

const selectGetProposalSuccess = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.getProposalSuccess', {})
);

const selectLearnAboutFutureTrialsSuccess = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.learnAboutFutureTrialsSuccess', {})
);

const selectNewContactSuccess = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.newContactsSuccess', {})
);

const selectTrials = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.trials.details', {})
);
// end

const selectLocationState = () => state => state.routing.locationBeforeTransitions;

export {
  selectGlobal,
  selectAuthState,
  selectEvents,
  selectCurrentUser,
  selectLoginError,
  selectUserRoleType,
  selectCurrentUserClientId,
  selectCurrentUserStripeCustomerId,

  selectSites,
  selectSiteLocations,
  selectUserSites,
  selectUserSiteLocations,
  selectIndications,
  selectSources,
  selectLevels,
  selectStudyLevels,
  selectCoupon,
  selectProtocols,
  selectRewards,
  selectRewardsBalance,
  selectCards,
  selectSavedCard,
  selectDeletedCard,
  selectAddCredits,

  selectClientSites,
  selectSitePatients,
  selectClientCredits,
  selectPatientMessages,
  selectPatientMessageUnreadCount,
  selectClientRoles,
  selectSelectedSite,
  selectSelectedSiteDetailsForForm,
  selectSelectedUser,
  selectSelectedUserDetailsForForm,
  selectDeletedUser,
  selectDeletedClientRole,
  selectSavedSite,
  selectSavedUser,
  selectAvailPhoneNumbers,

  selectLocationState,
  selectCreditsPrice,

  selectChangeTimezoneState,

  selectLanding,
  selectLandingIsFetching,
  selectLandingError,
  selectSubscribedFromLanding,
  selectSubscriptionError,
  selectFindOutPosted,
  selectListSiteNowSuccess,
  selectGetProposalSuccess,
  selectLearnAboutFutureTrialsSuccess,
  selectNewContactSuccess,

  selectTrials,
};
