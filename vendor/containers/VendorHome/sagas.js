
// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import composeQueryString from '../../utils/composeQueryString';

import {
  FETCH_VENDOR_SITES,
  FETCH_PATIENT_SIGN_UPS,
  FETCH_PATIENT_MESSAGES_COUNT,
  FETCH_STUDIES,
} from './constants';

import {
  fetchVendorSitesSuccess,
  fetchVendorSitesError,
  fetchPatientSignUpsSuccess,
  fetchPatientSignUpsError,
  fetchPatientMessagesCountSuccess,
  fetchPatientMessagesCountError,
  studiesFetched,
  studiesFetchingError,
} from './actions';

// Bootstrap sagas
export default [
  vendorHomePageSaga,
];

export function* fetchStudiesWatcher() {
  yield* takeLatest(FETCH_STUDIES, fetchStudiesWorker);
}

export function* fetchStudiesWorker(action) {
  try {
    let queryString;
    let requestURL;
    if (action.searchParams) {
      queryString = composeQueryString(action.searchParams);
      requestURL = `${API_URL}/vendors/${action.currentUser.roleForVendor.vendor_id}/studiesForHomePage?${queryString}`;
    } else {
      requestURL = `${API_URL}/vendors/${action.currentUser.roleForVendor.vendor_id}/studiesForHomePage`;
    }
    const response = yield call(request, requestURL);

    yield put(studiesFetched(response));
  } catch (err) {
    yield put(studiesFetchingError(err));
  }
}

export function* fetchPatientMessagesCountWatcher() {
  yield* takeLatest(FETCH_PATIENT_MESSAGES_COUNT, fetchPatientMessagesCountWorker);
}

export function* fetchPatientMessagesCountWorker(action) {
  const { vendorId } = action;

  try {
    const requestURL = `${API_URL}/vendors/${vendorId}/patientMessageStats`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });

    yield put(fetchPatientMessagesCountSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while patient stats.');
    yield put(fetchPatientMessagesCountError(err));
    toastr.error('', errorMessage);
  }
}

export function* fetchPatientSignUpsWatcher() {
  yield* takeLatest(FETCH_PATIENT_SIGN_UPS, fetchPatientSignUpsWorker);
}

export function* fetchPatientSignUpsWorker(action) {
  const { vendorId, timezone } = action;

  try {
    const requestURL = `${API_URL}/vendors/${vendorId}/patientSignUps`;
    const response = yield call(request, requestURL, {
      method: 'GET',
      query: {
        timezone,
      },
    });

    yield put(fetchPatientSignUpsSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while patient stats.');
    yield put(fetchPatientSignUpsError(err));
    toastr.error('', errorMessage);
  }
}

export function* fetchVendorSitesWatcher() {
  yield* takeLatest(FETCH_VENDOR_SITES, fetchVendorSitesWorker);
}

export function* fetchVendorSitesWorker(action) {
  const { vendorId } = action;

  try {
    const requestURL = `${API_URL}/vendors/${vendorId}/getSitesForVendor`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });

    yield put(fetchVendorSitesSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching sites.');
    yield put(fetchVendorSitesError(err));
    toastr.error('', errorMessage);
  }
}

export function* vendorHomePageSaga() {
  const watcherA = yield fork(fetchVendorSitesWatcher);
  const watcherB = yield fork(fetchPatientSignUpsWatcher);
  const watcherC = yield fork(fetchPatientMessagesCountWatcher);
  const watcherD = yield fork(fetchStudiesWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}
