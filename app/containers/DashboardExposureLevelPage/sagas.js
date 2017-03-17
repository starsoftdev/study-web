import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_LEVEL,
  ADD_LEVEL,
  EDIT_LEVEL,
  DELETE_LEVEL,
} from './constants';

import {
  fetchLevelSuccess,
  fetchLevelError,
  addLevelSuccess,
  addLevelError,
  editLevelSuccess,
  editLevelError,
  deleteLevelSuccess,
  deleteLevelError,
} from './actions';

export function* dashboardExposureLevelSaga() {
  const watcherA = yield fork(fetchLevelWatcher);
  const watcherB = yield fork(addLevelWatcher);
  const watcherC = yield fork(editLevelWatcher);
  const watcherD = yield fork(deleteLevelWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* fetchLevelWatcher() {
  yield* takeLatest(FETCH_LEVEL, fetchLevelWorker);
}

export function* fetchLevelWorker() {
  try {
    const requestURL = `${API_URL}/cros`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchLevelSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching cro');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchLevelError(err));
  }
}

export function* addLevelWatcher() {
  yield* takeLatest(ADD_LEVEL, addLevelWorker);
}

export function* addLevelWorker(action) {
  try {
    const requestURL = `${API_URL}/cros`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(addLevelSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving cro');
    yield put(toastrActions.error('', errorMessage));
    yield put(addLevelError(err));
  }
}

export function* editLevelWatcher() {
  yield* takeLatest(EDIT_LEVEL, editLevelWorker);
}

export function* editLevelWorker(action) {
  try {
    const requestURL = `${API_URL}/cros/${action.payload.id}`;

    const params = {
      method: 'PUT',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(editLevelSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving cro');
    yield put(toastrActions.error('', errorMessage));
    yield put(editLevelError(err));
  }
}

export function* deleteLevelWatcher() {
  yield* takeLatest(DELETE_LEVEL, deleteLevelWorker);
}

export function* deleteLevelWorker(action) {
  try {
    const requestURL = `${API_URL}/cros/${action.payload}`;

    const params = {
      method: 'DELETE',
    };
    yield call(request, requestURL, params);

    yield put(deleteLevelSuccess({ id: action.payload }));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while deleting cro');
    yield put(toastrActions.error('', errorMessage));
    yield put(deleteLevelError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardExposureLevelSaga,
];
