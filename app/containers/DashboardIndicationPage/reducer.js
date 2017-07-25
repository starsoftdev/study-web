/*
 *
 * DashboardIndicationPage reducer
 *
 */
import _ from 'lodash';
import {
  FETCH_INDICATIONS,
  FETCH_INDICATIONS_ERROR,
  FETCH_INDICATIONS_SUCCESS,
  FETCH_LEVELS,
  FETCH_LEVELS_SUCCESS,
  FETCH_LEVELS_ERROR,
  ADD_LEVEL,
  ADD_LEVEL_SUCCESS,
  ADD_LEVEL_ERROR,
  ADD_INDICATION,
  ADD_INDICATION_SUCCESS,
  ADD_INDICATION_ERROR,
  DELETE_INDICATION,
  DELETE_INDICATION_SUCCESS,
  DELETE_INDICATION_ERROR,
  EDIT_INDICATION,
  EDIT_INDICATION_ERROR,
  EDIT_INDICATION_SUCCESS,
  SET_ACTIVE_SORT,
  SET_SEARCH_QUERY,
} from './constants';

const initialState = {
  indications: {
    details: [],
    fetching: false,
    error: null,
  },
  addLevelProcess: {
    saving: false,
    error: null,
  },
  addIndicationProcess: {
    saving: false,
    deleting: false,
    error: null,
  },
  levels: {
    details: [],
    fetching: false,
    error: null,
  },
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
    hasMoreItems: false,
    page: 1,
    query: null,
  },
};

function dashboardIndicationPageReducer(state = initialState, action) {
  const newLevel = _.cloneDeep(state.levels.details);
  const newIndications = _.cloneDeep(state.indications.details);
  let newIndicationList = [];


  switch (action.type) {
    case FETCH_INDICATIONS:
      return {
        ...state,
        indications: {
          details: state.indications.details,
          fetching: true,
          error: null,
        },
      };
    case FETCH_INDICATIONS_SUCCESS:
      if (action.page === 1) {
        newIndicationList = action.payload;
      } else {
        newIndicationList = newIndications.concat(action.payload);
      }

      return {
        ...state,
        indications: {
          details: newIndicationList,
          fetching: false,
          error: null,
        },
        paginationOptions: {
          query: state.paginationOptions.query,
          activeSort: state.paginationOptions.activeSort,
          activeDirection: state.paginationOptions.activeDirection,
          hasMoreItems: action.hasMoreItems,
          page: action.page,
        },
      };
    case FETCH_INDICATIONS_ERROR:
      return {
        ...state,
        indications: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_LEVELS:
      return {
        ...state,
        levels: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_LEVELS_SUCCESS:
      return {
        ...state,
        levels: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_LEVELS_ERROR:
      return {
        ...state,
        levels: {
          details: [],
          fetching: false,
          error: action.payload,
        },
      };
    case ADD_LEVEL:
      return {
        ...state,
        addLevelProcess: {
          saving: true,
          error: null,
        },
      };
    case ADD_LEVEL_SUCCESS:
      newLevel.push(action.payload);
      return {
        ...state,
        levels: {
          details: newLevel,
          error: action.payload,
        },
        addLevelProcess: {
          saving: false,
          error: null,
        },
      };
    case ADD_LEVEL_ERROR:
      return {
        ...state,
        addLevelProcess: {
          saving: false,
          error: action.payload,
        },
      };
    case ADD_INDICATION:
      return {
        ...state,
        addIndicationProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case ADD_INDICATION_SUCCESS:
      return {
        ...state,
        addIndicationProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case ADD_INDICATION_ERROR:
      return {
        ...state,
        addIndicationProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case DELETE_INDICATION:
      return {
        ...state,
        addIndicationProcess: {
          saving: false,
          deleting: true,
          error: null,
        },
      };
    case DELETE_INDICATION_SUCCESS:
      return {
        ...state,
        addIndicationProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case DELETE_INDICATION_ERROR:
      return {
        ...state,
        addIndicationProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case EDIT_INDICATION:
      return {
        ...state,
        addIndicationProcess: {
          saving: true,
          deleting: false,
          error: null,
        },
      };
    case EDIT_INDICATION_SUCCESS:
      return {
        ...state,
        addIndicationProcess: {
          saving: false,
          deleting: false,
          error: null,
        },
      };
    case EDIT_INDICATION_ERROR:
      return {
        ...state,
        addIndicationProcess: {
          saving: false,
          deleting: false,
          error: action.payload,
        },
      };
    case SET_ACTIVE_SORT:
      return {
        ...state,
        paginationOptions: {
          activeSort: action.sort,
          activeDirection: action.direction,
        },
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        paginationOptions: {
          activeSort: null,
          activeDirection: null,
          hasMoreItems: false,
          page: 1,
          query: action.query,
        },
      };
    default:
      return state;
  }
}

export default dashboardIndicationPageReducer;
