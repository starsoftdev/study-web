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

  FETCH_STUDIES_FOR_ADMIN,
  FETCH_STUDIES_FOR_ADMIN_SUCCESS,
  FETCH_STUDIES_FOR_ADMIN_ERROR,

  FETCH_TOTALS_FOR_ADMIN,
  FETCH_TOTALS_FOR_ADMIN_SUCCESS,
  FETCH_TOTALS_FOR_ADMIN_ERROR,

  FETCH_MEDIA_TOTALS_FOR_ADMIN,
  FETCH_MEDIA_TOTALS_FOR_ADMIN_SUCCESS,
  FETCH_MEDIA_TOTALS_FOR_ADMIN_ERROR,

  ADD_CUSTOM_FILTER,
  REMOVE_CUSTOM_FILTER,
  CLEAR_CUSTOM_FILTERS,

  CLEAR_STUDIES,
  CLEAR_FILTERS,
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


export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}


export function fetchStudiesForAdmin(params, limit, offset) {
  return {
    type: FETCH_STUDIES_FOR_ADMIN,
    params,
    limit,
    offset,
  };
}

export function fetchStudiesForAdminSuccess(payload, hasMoreItems, page) {
  return {
    type: FETCH_STUDIES_FOR_ADMIN_SUCCESS,
    payload,
    hasMoreItems,
    page,
  };
}

export function fetchStudiesForAdminError(payload) {
  return {
    type: FETCH_STUDIES_FOR_ADMIN_ERROR,
    payload,
  };
}

export function fetchTotalsForAdmin(params, limit, offset) {
  return {
    type: FETCH_TOTALS_FOR_ADMIN,
    params,
    limit,
    offset,
  };
}

export function fetchTotalsForAdminSuccess(payload) {
  return {
    type: FETCH_TOTALS_FOR_ADMIN_SUCCESS,
    payload,
  };
}

export function fetchTotalsForAdminError(payload) {
  return {
    type: FETCH_TOTALS_FOR_ADMIN_ERROR,
    payload,
  };
}

export function fetchMediaTotalsForAdmin(params) {
  return {
    type: FETCH_MEDIA_TOTALS_FOR_ADMIN,
    params,
  };
}

export function fetchMediaTotalsForAdminSuccess(payload) {
  return {
    type: FETCH_MEDIA_TOTALS_FOR_ADMIN_SUCCESS,
    payload,
  };
}

export function fetchMediaTotalsForAdminError(payload) {
  return {
    type: FETCH_MEDIA_TOTALS_FOR_ADMIN_ERROR,
    payload,
  };
}

export function addCustomFilter(payload) {
  return {
    type: ADD_CUSTOM_FILTER,
    payload,
  };
}

export function removeCustomFilter(payload) {
  return {
    type: REMOVE_CUSTOM_FILTER,
    payload,
  };
}

export function clearCustomFilters() {
  return {
    type: CLEAR_CUSTOM_FILTERS,
  };
}

export function clearStudies() {
  return {
    type: CLEAR_STUDIES,
  };
}

