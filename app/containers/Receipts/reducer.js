/*
 *
 * Receipts reducer
 *
 */

import {
  DEFAULT_ACTION,
  RECEIPTS_RECEIVED,
} from './constants';

const initialState = {};

function receiptsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RECEIPTS_RECEIVED:
      return action.payload;
    default:
      return state;
  }
}

export default receiptsReducer;
