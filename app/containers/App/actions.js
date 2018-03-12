import mixpanel from 'mixpanel-browser';
import {
  FETCH_ME_FROM_TOKEN,
  SET_AUTH_STATE,
  SET_USER_DATA,

  FETCH_INDICATIONS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_INDICATIONS_ERROR,

  FETCH_SOURCES,
  FETCH_SOURCES_SUCCESS,
  FETCH_SOURCES_ERROR,

  FETCH_LEVELS,
  FETCH_LEVELS_SUCCESS,
  FETCH_LEVELS_ERROR,

  FETCH_COUPON,
  FETCH_COUPON_SUCCESS,
  FETCH_COUPON_ERROR,

  CLEAR_COUPON,

  FETCH_REWARDS,
  FETCH_REWARDS_SUCCESS,
  FETCH_REWARDS_ERROR,

  FETCH_REWARDS_BALANCE,
  FETCH_REWARDS_BALANCE_SUCCESS,
  FETCH_REWARDS_BALANCE_ERROR,

  REDEEM,
  REDEEM_SUCCESS,
  REDEEM_ERROR,

  FETCH_CARDS,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,

  SAVE_CARD,
  SAVE_CARD_SUCCESS,
  SAVE_CARD_ERROR,

  DELETE_CARD,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_ERROR,

  ADD_CREDITS,
  ADD_CREDITS_SUCCESS,
  ADD_CREDITS_ERROR,
  FETCH_EVENTS,

  FETCH_CLIENT_SITES,
  FETCH_CLIENT_SITES_SUCCESS,
  FETCH_CLIENT_SITES_ERROR,

  FETCH_SITE_PATIENTS,
  FETCH_SITE_PATIENTS_SUCCESS,
  FETCH_SITE_PATIENTS_ERROR,
  UPDATE_SITE_PATIENTS,

  FETCH_PATIENT_MESSAGE_UNREAD_COUNT,
  FETCH_PATIENT_MESSAGE_UNREAD_COUNT_SUCCESS,

  FETCH_CLIENT_CREDITS,
  FETCH_CLIENT_CREDITS_SUCCESS,
  FETCH_CLIENT_CREDITS_ERROR,

  SEARCH_SITE_PATIENTS,
  SEARCH_SITE_PATIENTS_SUCCESS,
  SEARCH_SITE_PATIENTS_ERROR,

  FETCH_PATIENT_MESSAGES,
  FETCH_PATIENT_MESSAGES_SUCCESS,
  FETCH_PATIENT_MESSAGES_ERROR,
  UPDATE_PATIENT_MESSAGES,

  MARK_AS_READ_PATIENT_MESSAGES,

  FETCH_CLIENT_ROLES,
  FETCH_CLIENT_ROLES_SUCCESS,
  FETCH_CLIENT_ROLES_ERROR,

  FETCH_SITE,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_ERROR,

  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,

  CLEAR_SELECTED_SITE,
  CLEAR_SELECTED_USER,

  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,

  SAVE_SITE,
  SAVE_SITE_SUCCESS,
  SAVE_SITE_ERROR,

  SAVE_USER,
  SAVE_USER_SUCCESS,
  SAVE_USER_ERROR,

  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,

  GET_CREDITS_PRICE,
  GET_CREDITS_PRICE_SUCCESS,
  GET_CREDITS_PRICE_ERROR,

  FETCH_INDICATION_LEVEL_PRICE,
  FETCH_INDICATION_LEVEL_PRICE_SUCCESS,
  FETCH_INDICATION_LEVEL_PRICE_ERROR,

  CHANGE_USERS_TIMEZONE,
  CHANGE_USERS_TIMEZONE_SUCCESS,
  CHANGE_USERS_TIMEZONE_ERROR,

  FETCH_LANDING,
  FETCH_LANDING_SUCCESS,
  FETCH_LANDING_ERROR,
  SUBSCRIBE_FROM_LANDING,
  PATIENT_SUBSCRIBED,
  PATIENT_SUBSCRIPTION_ERROR,
  CLEAR_LANDING,

  FIND_OUT_PATIENTS,
  FIND_OUT_PATIENTS_POSTED,
  FIND_OUT_PATIENTS_ERROR,

  CLINICAL_TRIALS_SEARCH,
  CLINICAL_TRIALS_SEARCH_SUCCESS,
  CLINICAL_TRIALS_SEARCH_ERROR,
  CLEAR_CLINICAL_TRIALS_SEARCH,

  ADD_EMAIL_NOTIFICATION_USER,
  ADD_EMAIL_NOTIFICATION_USER_SUCCESS,
  ADD_EMAIL_NOTIFICATION_USER_ERROR,

  ADD_CUSTOM_EMAIL_NOTIFICATION,

  REMOVE_CUSTOM_EMAIL_NOTIFICATION,

  LIST_SITE_NOW,
  LIST_SITE_NOW_SUCCESS,
  RESET_LIST_SITE_NOW_SUCCESS,

  GET_PROPOSAL,
  GET_PROPOSAL_SUCCESS,
  RESET_GET_PROPOSAL_SUCCESS,

  LEARN_ABOUT_FUTURE_TRIALS,
  LEARN_ABOUT_FUTURE_TRIALS_SUCCESS,
  RESET_LEARN_ABOUT_FUTURE_TRIALS,

  NEW_CONTACT,
  NEW_CONTACT_SUCCESS,
  RESET_NEW_CONTACT_SUCCESS,

  FETCH_CLIENT_ADMINS,
  FETCH_CLIENT_ADMINS_SUCCESS,
  FETCH_CLIENT_ADMINS_ERROR,

  SEND_THANK_YOU_EMAIL,

  FETCH_SPONSORS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_SPONSORS_ERROR,

  FETCH_PROTOCOLS,
  FETCH_PROTOCOLS_SUCCESS,
  FETCH_PROTOCOLS_ERROR,

  FETCH_CRO,
  FETCH_CRO_SUCCESS,
  FETCH_CRO_ERROR,

  FETCH_USERS_BY_ROLE,
  FETCH_USERS_BY_ROLE_SUCCESS,
  FETCH_USERS_BY_ROLE_ERROR,

  CHANGE_TEMPORARY_PASSWORD,

  GET_CNS_INFO,
  GET_CNS_INFO_SUCCESS,
  GET_CNS_INFO_ERROR,

  SUBMIT_CNS,
  SUBMIT_CNS_SUCCESS,
  SUBMIT_CNS_ERROR,

  ADD_MESSAGES_COUNT_STAT,
  DELETE_MESSAGES_COUNT_STAT,

  FETCH_PATIENT_CATEGORIES,
  PATIENT_CATEGORIES_FETCHED,
  FETCH_PATIENT_CATEGORIES_ERROR,

  GET_TIMEZONE,
  GET_TIMEZONE_SUCCESS,
  GET_TIMEZONE_ERROR,

  CLEAR_STUDY_SOURCES,
  FETCH_STUDY_SOURCES,
  FETCH_STUDY_SOURCES_SUCCESS,
  FETCH_STUDY_SOURCES_ERROR,

  FETCH_STUDY_LEAD_SOURCES,
  FETCH_STUDY_LEAD_SOURCES_SUCCESS,
  FETCH_STUDY_LEAD_SOURCES_ERROR,
} from './constants';

// ///////////////////////////////////////////
// auth related action creators
// ///////////////////////////////////////////
export function fetchMeFromToken(redirect) {
  return {
    type: FETCH_ME_FROM_TOKEN,
    redirect,
  };
}

export function setAuthState(newAuthState) {
  return {
    type: SET_AUTH_STATE,
    payload: {
      newAuthState,
    },
  };
}

export function setUserData(userData) {
  if (userData && userData.id && mixpanel.__loaded) { // eslint-disable-line
    try {
      mixpanel.identify(userData.id);
      mixpanel.people.set({ $email: userData.email });
      mixpanel.people.set({ $name: `${userData.firstName} ${userData.lastName}` });
    } catch (e) {
      console.log('mixpanel error: ', e);
    }
  }
  return {
    type: SET_USER_DATA,
    payload: {
      userData,
    },
  };
}

// ///////////////////////////////////////////
// indications
// ///////////////////////////////////////////
export function fetchIndications() {
  return {
    type: FETCH_INDICATIONS,
  };
}

export function indicationsFetched(payload) {
  return {
    type: FETCH_INDICATIONS_SUCCESS,
    payload,
  };
}

export function indicationsFetchingError(payload) {
  return {
    type: FETCH_INDICATIONS_ERROR,
    payload,
  };
}

// ///////////////////////////////////////////
// sources
// ///////////////////////////////////////////
export function fetchSources() {
  return {
    type: FETCH_SOURCES,
  };
}

export function sourcesFetched(payload) {
  return {
    type: FETCH_SOURCES_SUCCESS,
    payload,
  };
}

export function sourcesFetchingError(payload) {
  return {
    type: FETCH_SOURCES_ERROR,
    payload,
  };
}

// ///////////////////////////////////////////
// levels
// ///////////////////////////////////////////
export function fetchLevels() {
  return {
    type: FETCH_LEVELS,
  };
}

export function levelsFetched(payload) {
  return {
    type: FETCH_LEVELS_SUCCESS,
    payload,
  };
}

export function levelsFetchingError(payload) {
  return {
    type: FETCH_LEVELS_ERROR,
    payload,
  };
}

// ///////////////////////////////////////////
// fetch coupon
// ///////////////////////////////////////////
export function fetchCoupon(couponId) {
  return {
    type: FETCH_COUPON,
    couponId,
  };
}

export function couponFetched(payload) {
  return {
    type: FETCH_COUPON_SUCCESS,
    payload,
  };
}

export function couponFetchingError(payload) {
  return {
    type: FETCH_COUPON_ERROR,
    payload,
  };
}

// ///////////////////////////////////////////
// clear coupon
// ///////////////////////////////////////////
export function clearCoupon() {
  return {
    type: CLEAR_COUPON,
  };
}

// ///////////////////////////////////////////
// fetch rewards
// ///////////////////////////////////////////
export function fetchRewards(clientId, siteId) {
  return {
    type: FETCH_REWARDS,
    siteId,
    clientId,
  };
}

export function rewardsFetched(payload) {
  return {
    type: FETCH_REWARDS_SUCCESS,
    payload,
  };
}

export function rewardsFetchingError(payload) {
  return {
    type: FETCH_REWARDS_ERROR,
    payload,
  };
}

// ///////////////////////////////////////////
// fetch rewards balance
// ///////////////////////////////////////////
export function fetchRewardsBalance(clientId, siteId) {
  return {
    type: FETCH_REWARDS_BALANCE,
    siteId,
    clientId,
  };
}

export function rewardsBalanceFetched(siteId, payload) {
  return {
    type: FETCH_REWARDS_BALANCE_SUCCESS,
    siteId,
    payload,
  };
}

export function rewardsBalanceFetchingError(payload) {
  return {
    type: FETCH_REWARDS_BALANCE_ERROR,
    payload,
  };
}

export function redeem(payload) {
  return {
    type: REDEEM,
    payload,
  };
}

export function redeemSuccess(payload) {
  return {
    type: REDEEM_SUCCESS,
    payload,
  };
}

export function redeemError(payload) {
  return {
    type: REDEEM_ERROR,
    payload,
  };
}
// ///////////////////////////////////////////
// fetch cards
// ///////////////////////////////////////////
export function fetchCards(clientId, customerId) {
  return {
    type: FETCH_CARDS,
    clientId,
    customerId,
  };
}

export function cardsFetched(payload) {
  return {
    type: FETCH_CARDS_SUCCESS,
    payload,
  };
}

export function cardsFetchingError(payload) {
  return {
    type: FETCH_CARDS_ERROR,
    payload,
  };
}

// ///////////////////////////////////////////
// save card
// ///////////////////////////////////////////
export function saveCard(clientId, customerId, cardData) {
  return {
    type: SAVE_CARD,
    clientId,
    customerId,
    cardData,
  };
}

export function cardSaved(payload) {
  return {
    type: SAVE_CARD_SUCCESS,
    payload,
  };
}

export function cardSavingError(payload) {
  return {
    type: SAVE_CARD_ERROR,
    payload,
  };
}

// ///////////////////////////////////////////
// delete card
// ///////////////////////////////////////////
export function deleteCard(clientId, customerId, cardId) {
  return {
    type: DELETE_CARD,
    clientId,
    customerId,
    cardId,
  };
}

export function cardDeleted(payload) {
  return {
    type: DELETE_CARD_SUCCESS,
    payload,
  };
}

export function cardDeletingError(payload) {
  return {
    type: DELETE_CARD_ERROR,
    payload,
  };
}

// ///////////////////////////////////////////
// add credits
// ///////////////////////////////////////////
export function addCredits(clientId, customerId, data) {
  return {
    type: ADD_CREDITS,
    clientId,
    customerId,
    data,
  };
}

export function creditsAdded(payload) {
  return {
    type: ADD_CREDITS_SUCCESS,
    payload,
  };
}

export function creditsAddingError(payload) {
  return {
    type: ADD_CREDITS_ERROR,
    payload,
  };
}

export function fetchEvents(payload) {
  return {
    type: FETCH_EVENTS,
    payload,
  };
}

// /////////////////////////////////////////
// sites and users
// ////////////////////////////////////////
export function fetchClientSites(clientId, searchParams) {
  return {
    type: FETCH_CLIENT_SITES,
    clientId,
    searchParams,
  };
}

export function clientSitesFetched(payload) {
  return {
    type: FETCH_CLIENT_SITES_SUCCESS,
    payload,
  };
}

export function clientSitesFetchingError(payload) {
  return {
    type: FETCH_CLIENT_SITES_ERROR,
    payload,
  };
}

export function fetchClientCredits(userId) {
  return {
    type: FETCH_CLIENT_CREDITS,
    userId,
  };
}

export function clientCreditsFetched(payload) {
  return {
    type: FETCH_CLIENT_CREDITS_SUCCESS,
    payload,
  };
}

export function clientCreditsFetchingError(payload) {
  return {
    type: FETCH_CLIENT_CREDITS_ERROR,
    payload,
  };
}

export function fetchSitePatients(clientRoleId, offset, limit) {
  return {
    type: FETCH_SITE_PATIENTS,
    clientRoleId,
    offset,
    limit,
  };
}

export function sitePatientsFetched(payload, hasMoreItems, page) {
  return {
    type: FETCH_SITE_PATIENTS_SUCCESS,
    payload,
    hasMoreItems,
    page,
  };
}

export function sitePatientsFetchingError(payload) {
  return {
    type: FETCH_SITE_PATIENTS_ERROR,
    payload,
  };
}

export function fetchPatientMessageUnreadCount(currentUser) {
  return {
    type: FETCH_PATIENT_MESSAGE_UNREAD_COUNT,
    currentUser,
  };
}

export function patientMessageUnreadCountFetched(payload) {
  return {
    type: FETCH_PATIENT_MESSAGE_UNREAD_COUNT_SUCCESS,
    payload,
  };
}

export function updateSitePatients(newMessage) {
  return {
    type: UPDATE_SITE_PATIENTS,
    newMessage,
  };
}

export function searchSitePatients(keyword) {
  return {
    type: SEARCH_SITE_PATIENTS,
    keyword,
  };
}

export function sitePatientsSearched(payload) {
  return {
    type: SEARCH_SITE_PATIENTS_SUCCESS,
    payload,
  };
}

export function sitePatientsSearchingError(payload) {
  return {
    type: SEARCH_SITE_PATIENTS_ERROR,
    payload,
  };
}

export function fetchPatientMessages(patientId) {
  return {
    type: FETCH_PATIENT_MESSAGES,
    patientId,
  };
}

export function patientMessagesFetched(payload) {
  return {
    type: FETCH_PATIENT_MESSAGES_SUCCESS,
    payload,
  };
}

export function patientMessagesFetchingError(payload) {
  return {
    type: FETCH_PATIENT_MESSAGES_ERROR,
    payload,
  };
}

export function updatePatientMessages(newMessage) {
  return {
    type: UPDATE_PATIENT_MESSAGES,
    newMessage,
  };
}

export function markAsReadPatientMessages(patientId) {
  return {
    type: MARK_AS_READ_PATIENT_MESSAGES,
    patientId,
  };
}

export function fetchClientRoles(clientId, searchParams) {
  return {
    type: FETCH_CLIENT_ROLES,
    clientId,
    searchParams,
  };
}

export function clientRolesFetched(payload) {
  return {
    type: FETCH_CLIENT_ROLES_SUCCESS,
    payload,
  };
}

export function clientRolesFetchingError(payload) {
  return {
    type: FETCH_CLIENT_ROLES_ERROR,
    payload,
  };
}

export function fetchSite(id) {
  return {
    type: FETCH_SITE,
    id,
  };
}

export function siteFetched(payload) {
  return {
    type: FETCH_SITE_SUCCESS,
    payload,
  };
}

export function siteFetchingError(payload) {
  return {
    type: FETCH_SITE_ERROR,
    payload,
  };
}

export function fetchUser(id) {
  return {
    type: FETCH_USER,
    id,
  };
}

export function userFetched(payload) {
  return {
    type: FETCH_USER_SUCCESS,
    payload,
  };
}

export function userFetchingError(payload) {
  return {
    type: FETCH_USER_ERROR,
    payload,
  };
}

export function clearSelectedSite() {
  return {
    type: CLEAR_SELECTED_SITE,
  };
}

export function clearSelectedUser() {
  return {
    type: CLEAR_SELECTED_USER,
  };
}

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    id,
  };
}

export function userDeleted(id, payload) {
  return {
    type: DELETE_USER_SUCCESS,
    payload: {
      ...payload,
      id,
    },
  };
}

export function userDeletingError(payload) {
  return {
    type: DELETE_USER_ERROR,
    payload,
  };
}

export function saveSite(clientId, id, data) {
  return {
    type: SAVE_SITE,
    clientId,
    id,
    data,
  };
}

export function siteSaved(payload) {
  return {
    type: SAVE_SITE_SUCCESS,
    payload,
  };
}

export function siteSavingError(payload) {
  return {
    type: SAVE_SITE_ERROR,
    payload,
  };
}

export function saveUser(clientId, id, data) {
  return {
    type: SAVE_USER,
    clientId,
    id,
    data,
  };
}

export function userSaved(siteId, payload, messageHeader) {
  const userType = (siteId === 0) ? 'admin' : 'nonAdmin';
  const userResultData = {
    siteId,
    ...payload.clientRole,
    user: payload.user,
    header: messageHeader,
  };
  const result = {
    userType,
    userResultData,
  };

  return {
    type: SAVE_USER_SUCCESS,
    payload: result,
  };
}

export function userSavingError(payload) {
  return {
    type: SAVE_USER_ERROR,
    payload,
  };
}

export function updateUser(id, data) {
  return {
    type: UPDATE_USER,
    id,
    data,
  };
}

export function updateUserSuccess(payload) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload,
  };
}

export function updateUserError(payload) {
  return {
    type: UPDATE_USER_ERROR,
    payload,
  };
}

export function getCreditsPrice() {
  return {
    type: GET_CREDITS_PRICE,
  };
}

export function getCreditsPriceSuccess(payload) {
  return {
    type: GET_CREDITS_PRICE_SUCCESS,
    payload,
  };
}

export function getCreditsPriceError(payload) {
  return {
    type: GET_CREDITS_PRICE_ERROR,
    payload,
  };
}

export function fetchIndicationLevelPrice(indicationId, levelId) {
  return {
    type: FETCH_INDICATION_LEVEL_PRICE,
    indicationId,
    levelId,
  };
}

export function fetchIndicationLevelPriceSuccess(payload) {
  return {
    type: FETCH_INDICATION_LEVEL_PRICE_SUCCESS,
    payload,
  };
}

export function fetchIndicationLevelPriceError(payload) {
  return {
    type: FETCH_INDICATION_LEVEL_PRICE_ERROR,
    payload,
  };
}

export function changeUsersTimezone(userId, params) {
  return {
    type: CHANGE_USERS_TIMEZONE,
    userId,
    params,
  };
}

export function changeUsersTimezoneSuccess(payload) {
  return {
    type: CHANGE_USERS_TIMEZONE_SUCCESS,
    payload,
  };
}

export function changeUsersTimezoneError(payload) {
  return {
    type: CHANGE_USERS_TIMEZONE_ERROR,
    payload,
  };
}

export function fetchLanding(studyId, url) {
  return {
    type: FETCH_LANDING,
    studyId,
    url,
  };
}

export function landingFetched(payload) {
  return {
    type: FETCH_LANDING_SUCCESS,
    payload,
  };
}

export function fetchLandingError(payload) {
  return {
    type: FETCH_LANDING_ERROR,
    payload,
  };
}

export function subscribeFromLanding(params) {
  return {
    type: SUBSCRIBE_FROM_LANDING,
    params,
  };
}

export function patientSubscribed(payload) {
  return {
    type: PATIENT_SUBSCRIBED,
    payload,
  };
}

export function patientSubscriptionError(payload) {
  return {
    type: PATIENT_SUBSCRIPTION_ERROR,
    payload,
  };
}

export function clearLanding() {
  return {
    type: CLEAR_LANDING,
  };
}

export function addEmailNotificationUser(payload) {
  return {
    type: ADD_EMAIL_NOTIFICATION_USER,
    payload,
  };
}

export function addEmailNotificationUserSuccess(payload) {
  return {
    type: ADD_EMAIL_NOTIFICATION_USER_SUCCESS,
    payload,
  };
}

export function addEmailNotificationUserError(payload) {
  return {
    type: ADD_EMAIL_NOTIFICATION_USER_ERROR,
    payload,
  };
}

export function addCustomEmailNotification(payload) {
  return {
    type: ADD_CUSTOM_EMAIL_NOTIFICATION,
    payload,
  };
}

export function removeCustomEmailNotification(id, email) {
  return {
    type: REMOVE_CUSTOM_EMAIL_NOTIFICATION,
    id,
    email,
  };
}

export function findOutPatients(params) {
  return {
    type: FIND_OUT_PATIENTS,
    params,
  };
}

export function findOutPatientsPosted(params) {
  return {
    type: FIND_OUT_PATIENTS_POSTED,
    params,
  };
}

export function findOutPatientsError(params) {
  return {
    type: FIND_OUT_PATIENTS_ERROR,
    params,
  };
}

export function clinicalTrialsSearch(params) {
  return {
    type: CLINICAL_TRIALS_SEARCH,
    params,
  };
}

export function clinicalTrialsSearchSuccess(payload) {
  return {
    type: CLINICAL_TRIALS_SEARCH_SUCCESS,
    payload,
  };
}

export function clinicalTrialsSearchError(payload) {
  return {
    type: CLINICAL_TRIALS_SEARCH_ERROR,
    payload,
  };
}

export function clearClinicalTrialsSearch() {
  return {
    type: CLEAR_CLINICAL_TRIALS_SEARCH,
  };
}

export function listSiteNow(params) {
  return {
    type: LIST_SITE_NOW,
    params,
  };
}

export function listSiteNowSuccess(payload) {
  return {
    type: LIST_SITE_NOW_SUCCESS,
    payload,
  };
}

export function resetListSiteNowSuccess(payload) {
  return {
    type: RESET_LIST_SITE_NOW_SUCCESS,
    payload,
  };
}

export function getProposal(params) {
  return {
    type: GET_PROPOSAL,
    params,
  };
}

export function getProposalSuccess(payload) {
  return {
    type: GET_PROPOSAL_SUCCESS,
    payload,
  };
}

export function resetGetProposalSuccess(payload) {
  return {
    type: RESET_GET_PROPOSAL_SUCCESS,
    payload,
  };
}

export function learnAboutFutureTrials(params) {
  return {
    type: LEARN_ABOUT_FUTURE_TRIALS,
    params,
  };
}

export function learnAboutFutureTrialsSuccess(payload) {
  return {
    type: LEARN_ABOUT_FUTURE_TRIALS_SUCCESS,
    payload,
  };
}

export function resetLearnAboutFutureTrialsSuccess(payload) {
  return {
    type: RESET_LEARN_ABOUT_FUTURE_TRIALS,
    payload,
  };
}

export function newContact(params) {
  return {
    type: NEW_CONTACT,
    params,
  };
}

export function newContactSuccess(payload) {
  return {
    type: NEW_CONTACT_SUCCESS,
    payload,
  };
}

export function resetNewContactSuccess(payload) {
  return {
    type: RESET_NEW_CONTACT_SUCCESS,
    payload,
  };
}

export function fetchClientAdmins(id) {
  return {
    type: FETCH_CLIENT_ADMINS,
    id,
  };
}

export function fetchClientAdminsSuccess(payload) {
  return {
    type: FETCH_CLIENT_ADMINS_SUCCESS,
    payload,
  };
}

export function fetchClientAdminsError(payload) {
  return {
    type: FETCH_CLIENT_ADMINS_ERROR,
    payload,
  };
}

export function sendThankYouEmail(payload) {
  return {
    type: SEND_THANK_YOU_EMAIL,
    payload,
  };
}

export function fetchSponsors() {
  return {
    type: FETCH_SPONSORS,
  };
}

export function fetchSponsorsSuccess(payload) {
  return {
    type: FETCH_SPONSORS_SUCCESS,
    payload,
  };
}

export function fetchSponsorsError(payload) {
  return {
    type: FETCH_SPONSORS_ERROR,
    payload,
  };
}

export function fetchProtocols(clientRoleId, sponsorRoleId) {
  return {
    type: FETCH_PROTOCOLS,
    clientRoleId,
    sponsorRoleId,
  };
}

export function fetchProtocolsSuccess(payload) {
  return {
    type: FETCH_PROTOCOLS_SUCCESS,
    payload,
  };
}

export function fetchProtocolsError(payload) {
  return {
    type: FETCH_PROTOCOLS_ERROR,
    payload,
  };
}

export function fetchCro() {
  return {
    type: FETCH_CRO,
  };
}

export function fetchCroSuccess(payload) {
  return {
    type: FETCH_CRO_SUCCESS,
    payload,
  };
}

export function fetchCroError(payload) {
  return {
    type: FETCH_CRO_ERROR,
    payload,
  };
}

export function fetchUsersByRole() {
  return {
    type: FETCH_USERS_BY_ROLE,
  };
}

export function fetchUsersByRoleSuccess(payload) {
  return {
    type: FETCH_USERS_BY_ROLE_SUCCESS,
    payload,
  };
}

export function fetchUsersByRoleError(payload) {
  return {
    type: FETCH_USERS_BY_ROLE_ERROR,
    payload,
  };
}

export function changeTemporaryPassword(payload) {
  return {
    type: CHANGE_TEMPORARY_PASSWORD,
    payload,
  };
}

export function getCnsInfo(payload) {
  return {
    type: GET_CNS_INFO,
    payload,
  };
}

export function getCnsInfoSuccess(payload) {
  return {
    type: GET_CNS_INFO_SUCCESS,
    payload,
  };
}

export function getCnsInfoError(payload) {
  return {
    type: GET_CNS_INFO_ERROR,
    payload,
  };
}

export function submitCns(payload) {
  return {
    type: SUBMIT_CNS,
    payload,
  };
}

export function submitCnsSuccess(payload) {
  return {
    type: SUBMIT_CNS_SUCCESS,
    payload,
  };
}

export function submitCnsError(payload) {
  return {
    type: SUBMIT_CNS_ERROR,
    payload,
  };
}

export function addMessagesCountStat(payload) {
  return {
    type: ADD_MESSAGES_COUNT_STAT,
    payload,
  };
}

export function deleteMessagesCountStat(payload) {
  return {
    type: DELETE_MESSAGES_COUNT_STAT,
    payload,
  };
}

export function fetchPatientCategories(payload) {
  return {
    type: FETCH_PATIENT_CATEGORIES,
    payload,
  };
}
export function patientCategoriesFetched(payload) {
  return {
    type: PATIENT_CATEGORIES_FETCHED,
    payload,
  };
}
export function patientCategoriesFetchingError(payload) {
  return {
    type: FETCH_PATIENT_CATEGORIES_ERROR,
    payload,
  };
}

export function getTimezone(lat, lng) {
  return {
    type: GET_TIMEZONE,
    lat,
    lng,
  };
}

export function getTimezoneSuccess(payload) {
  return {
    type: GET_TIMEZONE_SUCCESS,
    payload,
  };
}

export function getTimezoneError(payload) {
  return {
    type: GET_TIMEZONE_ERROR,
    payload,
  };
}

export function clearStudySources() {
  return {
    type: CLEAR_STUDY_SOURCES,
  };
}

export function fetchStudySources(studyId) {
  return {
    type: FETCH_STUDY_SOURCES,
    studyId,
  };
}

export function fetchStudySourcesSuccess(payload) {
  return {
    type: FETCH_STUDY_SOURCES_SUCCESS,
    payload,
  };
}

export function fetchStudySourcesError(payload) {
  return {
    type: FETCH_STUDY_SOURCES_ERROR,
    payload,
  };
}


export function fetchStudyLeadSources(studyId, excludeSourceIds) {
  return {
    type: FETCH_STUDY_LEAD_SOURCES,
    studyId,
    excludeSourceIds,
  };
}

export function fetchStudyLeadSourcesSuccess(payload) {
  return {
    type: FETCH_STUDY_LEAD_SOURCES_SUCCESS,
    payload,
  };
}

export function fetchStudyLeadSourcesError(payload) {
  return {
    type: FETCH_STUDY_LEAD_SOURCES_ERROR,
    payload,
  };
}
