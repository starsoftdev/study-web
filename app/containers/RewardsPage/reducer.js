/*
 *
 * RewardsPage reducer
 *
 */

import { map } from 'lodash';

import {
  DEFAULT_SITES,
  SET_ACTIVE_SORT,
} from 'containers/RewardsPage/constants';

const initialState = {
  sites: DEFAULT_SITES,
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
  },
};

function RewardsPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_SORT:
      return {
        ...state,
        paginationOptions: {
          activeSort: action.sort,
          activeDirection: action.direction,
        },
      };
    default:
      return state;
  }
}

export default RewardsPageReducer;
