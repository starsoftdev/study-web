import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from '../../../common/utils/request';
import { FETCH_VENDOR_ADMINS } from './constants';
import { ADD_VENDOR_ADMIN } from './AddVendorAdminForm/constants';
import { EDIT_VENDOR_ADMIN } from './EditVendorAdminsForm/constants';

import { FETCH_VENDOR_STUDIES, SUBMIT_VENDOR_STUDIES, VALIDATE_STUDY_NUMBER } from './EditVendorStudiesForm/constants';
import { fetchVendorAdminsSucceeded, fetchVendorAdmins } from './actions';
import { addVendorAdminSucceeded } from './AddVendorAdminForm/actions';
import {  editVendorAdminSucceeded, editVendorAdminError } from './EditVendorAdminsForm/actions';
import { closeModal, fetchVendorStudiesSucceeded, submitVendorStudiesSucceeded } from './EditVendorStudiesForm/actions';

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


function* editVendorAdminWatcher() {
  yield takeLatest(EDIT_VENDOR_ADMIN, editVendorAdminWorker);
}

function* editVendorAdminWorker(action) {
  try {
    const requestURL = `${API_URL}/vendors/editVendorAdmin`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.body),
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchVendorAdmins());

    yield put(editVendorAdminSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while editing a vendor admin.');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
    yield put(editVendorAdminError(err));
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

function* fetchVendorStudiesWatcher() {
  yield takeLatest(FETCH_VENDOR_STUDIES, fetchVendorStudiesWorker);
}

function* fetchVendorStudiesWorker(action) {
  try {
    const requestURL = `${API_URL}/vendors/${action.vendorId}/studies`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchVendorStudiesSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching vendor studies.');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

function* setVendorStudiesWatcher() {
  yield takeLatest(SUBMIT_VENDOR_STUDIES, setVendorStudiesWorker);
}

function* setVendorStudiesWorker(action) {
  try {
    const requestURL = `${API_URL}/vendors/${action.vendorId}/studies`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.studies),
    };
    const response = yield call(request, requestURL, params);

    yield put(submitVendorStudiesSucceeded(response));
    yield put(closeModal());
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while setting a study for vendor admin.');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

function* validateStudyNumberWatcher() {
  yield takeLatest(VALIDATE_STUDY_NUMBER, validateStudyNumberWorker);
}

function* validateStudyNumberWorker(action) {
  try {
    const requestURL = `${API_URL}/vendors/${action.vendorId}/validateStudyNumber/${action.studyId}`;

    const params = {
      method: 'GET',
    };
    yield call(request, requestURL, params);
    action.resolve();
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while validating vendor admins.');
    toastr.error('', errorMessage);
    if (err.status === 400) {
      action.reject({ studyId: errorMessage });
    }
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

function* vendorAdminPageSaga() {
  const watcherA = yield fork(addVendorAdminWatcher);
  const watcherB = yield fork(fetchVendorAdminsWatcher);
  const watcherC = yield fork(fetchVendorStudiesWatcher);
  const watcherD = yield fork(setVendorStudiesWatcher);
  const watcherE = yield fork(validateStudyNumberWatcher);
  const watcherF = yield fork(editVendorAdminWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
}

// Bootstrap sagas
export default [
  vendorAdminPageSaga,
];
