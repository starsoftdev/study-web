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

  FETCH_CARDS,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
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
export function fetchSites() {
  return {
    type: FETCH_SITES,
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
// coupon
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
// cards
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
