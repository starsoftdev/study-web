import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_MESSAGING_NUMBERS,
  FETCH_AVAILABLE_NUMBERS,
  ADD_MESSAGING_NUMBER,
  EDIT_MESSAGING_NUMBER,
  ARCHIVE_MESSAGING_NUMBER,
} from './constants';

import {
  fetchMessagingNumbersSuccess,
  fetchMessagingNumbersError,
  fetchAvailableNumberSuccess,
  fetchAvailableNumberError,
  addMessagingNumberError,
  addMessagingNumberSuccess,
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
  const watcherF = yield fork(fetchAvailableNumberWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherF);
}

export function* fetchMessagingNumbersWatcher() {
  yield* takeLatest(FETCH_MESSAGING_NUMBERS, fetchMessagingNumbersWorker);
}

export function* fetchMessagingNumbersWorker(action) {
  try {
    const query = action.query;
    const limit = action.limit || 50;
    const offset = action.offset || 0;

    let requestURL = `${API_URL}/twilioNumbers/getMessagingNumbers?limit=${limit}&offset=${offset}`;

    if (query) {
      requestURL += `&query=${query}`;
    }

    const response = yield call(request, requestURL);
    let hasMoreItems = true;
    const page = (offset / 50) + 1;
    if (response.length < 50) {
      hasMoreItems = false;
    }
    yield put(fetchMessagingNumbersSuccess(response, hasMoreItems, page));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching messaging numbers');
    toastr.error('', errorMessage);
    yield put(fetchMessagingNumbersError(err));
  }
}

export function* addMessagingNumberWatcher() {
  yield* takeLatest(ADD_MESSAGING_NUMBER, addMessagingNumberWorker);
}

export function* addMessagingNumberWorker(action) {
  try {
    // yield put(addMessagingNumberError('adding a messaging number is not implemented yet'));
    console.log('adding messaging number: ', action.payload);
    const requestURL = `${API_URL}/twilioNumbers/buyNumber`;

    const params = {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber: action.payload,
      }),
    };
    const response = yield call(request, requestURL, params);

    yield put(addMessagingNumberSuccess(response));
    const message = 'Phone Number bought successfully';
    toastr.success('', message);
  } catch (err) {
    let errorMessage = get(err, 'message', 'Something went wrong while saving messaging number');
    const code = get(err, 'code', 31000);
    if (code === 21615) {
      errorMessage = 'Error! Local address required.';
    }
    toastr.error('', errorMessage);
    yield put(addMessagingNumberError(err));
  }
}

export function* fetchAvailableNumberWatcher() {
  yield* takeLatest(FETCH_AVAILABLE_NUMBERS, fetchAvailableNumberWorker);
}

export function* fetchAvailableNumberWorker(action) {
  try {
    const { country, areaCode, any, voice, sms, mms } = action.payload;
    let requestURL = `${API_URL}/twilioNumbers/getAvailableNumbers?country=${country}`;

    if (areaCode) {
      requestURL += `&areaCode=${areaCode}`;
    }
    const capabilities = {
      any,
      voice,
      sms,
      mms,
    };
    requestURL += `&capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);
    yield put(fetchAvailableNumberSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving messaging number');
    toastr.error('', errorMessage);
    yield put(fetchAvailableNumberError(err));
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
    toastr.error('', errorMessage);
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
      method: 'DELETE',
    };
    const response = yield call(request, requestURL, params);

    yield put(archiveMessagingNumberSuccess({ id: response.id }));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while archiving messaging number');
    toastr.error('', errorMessage);
    yield put(archiveMessagingNumberError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardMessagingNumberSaga,
];
