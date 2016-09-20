/*
 *
 * ResetPasswordPage actions
 *
 */

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from './constants';

export function resetPasswordRequest(payload) {
  console.log(1);
  return {
    type: RESET_PASSWORD_REQUEST,
    payload,
  };
}

export function resetPasswordSuccess(payload) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload,
  };
}

export function resetPasswordError(payload) {
  return {
    type: RESET_PASSWORD_ERROR,
    payload,
  };
}
