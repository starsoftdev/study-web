/*
 *
 * ProfilePage reducer
 *
 */

import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from 'containers/ProfilePage/constants';

const initialState = {
  changePasswordResult: {
    success: '',
    info: '',
  },
};

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordResult: {
          success: true,
          info: action.payload,
        },
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordResult: {
          success: false,
          info: action.payload,
        },
      };
    default:
      return state;
  }
}

export default profilePageReducer;
