import {
  FETCH_VENDOR_ADMINS_SUCCEEDED,
} from './constants';

import {
  ADD_VENDOR_ADMIN_SUCCEEDED,
} from './AddVendorAdminForm/constants';

const initialState = {
  admins: [],
};

export default function vendorAdminPageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_VENDOR_ADMIN_SUCCEEDED:
      return {
        ...state,
        admins: [
          ...state.admins,
          action.response,
        ],
      };
    case FETCH_VENDOR_ADMINS_SUCCEEDED:
      return {
        ...state,
        admins: action.response,
      };
    default:
      return state;
  }
}
