/*
 *
 * DashboardPortalsPage reducer
 *
 */

import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,

  FETCH_SPONSORS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_SPONSORS_ERROR,
} from './constants';

const initialState = {
  clients: {
    details: [],
    fetching: false,
    error: null,
  },
  sponsors: {
    details: [],
    fetching: false,
    error: null,
  },
};

function dashboardPortalsPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLIENTS:
      return {
        ...state,
        clients: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_CLIENTS_ERROR:
      return {
        ...state,
        clients: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
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
    default:
      return state;
  }
}

export default dashboardPortalsPageReducer;
