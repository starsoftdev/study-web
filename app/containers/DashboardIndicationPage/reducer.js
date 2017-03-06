/*
 *
 * DashboardIndicationPage reducer
 *
 */

import {
  FETCH_INDICATIONS,
  FETCH_INDICATIONS_ERROR,
  FETCH_INDICATIONS_SUCCESS,
} from './constants';

const initialState = {
  indications: {
    details: [],
    fetching: false,
    error: null,
  },
};

function dashboardIndicationPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_INDICATIONS:
      return {
        ...state,
        indications: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_INDICATIONS_SUCCESS:
      return {
        ...state,
        indications: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_INDICATIONS_ERROR:
      console.log('Erorr', action.payload);
      return {
        ...state,
        indications: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export default dashboardIndicationPageReducer;
