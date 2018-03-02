import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the dashboardResetPasswordPage state domain
 */
const selectDashboardResetPasswordPageDomain = () => state => state.dashboardResetPasswordPage;

/**
 * Default selector used by DashboardResetPasswordPage
 */

const selectFormDomain = () => state => state.form;

const selectDashboardResetPasswordPage = () => createSelector(
  selectDashboardResetPasswordPageDomain(),
  (substate) => substate
);

const selectDashboardResetPasswordFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardResetPasswordForm.values', {})
);

const selectDashboardResetPasswordProcess = () => createSelector(
  selectDashboardResetPasswordPageDomain(),
  (substate) => substate.updatePasswordProcess
);

export default selectDashboardResetPasswordPage;
export {
  selectDashboardResetPasswordPageDomain,
  selectDashboardResetPasswordFormValues,
  selectDashboardResetPasswordProcess,
};
