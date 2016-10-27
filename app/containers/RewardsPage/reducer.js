/*
 *
 * RewardsPage reducer
 *
 */

import { map } from 'lodash';

import {
  DEFAULT_SITE_LOCATIONS,
  FETCH_SITE_LOCATIONS_SUCCESS,
} from 'containers/RewardsPage/constants';

const initialState = {
  siteLocations: DEFAULT_SITE_LOCATIONS,
};

function RewardsPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SITE_LOCATIONS_SUCCESS:
      return {
        ...state,
        siteLocations: map(action.payload, 'type'),
      };
    default:
      return state;
  }
}

export default RewardsPageReducer;
