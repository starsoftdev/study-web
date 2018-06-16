/* eslint-disable comma-dangle, no-case-declarations */

const initialState = {
  studies: {
    details: [],
    fetching: false,
    error: null,
  }
};

export default function adminHomeReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
