/*
 *
 * GlobalNotifications reducer
 *
 */
import _ from 'lodash';

import {
  SET_SOCKET_CONNECTION,
  SOCKET_CONNECTION_ESTABLISHED,
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_UNREAD_NOTIFICATIONS_COUNT_SUCCESS,
  RECEIVE_NOTIFICATION,
  SET_PROCESSING_STATUS,
  MARK_NOTIFICATIONS_READ,
} from './constants';

const initialState = {
  notifications: [],
  unreadNotificationsCount: 0,
  processing: false,
  socket: null,
  paginationOptions: {
    activeSort: null,
    activeDirection: null,
    hasMoreItems: false,
    page: 1,
    query: null,
    fetching: false,
  },
};

function globalNotificationsReducer(state = initialState, action) {
  let newNotifications;
  let tpmNotification;

  switch (action.type) {
    case SET_SOCKET_CONNECTION:
      return state;
    case SOCKET_CONNECTION_ESTABLISHED:
      return {
        ...state,
        socket: action.payload,
      };
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications,
        paginationOptions: {
          ...state.paginationOptions,
          fetching: true,
        },
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      newNotifications = _
        .chain(state.notifications)
        .concat(action.payload)
        .uniqBy('id')
        .filter(notif => {
          // filtering notifications so those of type set-time-zone will only be displayed to the user in question
          if (notif.event_log.eventType !== 'set-time-zone') {
            return true;
          }
          try {
            const notifData = JSON.parse(notif.event_log.eventData) || {};
            return notifData.userId ? notifData.userId === action.userId : true;
          } catch (err) {
            console.log(err);
            return true;
          }
        })
        .orderBy(['id'], ['desc'])
        .value();

      return {
        ...state,
        notifications: newNotifications,
        paginationOptions: {
          ...state.paginationOptions,
          fetching: false,
          page: action.page,
          hasMoreItems: action.hasMoreItems,
        },
      };
    case FETCH_UNREAD_NOTIFICATIONS_COUNT_SUCCESS:
      return {
        ...state,
        unreadNotificationsCount: action.payload,
      };
    case RECEIVE_NOTIFICATION:
      tpmNotification = action.payload;
      if (action.payload.event_log.__data) { // eslint-disable-line no-underscore-dangle
        tpmNotification.event_log = action.payload.event_log.__data; // eslint-disable-line no-underscore-dangle
      }
      newNotifications = _
        .chain(state.notifications)
        .concat(tpmNotification)
        .uniqBy('id')
        .orderBy(['id'], ['desc'])
        .value();
      return {
        ...state,
        notifications: newNotifications,
        unreadNotificationsCount: state.unreadNotificationsCount + 1,
      };
    case SET_PROCESSING_STATUS:
      return {
        ...state,
        processing: action.payload.status,
      };

    case MARK_NOTIFICATIONS_READ:
      return {
        ...state,
        unreadNotificationsCount: 0,
        notifications: state.notifications.map(n => ({
          ...n,
          read: true,
        })),
      };

    default:
      return state;
  }
}

export default globalNotificationsReducer;
