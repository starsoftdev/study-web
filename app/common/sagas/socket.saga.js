/* eslint-disable no-constant-condition, consistent-return */
import { take, put, fork, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';

import request from '../../utils/request';

import {
  connectionEstablished,
  fetchNotificationsSucceeded,
  fetchUnreadNotificationsCountSucceeded,
  setProcessingStatus,
} from '../../containers/GlobalNotifications/actions';
import {
  SET_SOCKET_CONNECTION,
  SUBSCRIBE_TO_PAGE_EVENT,
  UNSUBSCRIBE_FROM_PAGE_EVENT,
  UNSUBSCRIBE_FROM_ALL,
  SUBSCRIBE_TO_CHAT_EVENT,
  FETCH_STUDY_PATIENT_MESSAGES,
  SEND_STUDY_PATIENT_MESSAGES,
  FETCH_NOTIFICATIONS,
  FETCH_UNREAD_NOTIFICATIONS_COUNT,
  MARK_NOTIFICATIONS_READ,
  CLIENT_OPENED_STUDY_PAGE,
  CLIENT_CLOSED_STUDY_PAGE,
  SUBSCRIBE_TO_UPLOAD_PROGRESS_SOCKET,
  UNSUBSCRIBE_FROM_UPLOAD_PROGRESS_SOCKET,
  SUBSCRIBE_TO_REVERT_PROGRESS_SOCKET,
  UNSUBSCRIBE_FROM_REVERT_PROGRESS_SOCKET,
} from '../../containers/GlobalNotifications/constants';

let props = null;
let socket = null;

// Individual exports for testing
export function* GlobalNotificationsSaga() {
  yield fork(setSocketConnection);
  yield fork(subscribeToPageEvent);
  yield fork(unsubscribeFromPageEvent);
  yield fork(unsubscribeFromAllEvents);
  yield fork(subscribeToChatEvent);
  yield fork(fetchStudyPatientMessages);
  yield fork(sendStudyPatientMessages);
  yield fork(subscribeToUploadProgressSocket);
  yield fork(unsubscribeFromUploadProgressSocket);
  yield fork(subscribeToRevertProgressSocket);
  yield fork(unsubscribeFromRevertProgressSocket);
  yield fork(takeLatest, FETCH_NOTIFICATIONS, fetchNotifications);
  yield fork(takeLatest, FETCH_UNREAD_NOTIFICATIONS_COUNT, fetchUnreadNotificationsCount);
  yield fork(markNotificationsReadWorker);
  yield fork(clientOpenedStudyPage);
  yield fork(clientClosedStudyPage);
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
        yield put(connectionEstablished(nsp));
        payload.cb(null, socket);
      }
    } catch (err) {
      payload.cb(err, null);
    }
  }
}

export function* subscribeToPageEvent() {
  while (true) {
    const { payload } = yield take(SUBSCRIBE_TO_PAGE_EVENT);
    try {
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
      toastr.error('', errorMessage);
    }
  }
}

export function* subscribeToUploadProgressSocket() {
  while (true) {
    const { bulkUploadId, jobId, cb } = yield take(SUBSCRIBE_TO_UPLOAD_PROGRESS_SOCKET);
    try {
      socket.emit(
        'subscribeToUploadProgressSocket',
        {
          user: props.currentUser,
          bulkUploadId,
          jobId,
        },
        (err, data) => {
          cb(err, data);
        }
      );
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
    }
  }
}

export function* unsubscribeFromUploadProgressSocket() {
  while (true) {
    const { jobId, cb } = yield take(UNSUBSCRIBE_FROM_UPLOAD_PROGRESS_SOCKET);
    try {
      socket.emit(
        'unsubscribeFromUploadProgressSocket',
        {
          user: props.currentUser,
          jobId,
        },
        (err, data) => {
          cb(err, data);
        }
      );
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
    }
  }
}

export function* subscribeToRevertProgressSocket() {
  while (true) {
    const { bulkUploadId, jobId, cb } = yield take(SUBSCRIBE_TO_REVERT_PROGRESS_SOCKET);
    try {
      socket.emit(
        'subscribeToRevertProgressSocket',
        {
          user: props.currentUser,
          bulkUploadId,
          jobId,
        },
        (err, data) => {
          cb(err, data);
        }
      );
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
    }
  }
}

export function* unsubscribeFromRevertProgressSocket() {
  while (true) {
    const { jobId, cb } = yield take(UNSUBSCRIBE_FROM_REVERT_PROGRESS_SOCKET);
    try {
      socket.emit(
        'unsubscribeFromRevertProgressSocket',
        {
          user: props.currentUser,
          jobId,
        },
        (err, data) => {
          cb(err, data);
        }
      );
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
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
      toastr.error('', errorMessage);
    }
  }
}

export function* unsubscribeFromPageEvent() {
  while (true) {
    const { payload } = yield take(UNSUBSCRIBE_FROM_PAGE_EVENT);
    try {
      socket.emit('unsubscribeCurrent', { events: payload.events, params: payload.raw }, (err, data) => {
        payload.cb(err, data);
      });
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
    }
  }
}

export function* unsubscribeFromAllEvents() {
  while (true) {
    const { payload } = yield take(UNSUBSCRIBE_FROM_ALL);
    try {
      socket.emit('unsubscribeFromAll', { events: payload.events }, (err, data) => {
        payload.cb(err, data);
      });
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
    }
  }
}

export function* fetchStudyPatientMessages() {
  while (true) {
    const { payload } = yield take(FETCH_STUDY_PATIENT_MESSAGES);
    try {
      yield put(setProcessingStatus({ status: true }));
      socket.emit('getStudyPatientMessages', { studyId: payload.studyId, patientId: payload.patientId }, (err, data) => {
        payload.cb(err, { messages: data });
      });
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
    }
  }
}

export function* sendStudyPatientMessages() {
  while (true) {
    const { payload, cb } = yield take(SEND_STUDY_PATIENT_MESSAGES);
    try {
      yield put(setProcessingStatus({ status: true }));
      socket.emit('saveTwilioTextMessages', payload, (err, data) => {
        cb(err, data);
      });
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
    }
  }
}

export function* fetchNotifications(action) {
  try {
    const userId = action.userId;
    const limit = action.limit || 50;
    const offset = action.offset || 0;
    const requestURL = `${API_URL}/users/${userId}/notifications`;
    const params = {
      method: 'GET',
      query: {
        limit,
        offset,
      },
    };
    const response = yield call(request, requestURL, params);
    let hasMore = true;
    const page = (offset / 50) + 1;
    if (response.length < 50) {
      hasMore = false;
    }
    yield put(fetchNotificationsSucceeded(response, hasMore, page, userId));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching notifications');
    toastr.error('', errorMessage);
  }
}

export function* fetchUnreadNotificationsCount(action) {
  try {
    const requestURL = `${API_URL}/users/${action.userId}/unreadNotificationsCount`;
    const response = yield call(request, requestURL);

    yield put(fetchUnreadNotificationsCountSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching unreadNotificationsCount');
    toastr.error('', errorMessage);
  }
}

export function* markNotificationsReadWorker() {
  while (true) {
    const { userId } = yield take(MARK_NOTIFICATIONS_READ);
    const requestURL = `${API_URL}/users/${userId}/markAllAsRead`;
    const params = { method: 'PUT' };

    try {
      yield call(request, requestURL, params);
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong marking notifications read');
      toastr.error('', errorMessage);
    }
  }
}

export function* clientOpenedStudyPage() {
  while (true) {
    const { studyId } = yield take(CLIENT_OPENED_STUDY_PAGE);
    try {
      socket.emit('clientOpenedStudyPage', { studyId }, () => {});
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
    }
  }
}

export function* clientClosedStudyPage() {
  while (true) {
    const { studyId } = yield take(CLIENT_CLOSED_STUDY_PAGE);
    try {
      socket.emit('clientClosedStudyPage', { studyId }, () => {});
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
    }
  }
}

// All sagas to be loaded
export default [
  GlobalNotificationsSaga,
];
