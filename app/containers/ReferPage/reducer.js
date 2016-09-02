/*
 *
 * ReferPage reducer
 *
 */

import { map } from 'lodash';

import {
  defaultCompanyTypes,
  COMPANY_TYPES_SUCCESS,
} from 'containers/ReferPage/constants';

const initialState = {
  companyTypes: defaultCompanyTypes,
};

function referPageReducer(state = initialState, action) {
  switch (action.type) {
    case COMPANY_TYPES_SUCCESS:
      return {
        ...state,
        companyTypes: map(action.payload, 'type'),
      };
    default:
      return state;
  }
}

export default referPageReducer;
