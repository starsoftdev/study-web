/*
 *
 * DashboardResetPasswordPage reducer
 *
 */

import {
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
} from './constants';

const initialState = {
  updatePasswordProcess: {
    submitting: false,
    error: null,
  },
};

function DashboardResetPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PASSWORD:
      return {
        ...state,
        updatePasswordProcess: {
          submitting: true,
          error: null,
        },
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePasswordProcess: {
          submitting: false,
          error: null,
        },
      };
    case UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        updatePasswordProcess: {
          submitting: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export default DashboardResetPasswordPageReducer;
