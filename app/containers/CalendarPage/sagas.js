
// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';

import { removeItem } from '../../utils/localStorage';
import request from '../../utils/request';

import {
  fetchPatientsByStudySucceeded,
  fetchPatientsByStudyFailed,
  fetchSchedulesSucceeded,
  fetchSchedulesFailed,
  fetchSponsorSchedulesSucceeded,
  fetchSponsorSchedulesFailed,
  fetchSponsorProtocolsSucceeded,
  fetchSponsorProtocolsFailed,
  fetchSponsorSitesSucceeded,
  fetchSponsorSitesFailed,
  submitScheduleSucceeded,
  submitScheduleFailed,
  deleteScheduleSucceeded,
  deleteScheduleFailed,
} from './actions';

import {
  FETCH_PATIENTS_BY_STUDY,
  FETCH_SCHEDULES,
  FETCH_SPONSOR_SCHEDULES,
  FETCH_SPONSOR_PROTOCOLS,
  FETCH_SPONSOR_SITES,
  SUBMIT_SCHEDULE,
  DELETE_SCHEDULE,
} from './constants';

// Bootstrap sagas
export default [
  calendarPageSaga,
];

export function* fetchPatientsByStudyWatcher() {
  yield* takeLatest(FETCH_PATIENTS_BY_STUDY, fetchPatientsByStudyWorker);
}

export function* fetchPatientsByStudyWorker(action) {
  const { studyId, siteId } = action;

  try {
    const requestURL = `${API_URL}/studies/${studyId}/patients?siteId=${siteId}`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });

    yield put(fetchPatientsByStudySucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching patients for selected study');
    yield put(fetchPatientsByStudyFailed(err));
    yield put(toastrActions.error('', errorMessage));
    if (err.status === 401) {
      removeItem('auth_token');
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchSchedulesWatcher() {
  yield* takeLatest(FETCH_SCHEDULES, fetchSchedulesWorker);
}

export function* fetchSchedulesWorker(action) {
  try {
    const requestURL = `${API_URL}/appointments/schedules`;
    const params = {
      query: action.data,
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchSchedulesSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching schedules');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchSchedulesFailed(err));
    if (err.status === 401) {
      removeItem('auth_token');
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchSponsorSchedulesWatcher() {
  yield* takeLatest(FETCH_SPONSOR_SCHEDULES, fetchSponsorSchedulesWorker);
}

export function* fetchSponsorSchedulesWorker(action) {
  try {
    const requestURL = `${API_URL}/appointments/sponsorSchedules`;
    const params = {
      query: {
        sponsorId: action.sponsorId,
      },
    };

    if (action.searchParams) {
      params.query.searchParams = JSON.stringify(action.searchParams);
    }
    const response = yield call(request, requestURL, params);

    yield put(fetchSponsorSchedulesSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching schedules');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchSponsorSchedulesFailed(err));
    if (err.status === 401) {
      removeItem('auth_token');
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchSponsorSitesWatcher() {
  yield* takeLatest(FETCH_SPONSOR_SITES, fetchSponsorSitesWorker);
}

export function* fetchSponsorSitesWorker(action) {
  try {
    const requestURL = `${API_URL}/sites/getSponsorSites`;
    const params = {
      query: {
        sponsorId: action.sponsorId,
      },
    };

    if (action.searchParams) {
      params.query.searchParams = JSON.stringify(action.searchParams);
    }
    const response = yield call(request, requestURL, params);

    yield put(fetchSponsorSitesSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching sites');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchSponsorSitesFailed(err));
    if (err.status === 401) {
      removeItem('auth_token');
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchSponsorProtocolsWatcher() {
  yield* takeLatest(FETCH_SPONSOR_PROTOCOLS, fetchSponsorProtocolsWorker);
}

export function* fetchSponsorProtocolsWorker(action) {
  try {
    const limit = action.limit || 10;
    const offset = action.offset || 0;
    const sort = action.sort || null;
    const order = action.order || null;
    const params = {
      method: 'GET',
      query: {
        sponsorRoleId: action.sponsorRoleId,
      },
    };

    if (action.searchParams) {
      params.query.searchParams = JSON.stringify(action.searchParams);
    }
    params.query.limit = limit;
    params.query.offset = offset;
    if (sort && order) {
      params.query.orderBy = sort;
      params.query.orderDir = ((order === 'down') ? 'DESC' : 'ASC');
    }
    const requestURL = `${API_URL}/protocols/protocolsForHomePage`;
    const response = yield call(request, requestURL, params);

    let hasMore = true;
    const page = (offset / 10) + 1;
    if (response.length < 10) {
      hasMore = false;
    }

    yield put(fetchSponsorProtocolsSucceeded(response, hasMore, page));
  } catch (err) {
    yield put(fetchSponsorProtocolsFailed(err));
  }
}

export function* submitSchedulesWatcher() {
  yield* takeLatest(SUBMIT_SCHEDULE, submitSchedulesWorker);
}

export function* submitSchedulesWorker(action) {
  try {
    const requestURL = `${API_URL}/appointments/upsertSchedule`;
    const params = {
      method: 'POST',
      body: JSON.stringify(action.data),
    };
    const response = yield call(request, requestURL, params);

    yield put(submitScheduleSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting a schedule');
    yield put(toastrActions.error('', errorMessage));
    yield put(submitScheduleFailed(err));
    if (err.status === 401) {
      removeItem('auth_token');
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* deleteSchedulesWatcher() {
  yield* takeLatest(DELETE_SCHEDULE, deleteSchedulesWorker);
}

export function* deleteSchedulesWorker(action) {
  try {
    const requestURL = `${API_URL}/appointments/${action.scheduleId}/deleteSchedule`;
    const params = {
      method: 'DELETE',
      query: {
        clientId: action.clientId,
      },
    };
    const response = yield call(request, requestURL, params);

    yield put(deleteScheduleSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while deleting a schedule');
    yield put(toastrActions.error('', errorMessage));
    yield put(deleteScheduleFailed(err));
    if (err.status === 401) {
      removeItem('auth_token');
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* calendarPageSaga() {
  const watcherA = yield fork(fetchPatientsByStudyWatcher);
  const watcherB = yield fork(fetchSchedulesWatcher);
  const watcherC = yield fork(submitSchedulesWatcher);
  const watcherD = yield fork(deleteSchedulesWatcher);
  const watcherE = yield fork(fetchSponsorSchedulesWatcher);
  const watcherF = yield fork(fetchSponsorProtocolsWatcher);
  const watcherG = yield fork(fetchSponsorSitesWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
  yield cancel(watcherG);
}
