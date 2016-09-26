
// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';

import request from 'utils/request';

import {
  fetchPatientsByStudySucceeded,
  fetchPatientsByStudyFailed,
  fetchSchedulesSucceeded,
  fetchSchedulesFailed,
  submitScheduleSucceeded,
  submitScheduleFailed,
  deleteScheduleSucceeded,
  deleteScheduleFailed,
} from './actions';

import {
  FETCH_PATIENTS_BY_STUDY,
  FETCH_SCHEDULES,
  SUBMIT_SCHEDULE,
  DELETE_SCHEDULE,
} from './constants';

// Bootstrap sagas
export default [
  CalendarPageSaga,
];

function* fetchPatientsByStudyWatcher() {
  yield* takeLatest(FETCH_PATIENTS_BY_STUDY, fetchPatientsByStudyWorker);
}

function* fetchPatientsByStudyWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.studyId}/patient-categories`;
    const params = {
      method: 'GET',
      query: action.searchParams,
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchPatientsByStudySucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching patients for selected study');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchPatientsByStudyFailed(err));
  }
}

function* fetchSchedulesWatcher() {
  yield* takeLatest(FETCH_SCHEDULES, fetchSchedulesWorker);
}

function* fetchSchedulesWorker(action) {
  try {
    const requestURL = `${API_URL}/callReminders/getSchedules`;
    const params = {
      query: action.data,
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchSchedulesSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching schedules');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchSchedulesFailed(err));
  }
}

function* submitSchedulesWatcher() {
  yield* takeLatest(SUBMIT_SCHEDULE, submitSchedulesWorker);
}

function* submitSchedulesWorker(action) {
  try {
    const requestURL = `${API_URL}/callReminders/upsertSchedule`;
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
  }
}

function* deleteSchedulesWatcher() {
  yield* takeLatest(DELETE_SCHEDULE, deleteSchedulesWorker);
}

function* deleteSchedulesWorker(action) {
  try {
    const requestURL = `${API_URL}/callReminders/${action.scheduleId}/deleteSchedule`;
    const params = {
      method: 'DELETE',
      body: JSON.stringify({ userId: action.userId }),
    };
    const response = yield call(request, requestURL, params);

    yield put(deleteScheduleSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while deleting a schedule');
    yield put(toastrActions.error('', errorMessage));
    yield put(deleteScheduleFailed(err));
  }
}

export function* CalendarPageSaga() {
  const watcherA = yield fork(fetchPatientsByStudyWatcher);
  const watcherB = yield fork(fetchSchedulesWatcher);
  const watcherC = yield fork(submitSchedulesWatcher);
  const watcherD = yield fork(deleteSchedulesWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}
