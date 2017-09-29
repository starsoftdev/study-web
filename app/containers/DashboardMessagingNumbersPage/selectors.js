import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Direct selector to the DashboardMessagingNumbersPage state domain
 */
const selectDashboardMessagingNumbersPageDomain = () => state => state.dashboardMessagingNumbersPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardMessagingNumbersPage
 */

const selectFormDomain = () => state => state.form;

const selectDashboardMessagingNumbersPage = () => createSelector(
  selectDashboardMessagingNumbersPageDomain(),
  (substate) => substate
);

const selectDashboardMessagingNumber = () => createSelector(
  selectDashboardMessagingNumbersPageDomain(),
  (substate) => substate.messagingNumber
);

const selectDashboardAvailableNumber = () => createSelector(
  selectDashboardMessagingNumbersPageDomain(),
  (substate) => substate.availableNumber
);

const selectDashboardEditMessagingNumberProcess = () => createSelector(
  selectDashboardMessagingNumbersPageDomain(),
  (substate) => substate.editMessagingNumberProcess
);

const selectDashboardMessagingNumberSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardMessagingNumberForm.values', {})
);

const selectDashboardAddMessagingNumberFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardAddMessagingNumberForm.values', {})
);

const selectPaginationOptions = () => createSelector(
  selectDashboardMessagingNumbersPageDomain(),
  (substate) => substate.paginationOptions
);

export default selectDashboardMessagingNumbersPage;
export {
  selectDashboardMessagingNumbersPageDomain,
  selectDashboardMessagingNumber,
  selectDashboardAvailableNumber,
  selectDashboardEditMessagingNumberProcess,
  selectDashboardMessagingNumberSearchFormValues,
  selectDashboardAddMessagingNumberFormValues,
  selectPaginationOptions,
};
