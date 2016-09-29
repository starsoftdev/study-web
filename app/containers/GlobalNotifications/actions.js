/*
 *
 * GlobalNotifications actions
 *
 */

import {
  SET_SOCKET_CONNECTION,
  DISCONNECT_SOCKET,
  SOCKET_CONNECTION_ESTABLISHED,
  SOCKET_CONNECTION_FAILED,
  SUBSCRIBE_TO_PAGE_EVENT,
  UNSUBSCRIBE_FROM_PAGE_EVENT,
  UNSUBSCRIBE_FROM_ALL,
  SUBSCRIBE_TO_CHAT_EVENT,
} from './constants';

export function subscribeToPageEvent(payload) {
  return {
    type: SUBSCRIBE_TO_PAGE_EVENT,
    payload,
  };
}

export function subscribeToChatEvent(payload) {
  return {
    type: SUBSCRIBE_TO_CHAT_EVENT,
    payload,
  };
}

export function unsubscribeFromPageEvent(payload) {
  return {
    type: UNSUBSCRIBE_FROM_PAGE_EVENT,
    payload,
  };
}

export function unsubscribeFromAll(payload) {
  return {
    type: UNSUBSCRIBE_FROM_ALL,
    payload,
  };
}

export function setSocketConnection(payload) {
  return {
    type: SET_SOCKET_CONNECTION,
    payload,
  };
}

export function connectionEstablished(payload) {
  return {
    type: SOCKET_CONNECTION_ESTABLISHED,
    payload,
  };
}

export function disconnectSocket(payload) {
  return {
    type: DISCONNECT_SOCKET,
    payload,
  };
}

export function connectionError(payload) {
  return {
    type: SOCKET_CONNECTION_FAILED,
    payload,
  };
}
