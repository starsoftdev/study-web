/*
 *
 * RewardsPage reducer
 *
 */

import { map } from 'lodash';

import {
  DEFAULT_SITES,
  FETCH_SITES_SUCCESS,
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
    case FETCH_SITES_SUCCESS:
      return {
        ...state,
        sites: map(action.payload, 'type'),
      };
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
