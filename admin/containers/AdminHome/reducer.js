/* eslint-disable comma-dangle, no-case-declarations */

import {
  FETCH_TOTALS_ADMIN,
  FETCH_TOTALS_ADMIN_SUCCESS,
  FETCH_TOTALS_ADMIN_ERROR,
  FETCH_SOURCES_SUCCESS,
  FETCH_STUDIES_ADMIN,
  FETCH_STUDIES_ADMIN_ERROR,
  FETCH_STUDIES_ADMIN_SUCCESS,
} from './constants';

const initialState = {
  totals: {
    details: {},
    fetching: false,
    error: null,
  },
  studies: {
    details: [],
    fetching: false,
    error: null,
  },
  paginationOptions: {
    hasMoreItems: true,
    page: 1,
  },
  sources: [],
};

export default function adminHomeReducer(state = initialState, action) {
  let newStudiesList = [];

  switch (action.type) {
    case FETCH_TOTALS_ADMIN:
      return {
        ...state,
        totals: {
          details: state.totals.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_TOTALS_ADMIN_SUCCESS:
      return {
        ...state,
        totals: {
          details: action.payload.totals,
          fetching: false,
          error: null,
        },
      };
    case FETCH_TOTALS_ADMIN_ERROR:
      return {
        ...state,
        totals: {
          details: action.payload.totals,
          fetching: false,
          error: true,
        },
      };
    case FETCH_STUDIES_ADMIN:
      return {
        ...state,
        studies: {
          details: state.studies.details,
          fetching: true,
          error: null,
        },
        paginationOptions: {
          hasMoreItems: false,
          page: state.paginationOptions.page,
        },
      };
    case FETCH_STUDIES_ADMIN_SUCCESS:
      if (action.page === 1) {
        newStudiesList = action.payload.studies;
      } else {
        const studiesCopy = [
          ...state.studies.details,
        ];
        newStudiesList = studiesCopy.concat(action.payload.studies);
      }
      return {
        ...state,
        studies: {
          details: newStudiesList,
          fetching: false,
          error: null,
        },
        paginationOptions: {
          hasMoreItems: action.hasMoreItems,
          page: action.page,
        },
      };
    case FETCH_STUDIES_ADMIN_ERROR:
      return {
        ...state,
        studies: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_SOURCES_SUCCESS:
      return {
        ...state,
        sources: action.payload,
      };
    default:
      return state;
  }
}
