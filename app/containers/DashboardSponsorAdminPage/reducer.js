/*
 *
 * DashboardSponsorAdminPage reducer
 *
 */

import {
  FETCH_SPONSORS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_SPONSORS_ERROR,
  FETCH_SPONSORS_WITHOUT_ADMIN,
  FETCH_SPONSORS_WITHOUT_ADMIN_SUCCESS,
  FETCH_SPONSORS_WITHOUT_ADMIN_ERROR,
} from './constants';

const initialState = {
  sponsors: {
    details: [],
    fetching: false,
    error: null,
  },
  sponsorsWithoutAdmin: {
    details: [],
    fetching: false,
    error: null,
  },
};

function dashboardSponsorAdminPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPONSORS:
      return {
        ...state,
        sponsors: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_SPONSORS_SUCCESS:
      return {
        ...state,
        sponsors: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_SPONSORS_ERROR:
      return {
        ...state,
        sponsors: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_SPONSORS_WITHOUT_ADMIN:
      return {
        ...state,
        sponsorsWithoutAdmin: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_SPONSORS_WITHOUT_ADMIN_SUCCESS:
      return {
        ...state,
        sponsorsWithoutAdmin: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_SPONSORS_WITHOUT_ADMIN_ERROR:
      return {
        ...state,
        sponsorsWithoutAdmin: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export default dashboardSponsorAdminPageReducer;
