/* eslint-disable no-constant-condition, consistent-return */
import { take, put, fork } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';

import {
  connectionEstablished,
} from 'containers/GlobalNotifications/actions';
import {
  SET_SOCKET_CONNECTION,
  SUBSCRIBE_TO_PAGE_EVENT,
  UNSUBSCRIBE_FROM_PAGE_EVENT,
  UNSUBSCRIBE_FROM_ALL,
  SUBSCRIBE_TO_CHAT_EVENT,
} from 'containers/GlobalNotifications/constants';

let props = null;
let socket = null;

// Individual exports for testing
export function* GlobalNotificationsSaga() {
  yield fork(setSocketConnection);
  yield fork(subscribeToPageEvent);
  yield fork(unsubscribeFromPageEvent);
  yield fork(unsubscribeFromAllEvents);
  yield fork(subscribeToChatEvent);
}

export function* setSocketConnection() {
  while (true) {
    const { payload } = yield take(SET_SOCKET_CONNECTION);
    props = (payload) ? payload.props : null;
    try {
      if (!socket) {
        const requestURL = `${SOCKET_URL}/${payload.nsp}`;
        const nsp = window.io(requestURL);
        socket = nsp;
        // const socket = yield call(connect.bind(this, payload))
        yield put(connectionEstablished(nsp));
        yield put(toastrActions.success('', 'Connected to socket.'));
        payload.cb(null, socket);
      }
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      payload.cb(err, null);
    }
  }
}

export function* subscribeToPageEvent() {
  while (true) {
    const { payload } = yield take(SUBSCRIBE_TO_PAGE_EVENT);
    try {
      // console.log('subscribeToPageEvent', payload)
      socket.emit(
        'subscribeToPageEvent',
        {
          user: props.currentUser,
          events: payload.events,
          params: payload.raw,
        },
        (err, data) => {
          payload.cb(err, data);
        }
      );
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* subscribeToChatEvent() {
  while (true) {
    const { payload } = yield take(SUBSCRIBE_TO_CHAT_EVENT);
    try {
      socket.emit('subscribeToChatEvent', {
        user: props.currentUser, events: payload.events, params: payload.raw,
      }, (err, data) => {
        payload.cb(err, data);
      });
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* unsubscribeFromPageEvent() {
  while (true) {
    const { payload } = yield take(UNSUBSCRIBE_FROM_PAGE_EVENT);
    try {
      // console.log('unsubscribeFromPageEvent', payload)
      socket.emit('unsubscribeCurrent', { events: payload.events, params: payload.raw }, (err, data) => {
        payload.cb(err, data);
      });
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* unsubscribeFromAllEvents() {
  while (true) {
    const { payload } = yield take(UNSUBSCRIBE_FROM_ALL);
    try {
      // console.log('unsubscribeFromAllEvents', payload);
      socket.emit('unsubscribeFromAll', { events: payload.events }, (err, data) => {
        payload.cb(err, data);
      });
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

// All sagas to be loaded
export default [
  GlobalNotificationsSaga,
];
