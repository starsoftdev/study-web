/*
 *
 * ProfilePage reducer
 *
 */

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from 'containers/ProfilePage/constants';

const initialState = {
  changePasswordResult: {
    success: '',
    info: '',
    passwordChanging: false,
  },
};

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordResult: {
          success: '',
          info: '',
          passwordChanging: true,
        },
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordResult: {
          success: true,
          info: action.payload,
          passwordChanging: false,
        },
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordResult: {
          success: false,
          info: action.payload,
          passwordChanging: false,
        },
      };
    default:
      return state;
  }
}

export default profilePageReducer;
