import { createSelector } from 'reselect';

/**
 * Direct selector to the resetPasswordPage state domain
 */
const selectResetPasswordPageDomain = () => state => state.resetPasswordPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by ResetPasswordPage
 */

const selectResetPasswordPage = () => createSelector(
  selectResetPasswordPageDomain(),
  (substate) => substate
);

const selectResetPasswordSuccess = () => createSelector(
  selectResetPasswordPageDomain(),
  (substate) => substate.resetPasswordSuccess
);

export default selectResetPasswordPage;
export {
  selectResetPasswordPageDomain,
  selectResetPasswordSuccess,
};
