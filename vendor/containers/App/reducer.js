/* eslint-disable no-case-declarations */

import { getItem } from '../../../app/utils/localStorage';

import {
  SET_AUTH_STATE,
  SET_USER_DATA,

} from './constants';

const initialState = {
  loggedIn: !!getItem('auth_token'),
  userData: null,
  baseData: {},
};

export default function appReducer(state = initialState, action) {
  const baseDataInnerState = null;
  let resultState = null;
  let userRoleType = '';

  switch (action.type) {
    case SET_AUTH_STATE:
      resultState = {
        ...state,
        loggedIn: action.payload.newAuthState,
      };
      break;
    case SET_USER_DATA:
      if (action.payload.userData) {
        if (action.payload.userData.roleForSponsor) {
          userRoleType = 'sponsor';
        } else if (action.payload.userData.roleForClient) {
          userRoleType = 'client';
        } else if (action.payload.userData.roleForCallCenter) {
          userRoleType = 'callCenter';
        } else if (action.payload.userData.roleForVendor) {
          userRoleType = 'vendor';
        } else if (action.payload.userData.roles && action.payload.userData.roles.length > 0) {
          userRoleType = 'dashboard';
        } else {
          userRoleType = '';
        }
      }
      resultState = {
        ...state,
        userData: action.payload.userData,
        userRoleType,
      };
      break;
    default:
      return state;
  }

  if (!resultState) {
    resultState = {
      ...state,
      baseData: {
        ...state.baseData,
        ...baseDataInnerState,
      },
    };
  }

  return resultState;
}
