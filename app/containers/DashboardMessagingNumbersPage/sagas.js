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
  ARCHIVE_MESSAGING_NUMBER,
} from './constants';

import {
  fetchMessagingNumbersSuccess,
  fetchMessagingNumbersError,
  addMessagingNumberError,
  editMessagingNumberSuccess,
  editMessagingNumberError,
  archiveMessagingNumberSuccess,
  archiveMessagingNumberError,
} from './actions';

export function* dashboardMessagingNumberSaga() {
  const watcherA = yield fork(fetchMessagingNumbersWatcher);
  const watcherB = yield fork(addMessagingNumberWatcher);
  const watcherC = yield fork(editMessagingNumberWatcher);
  const watcherD = yield fork(archiveMessagingNumberWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* fetchMessagingNumbersWatcher() {
  yield* takeLatest(FETCH_MESSAGING_NUMBERS, fetchMessagingNumbersWorker);
}

export function* fetchMessagingNumbersWorker(action) {
  try {
    const limit = action.limit || 10;
    const offset = action.offset || 0;

    const requestURL = `${API_URL}/twilioNumbers/getMessagingNumbers?limit=${limit}&offset=${offset}`;

    const response = yield call(request, requestURL);
    let hasMoreItems = true;
    const page = (offset / 10) + 1;
    if (response.length < 10) {
      hasMoreItems = false;
    }
    yield put(fetchMessagingNumbersSuccess(response, hasMoreItems, page));
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
    yield put(addMessagingNumberError('adding a messaging number is not implemented yet'));
    console.log('adding messaging number: ', action.payload);
    /*
    const requestURL = `${API_URL}/messaging_number`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(addMessagingNumberSuccess(response));
    */
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
    const requestURL = `${API_URL}/twilioNumbers/${action.payload.id}`;

    const params = {
      method: 'PATCH',
      body: JSON.stringify({ name: action.payload.name }),
    };
    const response = yield call(request, requestURL, params);

    yield put(editMessagingNumberSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving messaging number');
    yield put(toastrActions.error('', errorMessage));
    yield put(editMessagingNumberError(err));
  }
}

export function* archiveMessagingNumberWatcher() {
  yield* takeLatest(ARCHIVE_MESSAGING_NUMBER, archiveMessagingNumberWorker);
}

export function* archiveMessagingNumberWorker(action) {
  try {
    const requestURL = `${API_URL}/twilioNumbers/${action.payload}`;

    const params = {
      method: 'PATCH',
      body: JSON.stringify({ archived: true }),
    };
    const response = yield call(request, requestURL, params);

    yield put(archiveMessagingNumberSuccess({ id: response.id }));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while archiving messaging number');
    yield put(toastrActions.error('', errorMessage));
    yield put(archiveMessagingNumberError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardMessagingNumberSaga,
];
