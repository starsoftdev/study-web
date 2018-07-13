/* eslint-disable comma-dangle, no-case-declarations */

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
  five9List: {
    details: [],
    fetching: false,
    error: null,
  },
  campaigns: {
    details: [],
    fetching: false,
    error: null,
  },
  totals: {
    details: {},
    fetching: false,
    error: null,
  },
  mediaTotals: {
    details: {},
    fetching: false,
    error: null,
  },
  customFilters: [],
};

export default function adminHomeReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

