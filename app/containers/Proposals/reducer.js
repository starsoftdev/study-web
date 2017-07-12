/*
 *
 * Proposals reducer
 *
 */

import {
  DEFAULT_ACTION,
  GET_PROPOSALS,
  PROPOSALS_RECEIVED,
} from './constants';

const initialState = {
  proposalsFetching: false,
  proposalsList: [],
  paginationOptions: {
    hasMoreItems: true,
    page: 1,
  },
};

function proposalsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_PROPOSALS:
      return {
        ...state,
        proposalsFetching: true,
        paginationOptions:{
          hasMoreItems: false,
          page: state.paginationOptions.page,
        },
      };
    case PROPOSALS_RECEIVED:
      return {
        ...state,
        proposalsFetching: false,
        proposalsList: action.payload,
        paginationOptions: {
          hasMoreItems: action.hasMore,
          page: action.page,
        },
      };
    default:
      return state;
  }
}

export default proposalsReducer;
