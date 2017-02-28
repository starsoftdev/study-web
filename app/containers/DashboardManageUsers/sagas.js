import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
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

export function* fetchAdminsWorker() {
  try {
    const requestURL = `${API_URL}/users/fetchAllDashboardAdmins`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchAdminsSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching users');
    yield put(toastrActions.error('', errorMessage));
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
    yield put(toastrActions.error('', errorMessage));
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
    yield put(toastrActions.error('', errorMessage));
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

    const response = yield call(request, requestURL, params);

    yield put(deleteDashboardUserSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong');
    yield put(toastrActions.error('', errorMessage));
    yield put(deleteDashboardUserError(err));
  }
}


// All sagas to be loaded
export default [
  dashboardManageUsersSaga,
];
