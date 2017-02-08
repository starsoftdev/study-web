/*
 *
 * RewardsPage actions
 *
 */

import {
  REDEEM,
  REDEEM_SUCCESS,
  REDEEM_ERROR,
  PICK_REWARD,
  SET_ACTIVE_SORT,
} from './constants';

export function redeem(payload) {
  return {
    type: REDEEM,
    payload,
  };
}

export function redeemSuccess(payload) {
  return {
    type: REDEEM_SUCCESS,
    payload,
  };
}

export function redeemError(payload) {
  return {
    type: REDEEM_ERROR,
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
