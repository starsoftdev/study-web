import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_SPONSORS,
  FETCH_SPONSORS_WITHOUT_ADMIN,
} from './constants';
import {
  fetchSponsorsSuccess,
  fetchSponsorsError,
  fetchSponsorsWithoutAdminSuccess,
  fetchSponsorsWithoutAdminError,
} from './actions';


export default [
  dashboardSponsorAdminsSaga,
];

export function* dashboardSponsorAdminsSaga() {
  const watcherA = yield fork(fetchSponsorsWatcher);
  const watcherB = yield fork(fetchSponsorsWithoutAdminWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
}

export function* fetchSponsorsWatcher() {
  yield* takeLatest(FETCH_SPONSORS, fetchSponsorsWorker);
}

export function* fetchSponsorsWorker() {
  try {
    const requestURL = `${API_URL}/clients/fetchAllSponsorsAdmins`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchSponsorsSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching sponsors');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchSponsorsError(err));
  }
}

export function* fetchSponsorsWithoutAdminWatcher() {
  yield* takeLatest(FETCH_SPONSORS_WITHOUT_ADMIN, fetchSponsorsWithoutAdminWorker);
}

export function* fetchSponsorsWithoutAdminWorker() {
  try {
    const requestURL = `${API_URL}/sponsors/fetchAllSponsorsWithoutAdmin`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchSponsorsWithoutAdminSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching sponsors');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchSponsorsWithoutAdminError(err));
  }
}