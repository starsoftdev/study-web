/*
 *
 * RewardsPage actions
 *
 */

import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  PICK_REWARD,
  SET_ACTIVE_SORT,
} from './constants';

export function submitForm(payload) {
  return {
    type: SUBMIT_FORM,
    payload,
  };
}

export function formSubmitted(payload) {
  return {
    type: SUBMIT_FORM_SUCCESS,
    payload,
  };
}

export function formSubmissionError(payload) {
  return {
    type: SUBMIT_FORM_ERROR,
    payload,
  };
}

export function pickReward(value) {
  return {
    type: PICK_REWARD,
    value,
  };
}

export function setActiveSort(sort, direction) {
  return {
    type: SET_ACTIVE_SORT,
    sort,
    direction,
  };
}
