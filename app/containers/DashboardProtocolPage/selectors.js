import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Direct selector to the dashboardProtocolPage state domain
 */
const selectDashboardProtocolPageDomain = () => state => state.dashboardProtocolPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardProtocolPage
 */

const selectFormDomain = () => state => state.form;

const selectDashboardProtocolPage = () => createSelector(
  selectDashboardProtocolPageDomain(),
  (substate) => substate
);

const selectDashboardProtocol = () => createSelector(
  selectDashboardProtocolPage(),
  (substate) => substate.protocol
);

const selectDashboardEditProtocolProcess = () => createSelector(
  selectDashboardProtocolPage(),
  (substate) => substate.editProtocolProcess
);

const selectDashboardProtocolSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardProtocolForm.values', {})
);

const selectPaginationOptions = () => createSelector(
  selectDashboardProtocolPage(),
  substate => substate.paginationOptions
);

export default selectDashboardProtocolPage;
export {
  selectDashboardProtocolPageDomain,
  selectDashboardProtocol,
  selectDashboardEditProtocolProcess,
  selectDashboardProtocolSearchFormValues,
  selectPaginationOptions,
};
