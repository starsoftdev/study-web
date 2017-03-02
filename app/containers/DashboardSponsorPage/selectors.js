import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Direct selector to the dashboardSponsorPage state domain
 */
const selectDashboardSponsorPageDomain = () => state => state.dashboardSponsorPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardSponsorPage
 */

const selectFormDomain = () => state => state.form;

const selectDashboardSponsorPage = () => createSelector(
  selectDashboardSponsorPageDomain(),
  (substate) => substate
);

const selectDashboardSponsors = () => createSelector(
  selectDashboardSponsorPageDomain(),
  (substate) => substate.sponsors
);

const selectDashboardEditSponsorProcess = () => createSelector(
  selectDashboardSponsorPageDomain(),
  (substate) => substate.editSponsorProcess
);

const selectDashboardSponsorSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardSponsorSearchForm.values', {})
);

const selectPaginationOptions = () => createSelector(
  selectDashboardSponsorPageDomain(),
  substate => substate.paginationOptions
);

export default selectDashboardSponsorPage;
export {
  selectDashboardSponsors,
  selectDashboardEditSponsorProcess,
  selectDashboardSponsorSearchFormValues,
  selectPaginationOptions,
};
