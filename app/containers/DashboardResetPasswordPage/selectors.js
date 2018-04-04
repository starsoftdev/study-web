import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboardResetPasswordPage state domain
 */
const selectDashboardResetPasswordPageDomain = () => state => state.dashboardResetPasswordPage;

/**
 * Default selector used by DashboardResetPasswordPage
 */
const selectDashboardResetPasswordPage = () => createSelector(
  selectDashboardResetPasswordPageDomain(),
  (substate) => substate
);

const selectDashboardResetPasswordProcess = () => createSelector(
  selectDashboardResetPasswordPageDomain(),
  (substate) => substate.updatePasswordProcess
);

export default selectDashboardResetPasswordPage;
export {
  selectDashboardResetPasswordPageDomain,
  selectDashboardResetPasswordProcess,
};
