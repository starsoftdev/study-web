/*
 *
 * ResetPasswordPage reducer
 *
 */

import {
  RESET_PASSWORD_SUCCESS,
  CLEAR_RESET_PASSWORD_SUCCESS,
} from './constants';

const initialState = {
  resetPasswordSuccess: null,
};

function resetPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: true,
      };
    case CLEAR_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: null,
      };
    default:
      return state;
  }
}

export default resetPasswordPageReducer;
