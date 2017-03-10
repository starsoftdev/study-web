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
};

function dashboardIndicationPageReducer(state = initialState, action) {
  const newLevel = _.cloneDeep(state.levels.details);
  const newIndication = _.cloneDeep(state.indications.details);
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
      console.log('****ADED', action.payload);
      newIndication.push(action.payload);
      return {
        ...state,
        indications: {
          details: newIndication,
          error: action.payload,
        },
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
    default:
      return state;
  }
}

export default dashboardIndicationPageReducer;
