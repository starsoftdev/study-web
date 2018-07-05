import {
  FETCH_VENDOR_ADMINS,
  FETCH_VENDOR_ADMINS_SUCCEEDED,
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

export function fetchVendorAdmins(search, limit, offset) {
  return {
    type: FETCH_VENDOR_ADMINS,
    search,
    limit,
    offset,
  };
}

export function fetchVendorAdminsSucceeded(response) {
  return {
    type: FETCH_VENDOR_ADMINS_SUCCEEDED,
    response,
  };
}
