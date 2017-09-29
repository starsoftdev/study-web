import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';

import {
  FETCH_ADMINS,
  EDIT_DASHBOARD_USER,
  FETCH_ADMIN_ROLES,
  DELETE_DASHBOARD_USER,
} from './constants';

import {
  fetchAdminsSuccess,
  fetchAdminsError,
  editDashboardUserSuccess,
  editDashboardUserError,
  fetchAdminRolesSuccess,
  fetchAdminRolesError,
  deleteDashboardUserSuccess,
  deleteDashboardUserError,
} from './actions';


export function* dashboardManageUsersSaga() {
  const watcherA = yield fork(fetchAdminsWatcher);
  const watcherB = yield fork(editDashboardUserWatcher);
  const watcherC = yield fork(fetchAdminRolesWatcher);
  const watcherD = yield fork(deleteDashboardUserWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* fetchAdminsWatcher() {
  yield* takeLatest(FETCH_ADMINS, fetchAdminsWorker);
}

export function* fetchAdminsWorker(action) {
  try {
    const query = action.query;
    const limit = action.limit || 10;
    const skip = action.skip || 0;
    let requestURL = `${API_URL}/users/fetchAllDashboardAdmins?limit=${limit}&offset=${skip}`;

    if (query) {
      requestURL += `&query=${query}`;
    }

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    let hasMoreItems = true;
    const page = (skip / 10) + 1;
    if (response.length < 10) {
      hasMoreItems = false;
    }
    yield put(fetchAdminsSuccess(response, hasMoreItems, page));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching users');
    toastr.error('', errorMessage);
    yield put(fetchAdminsError(err));
  }
}

export function* fetchAdminRolesWatcher() {
  yield* takeLatest(FETCH_ADMIN_ROLES, fetchAdminRolesWorker);
}

export function* fetchAdminRolesWorker() {
  try {
    const requestURL = `${API_URL}/users/fetchAllDashboardRoles`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchAdminRolesSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching roles');
    toastr.error('', errorMessage);
    yield put(fetchAdminRolesError(err));
  }
}

export function* editDashboardUserWatcher() {
  yield* takeLatest(EDIT_DASHBOARD_USER, editDashboardUserWorker);
}

export function* editDashboardUserWorker(action) {
  try {
    const requestURL = `${API_URL}/users/editDashboardUser`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };

    const response = yield call(request, requestURL, params);

    yield put(editDashboardUserSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong');
    toastr.error('', errorMessage);
    yield put(editDashboardUserError(err));
  }
}

export function* deleteDashboardUserWatcher() {
  yield* takeLatest(DELETE_DASHBOARD_USER, deleteDashboardUserWorker);
}

export function* deleteDashboardUserWorker(action) {
  try {
    const requestURL = `${API_URL}/users/deleteDashboardUser`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };

    yield call(request, requestURL, params);

    yield put(deleteDashboardUserSuccess(action.payload));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong');
    toastr.error('', errorMessage);
    yield put(deleteDashboardUserError(err));
  }
}


// All sagas to be loaded
export default [
  dashboardManageUsersSaga,
];
