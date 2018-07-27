import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';

import request from '../../utils/request';
import { removeItem } from '../../utils/localStorage';

import {
  FETCH_PATIENTS,
  FETCH_SCHEDULES,
  SEARCH_FOR_PATIENTS,
} from './constants';

import {
  patientsFetched,
  patientsFetchingError,
  searchForPatientsFetched,
  searchForPatientsFetchingError,
  schedulesFetched,
  schedulesFetchingError,
} from './actions';

export function* fetchPatientsWatcher() {
  while (true) {
    const { userId, limit, offset } = yield take(FETCH_PATIENTS);
    try {
      const requestURL = `${API_URL}/patients/patientsForCallCenterUser`;
      const limitForAPIRequest = limit || 50;
      const offsetForAPIRequest = offset || 0;
      const query = {
        userId,
        limit: limitForAPIRequest,
        offset: offsetForAPIRequest,
      };
      const params = {
        method: 'GET',
        query,
      };
      const response = yield call(request, requestURL, params);
      // TODO here for lazy loading and virtual scrolling support for fetching patients in the call center
      // let hasMore = true;
      // const page = ((offsetForAPIRequest || 0) / limitForAPIRequest) + 1;
      // if (response.length < limitForAPIRequest) {
      //   hasMore = false;
      // }

      yield put(patientsFetched(response, 1, false));
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

export function* searchForPatientsWatcher() {
  while (true) {
    const { callCenterRoleId, phone } = yield take(SEARCH_FOR_PATIENTS);
    try {
      const requestURL = `${API_URL}/callCenterRoles/${callCenterRoleId}/patients`;
      const query = {
        phone,
      };
      const params = {
        method: 'GET',
        query,
      };
      const response = yield call(request, requestURL, params);

      yield put(searchForPatientsFetched(response));
    } catch (err) {
      yield put(searchForPatientsFetchingError(err));
    }
  }
}

export function* callCenterHomePageSaga() {
  const watcherA = yield fork(fetchPatientsWatcher);
  const watcherB = yield fork(fetchSchedulesWatcher);
  const watcherC = yield fork(searchForPatientsWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
}

// Bootstrap sagas
export default [
  callCenterHomePageSaga,
];
