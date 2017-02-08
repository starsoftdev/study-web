/*
 *
 * RewardsPage actions
 *
 */

import {
  PICK_REWARD,
  SET_ACTIVE_SORT,
} from './constants';

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
