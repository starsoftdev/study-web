import {
  EDIT_VENDOR_ADMIN,
  EDIT_VENDOR_ADMIN_SUCCEEDED,
  EDIT_VENDOR_ADMIN_ERROR,
} from './constants';

export function editVendorAdmin(body) {
  return {
    type: EDIT_VENDOR_ADMIN,
    body,
  };
}

export function editVendorAdminSucceeded(response) {
  return {
    type: EDIT_VENDOR_ADMIN_SUCCEEDED,
    response,
  };
}

export function editVendorAdminError(response) {
  return {
    type: EDIT_VENDOR_ADMIN_ERROR,
    response,
  };
}
