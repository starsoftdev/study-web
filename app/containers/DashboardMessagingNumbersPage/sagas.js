import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_MESSAGING_NUMBERS,
  ADD_MESSAGING_NUMBER,
  EDIT_MESSAGING_NUMBER,
  DELETE_MESSAGING_NUMBER,
} from './constants';

import {
  fetchMessagingNumbersSuccess,
  fetchMessagingNumbersError,
  addMessagingNumberSuccess,
  addMessagingNumberError,
  editMessagingNumberSuccess,
  editMessagingNumberError,
  deleteMessagingNumberSuccess,
  deleteMessagingNumberError,
} from './actions';

export function* dashboardMessagingNumberSaga() {
  const watcherA = yield fork(fetchMessagingNumbersWatcher);
  const watcherB = yield fork(addMessagingNumberWatcher);
  const watcherC = yield fork(editMessagingNumberWatcher);
  const watcherD = yield fork(deleteMessagingNumberWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* fetchMessagingNumbersWatcher() {
  yield* takeLatest(FETCH_MESSAGING_NUMBERS, fetchMessagingNumbersWorker);
}

export function* fetchMessagingNumbersWorker() {
  try {
    const requestURL = `${API_URL}/twilioNumbers`;

    const filterObj = {
      include: [{
        relation: 'site',
      }],
    };

    const queryParams = {
      filter: JSON.stringify(filterObj),
    };

    const response = yield call(request, requestURL, { query: queryParams });

    yield put(fetchMessagingNumbersSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching messaging numbers');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchMessagingNumbersError(err));
  }
}

export function* addMessagingNumberWatcher() {
  yield* takeLatest(ADD_MESSAGING_NUMBER, addMessagingNumberWorker);
}

export function* addMessagingNumberWorker(action) {
  try {
    const requestURL = `${API_URL}/messaging_number`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(addMessagingNumberSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving messaging number');
    yield put(toastrActions.error('', errorMessage));
    yield put(addMessagingNumberError(err));
  }
}

export function* editMessagingNumberWatcher() {
  yield* takeLatest(EDIT_MESSAGING_NUMBER, editMessagingNumberWorker);
}

export function* editMessagingNumberWorker(action) {
  try {
    const requestURL = `${API_URL}/messaging_number/${action.payload.id}`;

    const params = {
      method: 'PUT',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(editMessagingNumberSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving messaging number');
    yield put(toastrActions.error('', errorMessage));
    yield put(editMessagingNumberError(err));
  }
}

export function* deleteMessagingNumberWatcher() {
  yield* takeLatest(DELETE_MESSAGING_NUMBER, deleteMessagingNumberWorker);
}

export function* deleteMessagingNumberWorker(action) {
  try {
    const requestURL = `${API_URL}/messaging_number/${action.payload}`;

    const params = {
      method: 'DELETE',
    };
    yield call(request, requestURL, params);

    yield put(deleteMessagingNumberSuccess({ id: action.payload }));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while deleting messaging number');
    yield put(toastrActions.error('', errorMessage));
    yield put(deleteMessagingNumberError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardMessagingNumberSaga,
];
