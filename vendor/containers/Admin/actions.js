import {
  FETCH_VENDOR_ADMINS,
  FETCH_VENDOR_ADMINS_SUCCEEDED,
} from './constants';

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
