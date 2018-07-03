import {
  ADD_VENDOR_ADMIN_SUCCEEDED,
  FETCH_VENDOR_ADMINS_SUCCEEDED,
} from './constants';

const initialState = {
  admins: [],
};

export default function vendorAdminPageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_VENDOR_ADMIN_SUCCEEDED:
      return {
        ...state,
        admins: state.admins.push(action.response),
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
