import {
  UPDATE_FILTERS,
} from './constants';

const initialState = {
  values: {
    filters: [],
  },
};

export default function dashboardPageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTERS:
      return {
        ...state,
        values: {
          ...state.values,
          filters: action.filters,
        },
      };
    default:
      return state;
  }
}
