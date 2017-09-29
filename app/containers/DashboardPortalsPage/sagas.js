
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_CLIENTS,
  FETCH_SPONSORS,
} from './constants';

import {
  fetchClientsSuccess,
  fetchClientsError,
  fetchSponsorsSuccess,
  fetchSponsorsError,
} from './actions';

export function* dashboardPortalsSaga() {
  const watcherA = yield fork(fetchClientsWatcher);
  const watcherC = yield fork(fetchSponsorsWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherC);
}

export function* fetchClientsWatcher() {
  yield* takeLatest(FETCH_CLIENTS, fetchClientsWorker);
}

export function* fetchClientsWorker() {
  try {
    const requestURL = `${API_URL}/clients/superAdmins`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchClientsSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching clients');
    toastr.error('', errorMessage);
    yield put(fetchClientsError(err));
  }
}

export function* fetchSponsorsWatcher() {
  yield* takeLatest(FETCH_SPONSORS, fetchSponsorsWorker);
}

export function* fetchSponsorsWorker() {
  try {
    const requestURL = `${API_URL}/sponsors/fetchAllSponsorsAdmins`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchSponsorsSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching sponsors');
    toastr.error('', errorMessage);
    yield put(fetchSponsorsError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardPortalsSaga,
];
