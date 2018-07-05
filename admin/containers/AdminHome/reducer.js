/* eslint-disable comma-dangle, no-case-declarations */

import { pullAt } from 'lodash';
import {
  FETCH_STUDIES_FOR_ADMIN, FETCH_STUDIES_FOR_ADMIN_ERROR, FETCH_STUDIES_FOR_ADMIN_SUCCESS,
  FETCH_TOTALS_FOR_ADMIN, FETCH_TOTALS_FOR_ADMIN_ERROR, FETCH_TOTALS_FOR_ADMIN_SUCCESS,
  CLEAR_FILTERS, ADD_CUSTOM_FILTER, REMOVE_CUSTOM_FILTER, CLEAR_CUSTOM_FILTERS, CLEAR_STUDIES,
} from './constants';

const initialState = {
  studies: {
    details: [],
    fetching: false,
    error: null,
  },
  paginationOptions: {
    hasMoreItems: true,
    page: 0,
  },
  totals: {
    details: {},
    fetching: false,
    error: null,
  },
  customFilters: [],
};

export default function adminHomeReducer(state = initialState, action) {
  let newStudiesList = [];

  switch (action.type) {
    case FETCH_STUDIES_FOR_ADMIN:
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
    case FETCH_STUDIES_FOR_ADMIN_SUCCESS:
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
    case FETCH_STUDIES_FOR_ADMIN_ERROR:
      return {
        ...state,
        studies: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };

    case FETCH_TOTALS_FOR_ADMIN:
      return {
        ...state,
        totals: {
          details: state.totals.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_TOTALS_FOR_ADMIN_SUCCESS:
      return {
        ...state,
        totals: {
          details: action.payload.totals,
          fetching: false,
          error: true,
        },
      };
    case FETCH_TOTALS_FOR_ADMIN_ERROR:
      return {
        ...state,
        totals: {
          details: action.payload.totals,
          fetching: false,
          error: null,
        },
      };
    case CLEAR_STUDIES:
      return {
        ...state,
        totals: {
          details: [],
          fetching: false,
          error: null,
        },
        studies: {
          details: [],
          fetching: false,
          error: null,
        },
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        studies: {
          details: [],
          fetching: false,
          error: null,
        },
        totals: {
          details: {},
          fetching: false,
          error: null,
        },
      };
    case ADD_CUSTOM_FILTER:
      return {
        ...state,
        customFilters: [...state.customFilters, action.payload],
      };
    case REMOVE_CUSTOM_FILTER:
      const newCustomFilters = [...state.customFilters];
      if (action.payload && action.payload.key) {
        pullAt(newCustomFilters, newCustomFilters.findIndex((e) => e.key === action.payload.key));
      }
      return {
        ...state,
        customFilters: newCustomFilters,
      };
    case CLEAR_CUSTOM_FILTERS:
      return {
        ...state,
        customFilters: [],
      };
    default:
      return state;
  }
}

