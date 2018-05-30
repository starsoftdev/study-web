import { map, cloneDeep } from 'lodash';

import {
  FETCH_FILTERED_PROTOCOLS,
  FETCH_FILTERED_PROTOCOLS_SUCCESS,
  FETCH_FILTERED_PROTOCOLS_ERROR,
  ADD_PROTOCOL_SUCCESS,
} from '../constants';

const initialState = {
  protocols: {
    details: [],
    fetching: false,
  },
};

export default function addPatientReducer(state = initialState, action) {
  const protocols = state.protocols ? map(state.protocols.details, cloneDeep) : [];
  switch (action.type) {
    case FETCH_FILTERED_PROTOCOLS:
      return {
        ...state,
        protocols: {
          ...state.protocols,
          fetching: true,
        },
      };
    case FETCH_FILTERED_PROTOCOLS_SUCCESS:
      return {
        ...state,
        protocols: {
          details: action.payload,
          fetching: false,
        },
      };
    case ADD_PROTOCOL_SUCCESS:
      protocols.push(action.payload);
      return {
        ...state,
        protocols: {
          details: protocols,
          fetching: false,
        },
      };
    case FETCH_FILTERED_PROTOCOLS_ERROR:
      return {
        ...state,
        protocols: {
          details: [],
          fetching: false,
        },
      };
    default:
      return state;
  }
}
