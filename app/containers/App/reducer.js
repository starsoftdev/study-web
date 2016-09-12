import { getItem } from 'utils/localStorage';

import {
  SET_AUTH_STATE,
  SET_USER_DATA,
} from './constants';

const initialState = {
  loggedIn: !!getItem('auth_token'),
  userData: false,
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

    default:
      return state;
  }
}
