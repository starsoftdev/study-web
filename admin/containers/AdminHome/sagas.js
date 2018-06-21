// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from '../../utils/request';
import {
  FETCH_TOTALS_ADMIN,
  FETCH_SOURCES,
  FETCH_STUDIES_ADMIN,
} from './constants';

import {
  fetchTotalsAdminSuccess,
  fetchTotalsAdminError,
  sourcesFetched,
  sourcesFetchingError,
  fetchStudiesAdminSuccess,
  fetchStudiesAdminError,
} from './actions';

// Bootstrap sagas
export default [
  homePageSaga,
];

export function* fetchTotalsAdminWatcher() {
  yield* takeLatest(FETCH_TOTALS_ADMIN, fetchTotalsAdminWorker);
}

export function* fetchTotalsAdminWorker(action) {
  const { params, limit, offset } = action;

  try {
    const requestURL = `${API_URL}/studies/getTotalsForDashboard`;
    params.limit = limit;
    params.offset = offset;

    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchTotalsAdminSuccess(response));
  } catch (err) {
    yield put(fetchTotalsAdminError(err));
  }
}

function* fetchSourcesWatcher() {
  while (true) {
    yield take(FETCH_SOURCES);

    try {
      const options = {
        method: 'GET',
        query: {
          filter: JSON.stringify({
            order: 'orderNumber ASC',
          }),
        },
      };
      const requestURL = `${API_URL}/sources`;
      const response = yield call(request, requestURL, options);

      yield put(sourcesFetched(response));
    } catch (e) {
      yield put(sourcesFetchingError(e));
    }
  }
}

export function* fetchStudiesAdminWatcher() {
  yield* takeLatest(FETCH_STUDIES_ADMIN, fetchStudiesAdminWorker);
}

export function* fetchStudiesAdminWorker(action) {
  const { params, limit, offset } = action;

  try {
    const requestURL = `${API_URL}/studies/getStudiesForDashboard`;
    params.limit = limit;
    params.offset = offset;

    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);

    let hasMore = true;
    const page = (offset / 50) + 1;
    if (response.studies.length < 50) {
      hasMore = false;
    }

    yield put(fetchStudiesAdminSuccess(response, hasMore, page));
  } catch (err) {
    yield put(fetchStudiesAdminError(err));
  }
}

export function* homePageSaga() {
  const watcherA = yield fork(fetchTotalsAdminWatcher);
  const watcherB = yield fork(fetchSourcesWatcher);
  const watcherC = yield fork(fetchStudiesAdminWatcher);

  // Suspend execution until location changes
  const options = yield take(LOCATION_CHANGE);
  if (options.payload.pathname !== '/app') {
    yield cancel(watcherA);
    yield cancel(watcherB);
    yield cancel(watcherC);
  }
}
