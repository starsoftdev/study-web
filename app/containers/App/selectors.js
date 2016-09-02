import { createSelector } from 'reselect';

/**
 * Direct selector to the app state domain
 */
function selectGlobal(state) {
  return state.global;
}

const selectCurrentUser = createSelector(
  selectGlobal,
  (substate) => substate.currentUser
);

export {
  selectGlobal,
  selectCurrentUser,
};
