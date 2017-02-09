import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import composeQueryString from 'utils/composeQueryString';

import {
  GET_REPORTS_LIST,
  CHANGE_PROTOCOL_STATUS,
} from './constants';

import {
  getReportsListSuccess,
  getReportsListError,
  changeProtocolStatusSuccess,
  changeProtocolStatusError,
} from './actions';


export function* reportViewPageSaga() {
  const watcherA = yield fork(fetchReportsWatcher);
  const watcherB = yield fork(changeProtocolStatusWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
}

export function* fetchReportsWatcher() {
  yield* takeLatest(GET_REPORTS_LIST, fetchReportsWorker);
}

export function* fetchReportsWorker(action) {
  try {
    let queryString;
    let requestURL;
    if (action.searchParams) {
      queryString = composeQueryString(action.searchParams);
      requestURL = `${API_URL}/studies/getStudiesByProtocol?${queryString}`;
    } else {
      requestURL = `${API_URL}/studies/getStudiesByProtocol`;
    }
    const response = yield call(request, requestURL);
    yield put(getReportsListSuccess(response));
  } catch (err) {
    yield put(getReportsListError(err));
  }
}

export function* changeProtocolStatusWatcher() {
  yield* takeLatest(CHANGE_PROTOCOL_STATUS, changeProtocolStatusWorker);
}

export function* changeProtocolStatusWorker(action) {
  try {
    const queryString = composeQueryString(action.payload);
    const requestURL = `${API_URL}/studies/changeProtocolStatus?${queryString}`;

    const response = yield call(request, requestURL);
    yield put(changeProtocolStatusSuccess(response));
  } catch (err) {
    yield put(changeProtocolStatusError(err));
  }
}

// All sagas to be loaded
export default [
  reportViewPageSaga,
];
