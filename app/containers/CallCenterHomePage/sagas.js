import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from '../../utils/request';

import {
  FETCH_PATIENTS,
} from './constants';

import {
  patientsFetched,
  patientsFetchingError,
} from './actions';

export function* fetchPatientsWatcher() {
  while (true) {
    const { userId } = yield take(FETCH_PATIENTS);
    try {
      const requestURL = `${API_URL}/patients/patientsForCallCenterUser`;
      let query = {};
      const limit = 50;
      const offset = 0;
      query = {
        userId,
        limit: limit || 50,
        offset: offset || 0,
      };
      const params = {
        method: 'GET',
        query,
      };
      const response = yield call(request, requestURL, params);
      let hasMore = true;
      const page = ((offset || 0) / limit) + 1;
      if (response.length < limit) {
        hasMore = false;
      }

      yield put(patientsFetched(response, page, hasMore));
    } catch (err) {
      yield put(patientsFetchingError(err));
    }
  }
}

export function* callCenterHomePageSaga() {
  const watcherA = yield fork(fetchPatientsWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
}

// Bootstrap sagas
export default [
  callCenterHomePageSaga,
];
