import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';

import {
  FETCH_INDICATIONS,
  FETCH_LEVELS,
  ADD_LEVEL,
  ADD_INDICATION,
} from './constants';

import {
  fetchIndicationsSuccess,
  fetchIndicationsError,
  fetchLevelsSuccess,
  fetchLevelsError,
  addLevelSuccess,
  addLevelError,
  addIndicationError,
  addIndicationSuccess,
} from './actions';

// Individual exports for testing
export function* dashboardIndicationPageSaga() {
  const watcherA = yield fork(fetchIndicationsWatcher);
  const watcherB = yield fork(fetchLevelsWatcher);
  const watcherC = yield fork(addLevelWatcher);
  const watcherD = yield fork(addIndicationWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* fetchIndicationsWatcher() {
  yield* takeLatest(FETCH_INDICATIONS, fetchIndicationsWorker);
}

export function* fetchIndicationsWorker() {
  try {
    const requestURL = `${API_URL}/indications`;

    const filterObj = {
      include: [{
        relation: 'patientIndicationGoals',
      }],
    };


    const queryParams = {
      filter: JSON.stringify(filterObj),
    };

    const response = yield call(request, requestURL, { query: queryParams });

    yield put(fetchIndicationsSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching users');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchIndicationsError(err));
  }
}

export function* fetchLevelsWatcher() {
  yield* takeLatest(FETCH_LEVELS, fetchLevelsWorker);
}

export function* fetchLevelsWorker() {
  try {
    const requestURL = `${API_URL}/levels`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchLevelsSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching level');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchLevelsError(err));
  }
}

export function* addLevelWatcher() {
  yield* takeLatest(ADD_LEVEL, addLevelWorker);
}

export function* addLevelWorker(action) {
  try {
    const requestURL = `${API_URL}/levels`;
    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(addLevelSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving cro');
    yield put(toastrActions.error('', errorMessage));
    yield put(addLevelError(err));
  }
}

export function* addIndicationWatcher() {
  yield* takeLatest(ADD_INDICATION, addIndicationWorker);
}

export function* addIndicationWorker(action) {
  try {
    const requestURL = `${API_URL}/indications`;
    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(addIndicationSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving cro');
    yield put(toastrActions.error('', errorMessage));
    yield put(addIndicationError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardIndicationPageSaga,
];
