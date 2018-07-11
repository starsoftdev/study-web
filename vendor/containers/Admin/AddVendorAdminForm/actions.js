import {
  ADD_VENDOR_ADMIN,
  ADD_VENDOR_ADMIN_SUCCEEDED,
} from './constants';

export function addVendorAdmin(body) {
  return {
    type: ADD_VENDOR_ADMIN,
    body,
  };
}

export function addVendorAdminSucceeded(response) {
  return {
    type: ADD_VENDOR_ADMIN_SUCCEEDED,
    response,
  };
}
