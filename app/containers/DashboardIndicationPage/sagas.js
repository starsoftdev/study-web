import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';

import {
  FETCH_INDICATIONS,
} from './constants';

import {
  fetchIndicationsSuccess,
  fetchIndicationsError,
} from './actions';

// Individual exports for testing
export function* dashboardIndicationPageSaga() {
  const watcherA = yield fork(fetchIndicationsWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
}

export function* fetchIndicationsWatcher() {
  yield* takeLatest(FETCH_INDICATIONS, fetchIndicationsWorker);
}

export function* fetchIndicationsWorker() {
  try {
    const requestURL = `${API_URL}/indications/patientGoal`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchIndicationsSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching users');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchIndicationsError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardIndicationPageSaga,
];
