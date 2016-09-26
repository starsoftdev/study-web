/*
 *
 * GlobalNotifications reducer
 *
 */

import {
  SET_SOCKET_CONNECTION,
  SOCKET_CONNECTION_ESTABLISHED,
  SUBSCRIBE_TO_PAGE_EVENT,
  UNSUBSCRIBE_FROM_PAGE_EVENT,
  UNSUBSCRIBE_FROM_ALL,
  SUBSCRIBE_TO_CHAT_EVENT,
  SOCKET_CONNECTION_FAILED,
  DISCONNECT_SOCKET,
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
