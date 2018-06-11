import { take, takeLatest, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';

import request from '../../utils/request';
import { removeItem } from '../../utils/localStorage';

import {
  FETCH_PATIENTS,
  FETCH_SCHEDULES,
} from './constants';

import {
  patientsFetched,
  patientsFetchingError,
  schedulesFetched,
  schedulesFetchingError,
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

export function* fetchSchedulesWatcher() {
  while (true) {
    yield take(FETCH_SCHEDULES);
    try {
      const requestURL = `${API_URL}/callCenterAppointments/getAppointmentsForUser`;
      const response = yield call(request, requestURL);

      yield put(schedulesFetched(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while fetching schedules.');
      toastr.error('', errorMessage);
      yield put(schedulesFetchingError(err));
      if (err.status === 401) {
        removeItem('auth_token');
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* callCenterHomePageSaga() {
  const watcherA = yield fork(fetchPatientsWatcher);
  const watcherB = yield fork(fetchSchedulesWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
}

// Bootstrap sagas
export default [
  callCenterHomePageSaga,
];
