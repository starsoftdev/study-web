import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_SPONSORS,
  FETCH_SPONSORS_WITHOUT_ADMIN,
  FETCH_USERS_BY_ROLES,
  ADD_SPONSOR_ADMIN,
  EDIT_SPONSOR_ADMIN,
  DELETE_SPONSOR_ADMIN,
} from './constants';
import {
  fetchSponsors,
  fetchSponsorsWithoutAdmin,
  fetchSponsorsSuccess,
  fetchSponsorsError,
  fetchSponsorsWithoutAdminSuccess,
  fetchSponsorsWithoutAdminError,
  fetchUsersByRolesSuccess,
  fetchUsersByRolesError,
  addSponsorAdminSuccess,
  addSponsorAdminError,
  editSponsorAdminSuccess,
  editSponsorAdminError,
  deleteSponsorAdminSuccess,
  deleteSponsorAdminError,
} from './actions';


export default [
  dashboardSponsorAdminsSaga,
];

export function* dashboardSponsorAdminsSaga() {
  const watcherA = yield fork(fetchSponsorsWatcher);
  const watcherB = yield fork(fetchSponsorsWithoutAdminWatcher);
  const watcherC = yield fork(fetchUsersByRolesWatcher);
  const watcherD = yield fork(addSponsorAdminWatcher);
  const watcherE = yield fork(editSponsorAdminWatcher);
  const watcherF = yield fork(deleteSponsorAdminWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
}

export function* fetchSponsorsWatcher() {
  yield* takeLatest(FETCH_SPONSORS, fetchSponsorsWorker);
}

export function* fetchSponsorsWorker() {
  try {
    const requestURL = `${API_URL}/sponsors/fetchAllSponsorsAdmins`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchSponsorsSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching sponsors');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchSponsorsError(err));
  }
}

export function* fetchSponsorsWithoutAdminWatcher() {
  yield* takeLatest(FETCH_SPONSORS_WITHOUT_ADMIN, fetchSponsorsWithoutAdminWorker);
}

export function* fetchSponsorsWithoutAdminWorker() {
  try {
    const requestURL = `${API_URL}/sponsors/fetchAllSponsorsWithoutAdmin`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchSponsorsWithoutAdminSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching sponsors');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchSponsorsWithoutAdminError(err));
  }
}

export function* fetchUsersByRolesWatcher() {
  yield* takeLatest(FETCH_USERS_BY_ROLES, fetchUsersByRolesWorker);
}

export function* fetchUsersByRolesWorker() {
  try {
    const requestURL = `${API_URL}/users/fetchDashboardUsersByRole`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchUsersByRolesSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching users');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchUsersByRolesError(err));
  }
}

export function* addSponsorAdminWatcher() {
  yield* takeLatest(ADD_SPONSOR_ADMIN, addSponsorAdminWorker);
}

export function* addSponsorAdminWorker(action) {
  try {
    const requestURL = `${API_URL}/sponsors/addSponsorAdmin`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchSponsors());
    yield put(fetchSponsorsWithoutAdmin());

    yield put(addSponsorAdminSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while adding sponsor user');
    yield put(toastrActions.error('', errorMessage));
    yield put(addSponsorAdminError(err));
  }
}

export function* editSponsorAdminWatcher() {
  yield* takeLatest(EDIT_SPONSOR_ADMIN, editSponsorAdminWorker);
}

export function* editSponsorAdminWorker(action) {
  try {
    const requestURL = `${API_URL}/sponsors/editSponsorAdmin`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchSponsors());
    yield put(fetchSponsorsWithoutAdmin());

    yield put(editSponsorAdminSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while adding sponsor user');
    yield put(toastrActions.error('', errorMessage));
    yield put(editSponsorAdminError(err));
  }
}

export function* deleteSponsorAdminWatcher() {
  yield* takeLatest(DELETE_SPONSOR_ADMIN, deleteSponsorAdminWorker);
}

export function* deleteSponsorAdminWorker(action) {
  try {
    const requestURL = `${API_URL}/sponsors/deleteSponsorAdmin`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchSponsors());
    yield put(fetchSponsorsWithoutAdmin());

    yield put(deleteSponsorAdminSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while adding sponsor user');
    yield put(toastrActions.error('', errorMessage));
    yield put(deleteSponsorAdminError(err));
  }
}
