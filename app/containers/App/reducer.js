import { getItem } from 'utils/localStorage';

import {
  SET_AUTH_STATE,
  SET_USER_DATA,

  FETCH_SITES_SUCCESS,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_LEVELS_SUCCESS,
} from './constants';

const initialState = {
  loggedIn: !!getItem('auth_token'),
  userData: false,
  baseData: {
    sites: [],
    indications: [],
    levels: [],
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
    default:
      return state;
  }
}
