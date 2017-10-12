/*
 *
 * ResetPasswordPage reducer
 *
 */

import {
  RESET_PASSWORD_SUCCESS,
  NEW_PASSWORD_RECEIVED,
  CLEAR_RESET_PASSWORD_SUCCESS,
} from './constants';

const initialState = {
  resetPasswordSuccess: null,
  newPassword: null,
};

function resetPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: true,
      };
    case NEW_PASSWORD_RECEIVED:
      return {
        ...state,
        newPassword: action.payload,
      };
    case CLEAR_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: null,
        newPassword: null,
      };
    default:
      return state;
  }
}

export default resetPasswordPageReducer;
