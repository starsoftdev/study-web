/*
 *
 * ReportViewPage reducer
 *
 */

import {
  GET_REPORTS_LIST,
  GET_REPORTS_LIST_SUCCESS,
  GET_REPORTS_LIST_ERROR,
} from './constants';

const initialState = {
  reportsList: {
    details: [],
    fetching: false,
    error: null,
  }
};

function reportViewPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REPORTS_LIST:
      return {
        ...state,
        reportsList: {
          details: state.reportsList.details,
          fetching: true,
          error: null,
        }
      };
    case GET_REPORTS_LIST_SUCCESS:
      return {
        ...state,
        reportsList: {
          details: action.payload,
          fetching: false,
          error: null,
        }
      };
    case GET_REPORTS_LIST_ERROR:
      return {
        ...state,
        reportsList: {
          details: state.reportsList.details,
          fetching: false,
          error: action.payload,
        }
      };
    default:
      return state;
  }
}

export default reportViewPageReducer;
