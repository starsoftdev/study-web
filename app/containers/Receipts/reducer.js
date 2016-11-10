/*
 *
 * Receipts reducer
 *
 */

import {
  DEFAULT_ACTION,
  RECEIPTS_RECEIVED,
  GET_RECEIPT,
} from './constants';

const initialState = {
  receiptsList: [],
  hasMoreItems: true,
};

function receiptsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_RECEIPT:
      return {
        ...state,
        hasMoreItems: false
      }
    case RECEIPTS_RECEIVED:
      return {
        ...state,
        receiptsList: action.payload
      }
    default:
      return state;
  }
}

export default receiptsReducer;
