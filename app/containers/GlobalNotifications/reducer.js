/*
 *
 * GlobalNotifications reducer
 *
 */
import _ from 'lodash';

import {
  SET_SOCKET_CONNECTION,
  SOCKET_CONNECTION_ESTABLISHED,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_UNREAD_NOTIFICATIONS_COUNT_SUCCESS,
  RECEIVE_NOTIFICATION,
} from './constants';

const initialState = {
  notifications: [],
  unreadNotificationsCount: 0,
  socket: null,
};

function globalNotificationsReducer(state = initialState, action) {
  let newNotifications;

  switch (action.type) {
    case SET_SOCKET_CONNECTION:
      return state;
    case SOCKET_CONNECTION_ESTABLISHED:
      return {
        ...state,
        socket: action.payload,
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      newNotifications = _
        .chain(state.notifications)
        .concat(action.payload)
        .uniqBy('id')
        .orderBy(['notification.created_date'], ['desc'])
        .value();

      return {
        ...state,
        notifications: newNotifications,
      };
    case FETCH_UNREAD_NOTIFICATIONS_COUNT_SUCCESS:
      return {
        ...state,
        unreadNotificationsCount: action.payload,
      };
    case RECEIVE_NOTIFICATION:
      return {
        ...state,
        notifications: [{ read: false, event_log: action.payload }, ...state.notifications],
        unreadNotificationsCount: state.unreadNotificationsCount + 1,
      };
    default:
      return state;
  }
}

export default globalNotificationsReducer;
