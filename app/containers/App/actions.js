import {
  FETCH_ME_FROM_TOKEN,
  SET_AUTH_STATE,
  SET_USER_DATA,

  FETCH_SITES,
  FETCH_SITES_SUCCESS,
  FETCH_SITES_ERROR,

  FETCH_INDICATIONS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_INDICATIONS_ERROR,

  FETCH_LEVELS,
  FETCH_LEVELS_SUCCESS,
  FETCH_LEVELS_ERROR,

  FETCH_COUPON,
  FETCH_COUPON_SUCCESS,
  FETCH_COUPON_ERROR,

  CLEAR_COUPON,

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
} from './constants';

// ///////////////////////////////////////////
// auth related action creators
// ///////////////////////////////////////////
export function fetchMeFromToken() {
  return {
    type: FETCH_ME_FROM_TOKEN,
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
  return {
    type: SET_USER_DATA,
    payload: {
      userData,
    },
  };
}

// ///////////////////////////////////////////
// site locations
// ///////////////////////////////////////////
export function fetchSites(payload) {
  return {
    type: FETCH_SITES,
    payload,
  };
}

export function sitesFetched(payload) {
  return {
    type: FETCH_SITES_SUCCESS,
    payload,
  };
}

export function sitesFetchingError(payload) {
  return {
    type: FETCH_SITES_ERROR,
    payload,
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
// fetch cards
// ///////////////////////////////////////////
export function fetchCards(customerId) {
  return {
    type: FETCH_CARDS,
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
export function saveCard(customerId, cardData) {
  return {
    type: SAVE_CARD,
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
export function deleteCard(customerId, cardId) {
  return {
    type: DELETE_CARD,
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
export function addCredits(customerId, data) {
  return {
    type: ADD_CREDITS,
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
