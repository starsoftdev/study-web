import { getItem } from 'utils/localStorage';
import { cloneDeep, remove } from 'lodash';

import {
  SET_AUTH_STATE,
  SET_USER_DATA,

  FETCH_SITES_SUCCESS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_LEVELS_SUCCESS,

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
    saveCard: {
      details: null,
      saving: false,
      error: null,
    },
    deleteCard: {
      details: null,
      deleting: false,
      error: null,
    },
  },
};

export default function appReducer(state = initialState, action) {
  const { payload } = action;
  const cardsCollection = cloneDeep(state.baseData.cards.details);

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
          sites: payload,
        },
      };
    case FETCH_INDICATIONS_SUCCESS:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          indications: payload,
        },
      };
    case FETCH_LEVELS_SUCCESS:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          levels: payload,
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
            details: payload,
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
            error: payload,
          },
        },
      };
    case CLEAR_COUPON:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          coupon: {
            details: null,
            fetching: false,
            error: null,
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
            details: payload,
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
            error: payload,
          },
        },
      };
    case SAVE_CARD:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          saveCard: {
            details: null,
            saving: true,
            error: null,
          },
        },
      };
    case SAVE_CARD_SUCCESS:
      cardsCollection.data.push(payload);

      return {
        ...state,
        baseData: {
          ...state.baseData,
          cards: {
            details: cardsCollection,
            fetching: false,
            error: null,
          },
          saveCard: {
            details: payload,
            saving: false,
            error: null,
          },
        },
      };
    case SAVE_CARD_ERROR:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          saveCard: {
            details: null,
            saving: false,
            error: payload,
          },
        },
      };
    case DELETE_CARD:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          deleteCard: {
            details: null,
            deleting: true,
            error: null,
          },
        },
      };
    case DELETE_CARD_SUCCESS:
      remove(cardsCollection.data, { id: payload.id });

      return {
        ...state,
        baseData: {
          ...state.baseData,
          cards: {
            details: cardsCollection,
            fetching: false,
            error: null,
          },
          deleteCard: {
            details: payload,
            deleting: false,
            error: null,
          },
        },
      };
    case DELETE_CARD_ERROR:
      return {
        ...state,
        baseData: {
          ...state.baseData,
          deleteCard: {
            details: null,
            deleting: false,
            error: payload,
          },
        },
      };

    default:
      return state;
  }
}
