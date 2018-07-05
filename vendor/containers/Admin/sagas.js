import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from '../../../app/utils/request';
import { FETCH_VENDOR_ADMINS, ADD_VENDOR_ADMIN, FETCH_VENDOR_ROLE_STUDIES, SET_VENDOR_ROLE_STUDIES } from './constants';
import { fetchVendorAdminsSucceeded, addVendorAdminSucceeded } from './actions';

function* addVendorAdminWatcher() {
  yield takeLatest(ADD_VENDOR_ADMIN, addVendorAdminWorker);
}

function* addVendorAdminWorker(action) {
  try {
    const requestURL = `${API_URL}/vendors/admin`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.body),
    };
    const response = yield call(request, requestURL, params);

    yield put(addVendorAdminSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while adding a vendor admin.');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

function* fetchVendorAdminsWatcher() {
  yield takeLatest(FETCH_VENDOR_ADMINS, fetchVendorAdminsWorker);
}

function* fetchVendorAdminsWorker(action) {
  try {
    const requestURL = `${API_URL}/vendors/admins`;

    const params = {
      method: 'GET',
      query: {},
    };
    if (action.search) {
      params.query.search = action.search;
    }
    if (action.limit) {
      params.query.limit = action.limit;
    }
    if (action.offset) {
      params.query.offset = action.offset;
    }
    const response = yield call(request, requestURL, params);

    yield put(fetchVendorAdminsSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching vendor admins.');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

function* vendorAdminPageSaga() {
  const watcherA = yield fork(addVendorAdminWatcher);
  const watcherB = yield fork(fetchVendorAdminsWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  // yield cancel(watcherC);
  // yield cancel(watcherD);
}

// Bootstrap sagas
export default [
  vendorAdminPageSaga,
];
