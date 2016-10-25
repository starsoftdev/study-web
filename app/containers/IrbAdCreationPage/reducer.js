/*
 *
 * IrbAdCreationPage reducer
 *
 */

import {
  FETCH_IRB_PRODUCT_LIST_SUCCESS,
} from './constants';

const initialState = {
  productList: [],
};

function irbAdCreationPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_IRB_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: action.payload,
      };
    default:
      return state;
  }
}

export default irbAdCreationPageReducer;
