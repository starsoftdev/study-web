
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import { setItem } from '../../utils/localStorage';
import {
  FETCH_CLIENTS,
  SUBMIT_TO_CLIENT_PORTAL,
  FETCH_SPONSORS,
  SUBMIT_TO_SPONSOR_PORTAL,
} from './constants';

import { setUserData } from '../../containers/App/actions';
import {
  fetchClientsSuccess,
  fetchClientsError,
  fetchSponsorsSuccess,
  fetchSponsorsError,
} from './actions';

export function* dashboardPortalsSaga() {
  const watcherA = yield fork(fetchClientsWatcher);
  const watcherB = yield fork(submitToClientPortalWatcher);
  const watcherC = yield fork(fetchSponsorsWatcher);
  const watcherD = yield fork(submitToSponsorPortalWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* submitToSponsorPortalWatcher() {
  yield* takeLatest(SUBMIT_TO_SPONSOR_PORTAL, submitToSponsorPortalWorker);
}

export function* submitToSponsorPortalWorker(action) {
  try {
    const requestURL = `${API_URL}/users/${action.userId}/get-full-user-info`;
    const response = yield call(request, requestURL);

    yield call(setItem, 'user_id', response.id);
    yield put(setUserData(response));
    yield put(push('/app'));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong');
    yield put(toastrActions.error('', errorMessage));
  }
}

export function* submitToClientPortalWatcher() {
  yield* takeLatest(SUBMIT_TO_CLIENT_PORTAL, submitToClientPortalWorker);
}

export function* submitToClientPortalWorker(action) {
  try {
    const requestURL = `${API_URL}/users/${action.userId}/get-full-user-info`;
    const response = yield call(request, requestURL);

    yield call(setItem, 'user_id', response.id);
    yield put(setUserData(response));
    yield put(push('/app'));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong');
    yield put(toastrActions.error('', errorMessage));
  }
}

export function* fetchClientsWatcher() {
  yield* takeLatest(FETCH_CLIENTS, fetchClientsWorker);
}

export function* fetchClientsWorker() {
  try {
    const requestURL = `${API_URL}/clients/fetchAllClientAdmins`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchClientsSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching clients');
    yield put(toastrActions.error('', errorMessage));
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
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchSponsorsError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardPortalsSaga,
];
