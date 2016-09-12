/*
 *
 * ProfilePage actions
 *
 */

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from './constants';

export function changePassword(payload) {
  return {
    type: CHANGE_PASSWORD,
    payload,
  };
}

export function passwordChanged(payload) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload,
  };
}

export function passwordChangingError(payload) {
  return {
    type: CHANGE_PASSWORD_ERROR,
    payload,
  };
}
