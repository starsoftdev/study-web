/* eslint-disable comma-dangle, no-case-declarations */

const initialState = {
  paginationOptions: {
    hasMoreItems: true,
    page: 0,
  },
};

export default function adminHomeReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

