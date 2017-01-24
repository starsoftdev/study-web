import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { reset } from 'redux-form';
import { get } from 'lodash';

import request from 'utils/request';
import composeQueryString from 'utils/composeQueryString';

import {
  GET_REPORTS_LIST,
} from './constants';

import {
  getReportsListSuccess,
  getReportsListError,
} from './actions';


export function* reportViewPageSaga() {
  const watcherA = yield fork(fetchReportsWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
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

// All sagas to be loaded
export default [
  reportViewPageSaga,
];
