import {
  SET_ACTIVE_SORT,
} from './constants';

export function setActiveSort(sort, direction) {
  return {
    type: SET_ACTIVE_SORT,
    sort,
    direction,
  };
}
