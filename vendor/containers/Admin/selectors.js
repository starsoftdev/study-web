import { createSelector } from 'reselect';

/**
 * Direct selector to the vendor admin state domain
 */
const selectVendorAdminPage = () => state => state.vendorAdminPage;

export const selectVendorAdmins = () => createSelector(
  selectVendorAdminPage(),
  (substate) => substate.admins
);