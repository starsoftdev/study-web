import { createSelector } from 'reselect';

/**
 * Direct selector to the vendor admin state domain
 */
const selectEditVendorStudiesForm = () => state => state.form.VendorAdminPage.EditVendorStudiesForm;

export const selectModalOpen = () => createSelector(
  selectEditVendorStudiesForm(),
  (substate) => substate.modalOpen
);

export const selectStudiesForVendor = () => createSelector(
  selectEditVendorStudiesForm(),
  (substate) => substate.vendorStudies
);
