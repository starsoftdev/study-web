/* eslint-disable no-case-declarations */

import { pullAt } from 'lodash';
import { getItem } from '../../utils/localStorage';

import {
  SET_AUTH_STATE,
  SET_USER_DATA,

  FETCH_INDICATIONS_SUCCESS,
  FETCH_SOURCES_SUCCESS,
  FETCH_LEVELS_SUCCESS,

  FETCH_PROTOCOLS,
  FETCH_PROTOCOLS_SUCCESS,
  FETCH_PROTOCOLS_ERROR,

  FETCH_SPONSORS,
  FETCH_SPONSORS_SUCCESS,
  FETCH_SPONSORS_ERROR,

  FETCH_CRO,
  FETCH_CRO_SUCCESS,
  FETCH_CRO_ERROR,

  FETCH_USERS_BY_ROLE_SUCCESS,

  FETCH_STUDIES_FOR_ADMIN,
  FETCH_STUDIES_FOR_ADMIN_ERROR,
  FETCH_STUDIES_FOR_ADMIN_SUCCESS,

  FETCH_TOTALS_FOR_ADMIN,
  FETCH_TOTALS_FOR_ADMIN_ERROR,
  FETCH_TOTALS_FOR_ADMIN_SUCCESS,

  CLEAR_FILTERS,

  ADD_CUSTOM_FILTER,
  REMOVE_CUSTOM_FILTER,
  CLEAR_CUSTOM_FILTERS,

  CLEAR_STUDIES,
} from './constants';


const initialState = {
  loggedIn: !!getItem('auth_token'),
  userData: null,
  userRoleType: null,
  pageEvents: null,
  baseData: {
    studies: {
      details: [],
      fetching: false,
      error: null,
    },
    studiesPaginationOptions: {
      hasMoreItems: true,
      page: 0,
    },
    totals: {
      details: {},
      fetching: false,
      error: null,
    },
    customFilters: [],
    indications: [],
    sources: [],
    levels: [],
    protocols: {
      details: [],
      fetching: false,
      error: null,
    },
    sponsors: {
      details: [],
      fetching: false,
      error: null,
    },
    cro: {
      details: [],
      fetching: false,
      error: null,
    },
    usersByRoles: {
      sm: [],
      bd: [],
      ae: [],
      cc: [],
    },
  },
};

export default function appReducer(state = initialState, action) {
  let baseDataInnerState = null;
  let resultState = null;
  let newStudiesList = [];
  let userRoleType = '';

  switch (action.type) {
    case SET_AUTH_STATE:
      resultState = {
        ...state,
        loggedIn: action.payload.newAuthState,
      };
      break;
    case SET_USER_DATA:
      if (action.payload.userData) {
        if (action.payload.userData.roleForSponsor) {
          userRoleType = 'sponsor';
        } else if (action.payload.userData.roleForClient) {
          userRoleType = 'client';
        } else if (action.payload.userData.roleForCallCenter) {
          userRoleType = 'callCenter';
        } else if (action.payload.userData.roles && action.payload.userData.roles.length > 0) {
          userRoleType = 'dashboard';
        } else {
          userRoleType = '';
        }
      }
      resultState = {
        ...state,
        userData: action.payload.userData,
        userRoleType,
      };
      break;
    case FETCH_STUDIES_FOR_ADMIN:
      baseDataInnerState = {
        studies: {
          details: state.studies.details,
          fetching: true,
          error: null,
        },
        studiesPaginationOptions: {
          hasMoreItems: false,
          page: state.studiesPaginationOptions.page,
        },
      };
      break;
    case FETCH_STUDIES_FOR_ADMIN_SUCCESS:
      if (action.page === 1) {
        newStudiesList = action.payload.studies;
      } else {
        const studiesCopy = [
          ...state.studies.details,
        ];
        newStudiesList = studiesCopy.concat(action.payload.studies);
      }
      baseDataInnerState = {
        studies: {
          details: newStudiesList,
          fetching: false,
          error: null,
        },
        studiesPaginationOptions: {
          hasMoreItems: action.hasMoreItems,
          page: action.page,
        },
      };
      break;
    case FETCH_STUDIES_FOR_ADMIN_ERROR:
      baseDataInnerState = {
        studies: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case FETCH_TOTALS_FOR_ADMIN:
      baseDataInnerState = {
        totals: {
          details: state.totals.details,
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_TOTALS_FOR_ADMIN_SUCCESS:
      baseDataInnerState = {
        totals: {
          details: action.payload.totals,
          fetching: false,
          error: true,
        },
      };
      break;
    case FETCH_TOTALS_FOR_ADMIN_ERROR:
      baseDataInnerState = {
        totals: {
          details: action.payload.totals,
          fetching: false,
          error: null,
        },
      };
      break;
    case CLEAR_STUDIES:
      baseDataInnerState =  {
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
      break;
    case CLEAR_FILTERS:
      baseDataInnerState = {
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
      break;
    case ADD_CUSTOM_FILTER:
      baseDataInnerState = {
        customFilters: [...state.customFilters, action.payload],
      };
      break;
    case REMOVE_CUSTOM_FILTER:
      const newCustomFilters = [...state.customFilters];
      if (action.payload && action.payload.key) {
        pullAt(newCustomFilters, newCustomFilters.findIndex((e) => e.key === action.payload.key));
      }
      baseDataInnerState = {
        customFilters: newCustomFilters,
      };
      break;
    case CLEAR_CUSTOM_FILTERS:
      baseDataInnerState = {
        customFilters: [],
      };
      break;
    case FETCH_INDICATIONS_SUCCESS:
      baseDataInnerState = {
        indications: action.payload,
      };
      break;
    case FETCH_SOURCES_SUCCESS:
      baseDataInnerState = {
        sources: action.payload,
      };
      break;
    case FETCH_LEVELS_SUCCESS: {
      const levels = action.payload.map(l => {
        switch (l.name) {
          case 'Ruby':
            return { ...l, price: 5297, posts: 108, texts: 400, emailCredits: 200 };
          case 'Diamond':
            return { ...l, price: 3297, posts: 64, texts: 300, emailCredits: 150 };
          case 'Platinum':
            return { ...l, price: 1797, posts: 32, texts: 200, emailCredits: 100 };
          case 'Gold':
            return { ...l, price: 797, posts: 10, texts: 50, emailCredits: 25 };
          case 'Silver':
            return { ...l, price: 297, posts: 3, texts: 15, emailCredits: 7 };
          case 'Bronze':
            return { ...l, price: 97, posts: 1, texts: 5, emailCredits: 2 };
          default:
            return l;
        }
      });
      baseDataInnerState = {
        levels,
      };
      break;
    }
    case FETCH_PROTOCOLS:
      baseDataInnerState = {
        protocols: {
          details: [],
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_PROTOCOLS_SUCCESS:
      baseDataInnerState = {
        protocols: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_PROTOCOLS_ERROR:
      baseDataInnerState = {
        protocols: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case FETCH_SPONSORS:
      baseDataInnerState = {
        sponsors: {
          details: [],
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_SPONSORS_SUCCESS:
      baseDataInnerState = {
        sponsors: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_SPONSORS_ERROR:
      baseDataInnerState = {
        sponsors: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case FETCH_CRO:
      baseDataInnerState = {
        cro: {
          details: [],
          fetching: true,
          error: null,
        },
      };
      break;
    case FETCH_CRO_SUCCESS:
      baseDataInnerState = {
        cro: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
      break;
    case FETCH_CRO_ERROR:
      baseDataInnerState = {
        cro: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
      break;
    case FETCH_USERS_BY_ROLE_SUCCESS:
      baseDataInnerState = {
        usersByRoles: action.payload,
      };
      break;
    default:
      return state;
  }

  if (!resultState) {
    resultState = {
      ...state,
      baseData: {
        ...state.baseData,
        ...baseDataInnerState,
      },
    };
  }

  return resultState;
}
