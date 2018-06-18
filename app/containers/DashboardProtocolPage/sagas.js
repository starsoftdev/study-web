import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_PROTOCOL,
  ADD_PROTOCOL,
  EDIT_PROTOCOL,
  UPLOAD_FILE,
  DELETE_PROTOCOL,
} from './constants';

import {
  fetchProtocolSuccess,
  fetchProtocolError,
  addProtocolSuccess,
  addProtocolError,
  editProtocolSuccess,
  editProtocolError,
  uploadFileSuccess,
  uploadFileError,
  deleteProtocolSuccess,
  deleteProtocolError,
} from './actions';

export function* dashboardProtocolSaga() {
  const watcherA = yield fork(fetchProtocolWatcher);
  const watcherB = yield fork(addProtocolWatcher);
  const watcherC = yield fork(editProtocolWatcher);
  const watcherD = yield fork(deleteProtocolWatcher);
  const watcherE = yield fork(uploadFileWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
}

export function* fetchProtocolWatcher() {
  yield* takeLatest(FETCH_PROTOCOL, fetchProtocolWorker);
}

export function* fetchProtocolWorker(action) {
  try {
    const query = action.query;
    const limit = action.limit || 50;
    const offset = action.offset || 0;
    let requestURL = `${API_URL}/protocols/protocolsForDashboard?limit=${limit}&offset=${offset}`;

    if (query) {
      requestURL += `&query=${query}`;
    }

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);
    let hasMore = true;
    const page = (offset / 50) + 1;
    if (response.length < 50) {
      hasMore = false;
    }
    yield put(fetchProtocolSuccess(response, hasMore, page));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching protocols');
    toastr.error('', errorMessage);
    yield put(fetchProtocolError(err));
  }
}

export function* addProtocolWatcher() {
  yield* takeLatest(ADD_PROTOCOL, addProtocolWorker);
}

export function* addProtocolWorker(action) {
  try {
    const requestURL = `${API_URL}/protocols`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(addProtocolSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving protocols');
    toastr.error('', errorMessage);
    yield put(addProtocolError(err));
  }
}

export function* editProtocolWatcher() {
  yield* takeLatest(EDIT_PROTOCOL, editProtocolWorker);
}

export function* editProtocolWorker(action) {
  try {
    const requestURL = `${API_URL}/protocols/${action.payload.id}`;

    const params = {
      method: 'PUT',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);
    if (response) {
      yield put(editProtocolSuccess(action.payload));
    } else {
      yield put(editProtocolSuccess(response));
    }
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving protocols');
    toastr.error('', errorMessage);
    yield put(editProtocolError(err));
  }
}

export function* uploadFileWatcher() {
  yield* takeLatest(UPLOAD_FILE, uploadFileWorker);
}

export function* uploadFileWorker(action) {
  const { payload } = action;

  try {
    const requestURL = `${API_URL}/protocols/${action.payload.id}`;
    const data = new FormData();
    data.append('file', payload.file);

    const options = {
      method: 'POST',
      body: data,
      useDefaultContentType: true,
    };

    const response = yield call(request, requestURL, options);
    toastr.success('', 'Success! File uploaded Successfully.');
    yield put(uploadFileSuccess(response));
  } catch (err) {
    toastr.error('', 'Error! Unable to upload File.');
    yield put(uploadFileError(err));
  }
}

export function* deleteProtocolWatcher() {
  yield* takeLatest(DELETE_PROTOCOL, deleteProtocolWorker);
}

export function* deleteProtocolWorker(action) {
  try {
    const requestURL = `${API_URL}/protocols/${action.payload}`;

    const params = {
      method: 'DELETE',
    };
    yield call(request, requestURL, params);

    yield put(deleteProtocolSuccess({ id: action.payload }));
  } catch (err) {
    const errorMessage = 'Error! Sponsor user is associated to this protocol.';
    toastr.error('', errorMessage);
    yield put(deleteProtocolError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardProtocolSaga,
];
