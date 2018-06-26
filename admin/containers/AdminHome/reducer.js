/* eslint-disable comma-dangle, no-case-declarations */

import {
  FETCH_MEDIA_TOTALS_FOR_ADMIN, FETCH_MEDIA_TOTALS_FOR_ADMIN_SUCCESS, FETCH_MEDIA_TOTALS_FOR_ADMIN_ERROR
} from './constants';

const initialState = {
  mediaTotals: {
    details: {},
    fetching: false,
    error: null,
  },
};

export default function adminHomeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MEDIA_TOTALS_FOR_ADMIN:
      return {
        ...state,
        mediaTotals: {
          details: state.mediaTotals.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_MEDIA_TOTALS_FOR_ADMIN_SUCCESS:
      return {
        ...state,
        mediaTotals: {
          details: action.payload,
          fetching: false,
          error: true,
        },
      };
    case FETCH_MEDIA_TOTALS_FOR_ADMIN_ERROR:
      return {
        ...state,
        mediaTotals: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    default:
      return state;
  }
}

