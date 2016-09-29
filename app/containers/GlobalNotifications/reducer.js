/*
 *
 * GlobalNotifications reducer
 *
 */

import {
  SET_SOCKET_CONNECTION,
  SOCKET_CONNECTION_ESTABLISHED,
} from './constants';

const initialState = false;

function globalNotificationsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SOCKET_CONNECTION:
      return initialState;
    case SOCKET_CONNECTION_ESTABLISHED:
      return action.payload;
    default:
      return state;
  }
}

export default globalNotificationsReducer;
