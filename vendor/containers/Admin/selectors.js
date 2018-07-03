import { createSelector } from 'reselect';

/**
 * Direct selector to the vendor admin state domain
 */
const selectDashboard = () => state => state.vendorAdminPage;

export const selectVendorAdmins = () => createSelector(
  selectDashboard(),
  (substate) => substate.admins
);
