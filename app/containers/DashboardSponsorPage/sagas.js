import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_SPONSORS,
  ADD_SPONSOR,
  EDIT_SPONSOR,
  DELETE_SPONSOR,
} from './constants';

import {
  fetchSponsorsSuccess,
  fetchSponsorsError,
  addSponsorSuccess,
  addSponsorError,
  editSponsorSuccess,
  editSponsorError,
  deleteSponsorSuccess,
  deleteSponsorError,
} from './actions';

export function* dashboardSponsorsSaga() {
  const watcherA = yield fork(fetchSponsorsWatcher);
  const watcherB = yield fork(addSponsorWatcher);
  const watcherC = yield fork(editSponsorWatcher);
  const watcherD = yield fork(deleteSponsorWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* fetchSponsorsWatcher() {
  yield* takeLatest(FETCH_SPONSORS, fetchSponsorsWorker);
}

export function* fetchSponsorsWorker() {
  try {
    const requestURL = `${API_URL}/sponsors`;

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

export function* addSponsorWatcher() {
  yield* takeLatest(ADD_SPONSOR, addSponsorWorker);
}

export function* addSponsorWorker(action) {
  try {
    const requestURL = `${API_URL}/sponsors`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(addSponsorSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving sponsors');
    yield put(toastrActions.error('', errorMessage));
    yield put(addSponsorError(err));
  }
}

export function* editSponsorWatcher() {
  yield* takeLatest(EDIT_SPONSOR, editSponsorWorker);
}

export function* editSponsorWorker(action) {
  try {
    const requestURL = `${API_URL}/sponsors/${action.payload.id}`;

    const params = {
      method: 'PUT',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(editSponsorSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving sponsors');
    yield put(toastrActions.error('', errorMessage));
    yield put(editSponsorError(err));
  }
}

export function* deleteSponsorWatcher() {
  yield* takeLatest(DELETE_SPONSOR, deleteSponsorWorker);
}

export function* deleteSponsorWorker(action) {
  try {
    const requestURL = `${API_URL}/sponsors/${action.payload}`;

    const params = {
      method: 'DELETE',
    };
    yield call(request, requestURL, params);

    yield put(deleteSponsorSuccess({ id: action.payload }));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while deleting sponsors');
    yield put(toastrActions.error('', errorMessage));
    yield put(deleteSponsorError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardSponsorsSaga,
];
