import { createSelector } from 'reselect';
import { get } from 'lodash';
/**
 * Direct selector to the dashboardCouponPage state domain
 */
const selectDashboardCouponPageDomain = () => state => state.dashboardCouponPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardCouponPage
 */

const selectFormDomain = () => state => state.form;

const selectDashboardCouponPage = () => createSelector(
  selectDashboardCouponPageDomain(),
  (substate) => substate
);

const selectDashboardCoupon = () => createSelector(
  selectDashboardCouponPage(),
  (substate) => substate.coupon
);

const selectDashboardEditCouponProcess = () => createSelector(
  selectDashboardCouponPage(),
  (substate) => substate.editCouponProcess
);

const selectDashboardCouponSearchFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'dashboardCouponForm.values', {})
);

const selectPaginationOptions = () => createSelector(
  selectDashboardCouponPage(),
  substate => substate.paginationOptions
);

export default selectDashboardCouponPage;
export {
  selectDashboardCouponPageDomain,
  selectDashboardCoupon,
  selectDashboardEditCouponProcess,
  selectDashboardCouponSearchFormValues,
  selectPaginationOptions,
};
