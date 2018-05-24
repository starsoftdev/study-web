import { createSelector } from 'reselect';
import { get, map, pick, filter } from 'lodash';
import moment from 'moment';
import { translate } from '../../../common/utilities/localization';

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

const selectCurrentUserEmail = () => createSelector(
  selectGlobal(),
  (substate) => substate.userData.email
);

const selectCurrentUserFullName = () => createSelector(
  selectGlobal(),
  (substate) => `${substate.userData.firstName} ${substate.userData.lastName}`
);

const selectCurrentUserId = () => createSelector(
  selectGlobal(),
  (substate) => substate.userData.id
);

const selectLoginError = () => createSelector(
  selectGlobal(),
  (substate) => substate.loginError
);

const selectLoginFormSubmitState = () => createSelector(
  selectGlobal(),
  (substate) => substate.submittingLoginForm
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

const selectValidSiteLocations = () => createSelector(
  selectGlobal(),
  (substate) => {
    const sites = get(substate, 'baseData.sites', []);
    return sites.filter(site =>
      (
        site.campaigns.filter(campaign =>
          (
            moment(campaign.dateFrom) < moment() && moment() < moment(campaign.dateTo)
          )).length > 0
      )).map(site => {
      const recentCampaign = site.campaigns.filter(campaign =>
        (
          moment(campaign.dateFrom) < moment() && moment() < moment(campaign.dateTo)
        )).sort((a, b) => {
        if (moment(a.dateFrom) > moment(b.dateFrom)) {
          return 1;
        } else if (moment(a.dateFrom) === moment(b.dateFrom)) {
          return 0;
        }
        return -1;
      })[0];
      return {
        site: {
          value: site.id,
          label: site.name,
        },
        study_id: recentCampaign.study_id,
        campaign_id: recentCampaign.id,
      };
    });
  }
);

const selectIndications = () => createSelector(
  selectGlobal(),
  (substate) => {
    const indications = get(substate, 'baseData.indications', []);
    return indications.map(e => ({ ...e, originalName: e.name, name: translate(`common.indication.id${e.id}`) }));
  }
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
        label: `${translate(`common.exposureLevel.id${e.id}`)} $${e.price} (${e.posts}
          ${translate('portals.component.renewStudyForm.posts')} +
          ${e.texts} ${translate('portals.component.renewStudyForm.textCredits')} +
          ${e.emailCredits} ${translate('portals.component.renewStudyForm.emailCredits')})`,
        type: e.name,
        stripeProductId: e.stripe_product_id,
        isTop: e.isTop,
        name: e.name,
        price: e.price,
        posts: e.posts,
        texts: e.texts,
        emailCredits: e.emailCredits,
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
const selectSites = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.sites.details', [])
);

// get user's sites based on siteId and ClientId
const selectUserSites = () => createSelector(
  selectGlobal(),
  (substate) => {
    const currentUser = get(substate, 'userData');
    if (currentUser.roleForClient) {
      const siteId = currentUser.roleForClient.site_id;
      let sites = get(substate, 'baseData.sites.details', []);
      if (siteId) {
        sites = filter(sites, e => e.id === siteId);
      } else {
        const clientId = get(substate, 'userData.roleForClient.client.id', null);
        if (clientId) {
          sites = get(substate, 'baseData.sites.details', []);
        }
      }
      return sites;
    }
    return [];
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
      userSites = sites.details.filter(e => e.id === siteId);
    } else {
      const clientId = get(substate, 'userData.roleForClient.client.id', null);
      if (clientId) {
        userSites = get(substate, 'baseData.sites.details', {});
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
    const sites = get(substate, 'baseData.sites.details', []);
    return map(sites, e => pick(e, ['id', 'name']));
  }
);

const selectClientSites = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.sites', {})
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

const selectPatientCategories = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.patientCategories', [])
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

    if (selectedUserDetails) {
      selectedUserInput.firstName = selectedUserDetails.firstName;
      selectedUserInput.lastName = selectedUserDetails.lastName;
      selectedUserInput.email = selectedUserDetails.email;

      if (selectedUserDetails.roleForClient.site_id) {
        selectedUserInput.site = selectedUserDetails.roleForClient.site_id.toString();
      } else {
        selectedUserInput.isAdmin = selectedUserDetails.roleForClient.isAdmin;
        selectedUserInput.purchase = selectedUserDetails.roleForClient.canPurchase;
        selectedUserInput.reward = selectedUserDetails.roleForClient.canRedeemRewards;
        selectedUserInput.site = '0';
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

const selectFormsTempTimezone = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.formsTempTimezone', '')
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

const selectStudiesFromSites = () => createSelector(
  selectGlobal(),
  (substate) => {
    const sites = get(substate, 'baseData.sites', {});
    const studies = [];
    if (sites && sites.details) {
      sites.details.forEach(site => {
        site.studies.forEach(study => {
          studies.push(study);
        });
      });
    }
    return studies;
  }
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
  (substate) => get(substate, 'baseData.trials', {})
);

const selectTrialsTotal = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.trials.total', {})
);

const selectGlobalPMSPaginationOptions = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.globalPMSPaginationOptions', {})
);

const selectCnsInfo = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.cnsInfo', {})
);

const selectCnsSubmitProcess = () => createSelector(
  selectGlobal(),
  (substate) => get(substate, 'baseData.cnsSubmitProcess', {})
);

// end

const selectLocationState = () => state => state.routing.locationBeforeTransitions;

export {
  selectGlobal,
  selectAuthState,
  selectEvents,
  selectCurrentUser,
  selectLoginError,
  selectLoginFormSubmitState,
  selectUserRoleType,
  selectCurrentUserClientId,
  selectCurrentUserEmail,
  selectCurrentUserFullName,
  selectCurrentUserId,
  selectCurrentUserStripeCustomerId,

  selectSites,
  selectSiteLocations,
  selectUserSites,
  selectUserSiteLocations,
  selectValidSiteLocations,
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
  selectPatientCategories,
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
  selectStudiesFromSites,

  selectLocationState,
  selectCreditsPrice,

  selectChangeTimezoneState,
  selectFormsTempTimezone,

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
  selectTrialsTotal,
  selectGlobalPMSPaginationOptions,
  selectCnsInfo,
  selectCnsSubmitProcess,
};
