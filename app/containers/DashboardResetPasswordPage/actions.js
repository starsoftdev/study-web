/*
 *
 * DashboardResetPasswordPage actions
 *
 */

import {
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
} from './constants';

export function updatePassword(payload) {
  return {
    type: UPDATE_PASSWORD,
    payload,
  };
}

export function updatePasswordSuccess(payload) {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    payload,
  };
}

export function updatePasswordError(payload) {
  return {
    type: UPDATE_PASSWORD_ERROR,
    payload,
  };
}
