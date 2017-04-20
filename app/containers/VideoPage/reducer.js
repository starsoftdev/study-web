/*
 *
 * VideoPage reducer
 *
 */

import { map } from 'lodash';

import {
  DEFAULT_COMPANY_TYPES,
  FETCH_COMPANY_TYPES_SUCCESS,
} from '../../containers/VideoPage/constants';

const initialState = {
  companyTypes: DEFAULT_COMPANY_TYPES,
};

function videoPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPANY_TYPES_SUCCESS:
      return {
        ...state,
        companyTypes: map(action.payload, 'type'),
      };
    default:
      return state;
  }
}

export default videoPageReducer;
