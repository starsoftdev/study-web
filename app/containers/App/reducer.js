import { getItem } from 'utils/localStorage';

import {
  SET_AUTH_STATE,
  SET_USER_DATA,

  FETCH_SITES_SUCCESS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_LEVELS_SUCCESS,

  FETCH_COUPON,
  FETCH_COUPON_SUCCESS,
  FETCH_COUPON_ERROR,

  FETCH_CARDS,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
} from './constants';

import {
  CHANGE_IMAGE_SUCCESS,
} from 'containers/ProfilePage/constants';

const initialState = {
  loggedIn: !!getItem('auth_token'),
  userData: null,
  baseData: {
    sites: [],
    indications: [],
    levels: [],
    coupon: {
      details: null,
      fetching: false,
      error: null,
    },
    cards: {
      details: null,
      fetching: false,
      error: null,
    },
  },
};

export default function appReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {

    case SET_AUTH_STATE:
      return {
        ...state,
        loggedIn: payload.newAuthState,
      };

    case SET_USER_DATA:
      return {
        ...state,
        userData: payload.userData,
      };
    case CHANGE_IMAGE_SUCCESS:
      return {
        ...state,
        userData: { ...state.userData, profileImageURL: payload.profileImageURL },
      };

    case FETCH_SITES_SUCCESS:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          sites: action.payload,
        },
      };
    case FETCH_INDICATIONS_SUCCESS:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          indications: action.payload,
        },
      };
    case FETCH_LEVELS_SUCCESS:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          levels: action.payload,
        },
      };
    case FETCH_COUPON:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          coupon: {
            details: null,
            fetching: true,
            error: null,
          },
        },
      };
    case FETCH_COUPON_SUCCESS:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          coupon: {
            details: action.payload,
            fetching: false,
            error: null,
          },
        },
      };
    case FETCH_COUPON_ERROR:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          coupon: {
            details: null,
            fetching: false,
            error: action.payload,
          },
        },
      };
    case FETCH_CARDS:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          cards: {
            details: null,
            fetching: true,
            error: null,
          },
        },
      };
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          cards: {
            details: action.payload,
            fetching: false,
            error: null,
          },
        },
      };
    case FETCH_CARDS_ERROR:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          cards: {
            details: null,
            fetching: false,
            error: action.payload,
          },
        },
      };
    default:
      return state;
  }
}
