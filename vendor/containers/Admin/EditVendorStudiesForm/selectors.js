import { createSelector } from 'reselect';

/**
 * Direct selector to the vendor admin state domain
 */
const selectEditVendorStudiesForm = () => state => state.form.VendorAdminPage.EditVendorStudiesForm;

export const selectStudiesForVendor = () => createSelector(
  selectEditVendorStudiesForm(),
  (substate) => substate.vendorStudies
);
