/*
 *
 * ProfilePage actions
 *
 */

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_IMAGE,
  CHANGE_IMAGE_SUCCESS,
  CHANGE_IMAGE_ERROR,
  CONFIRM_CHANGE_PASSWORD_REQUEST,
  CONFIRM_CHANGE_PASSWORD_SUCCESS,
  CONFIRM_CHANGE_PASSWORD_ERROR,
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

export function changeImage(payload) {
  return {
    type: CHANGE_IMAGE,
    payload,
  };
}

export function imageChanged(payload) {
  return {
    type: CHANGE_IMAGE_SUCCESS,
    payload,
  };
}

export function imageChangingError(payload) {
  return {
    type: CHANGE_IMAGE_ERROR,
    payload,
  };
}

export function confirmChangePasswordRequest() {
  return {
    type: CONFIRM_CHANGE_PASSWORD_REQUEST,
  };
}

export function confirmPasswordChangeSuccess(payload) {
  return {
    type: CONFIRM_CHANGE_PASSWORD_SUCCESS,
    payload,
  };
}

export function confirmPasswordChangeError(payload) {
  return {
    type: CONFIRM_CHANGE_PASSWORD_ERROR,
    payload,
  };
}
