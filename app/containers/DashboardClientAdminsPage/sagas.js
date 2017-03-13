// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_SITES,
  FETCH_CLIENT_ADMINS,
  FETCH_USERS_BY_ROLES,
  ADD_CLIENT_ADMINS,
  EDIT_CLIENT_ADMINS,
  DELETE_CLIENT_ADMINS,
} from './constants';
import {
  fetchClientAdmin,
  fetchClientAdminSuccess,
  fetchClientAdminError,
  addClientAdminSuccess,
  addClientAdminError,
  editClientAdminSuccess,
  editClientAdminError,
  deleteClientAdminSuccess,
  deleteClientAdminError,
  fetchUsersByRolesSuccess,
  fetchUsersByRolesError,
  fetchSitesSuccess,
  fetchSitesError,
} from './actions';
// Individual exports for testing

// All sagas to be loaded
export default [
  dashboardClientAdminsSaga,
];

export function* dashboardClientAdminsSaga() {
  const watcherA = yield fork(fetchClientAdminWatcher);
  const watcherB = yield fork(addClientAdminWatcher);
  const watcherC = yield fork(editClientAdminWatcher);
  const watcherD = yield fork(deleteClientAdminWatcher);
  const watcherE = yield fork(fetchUsersByRolesWatcher);
  const watcherF = yield fork(fetchSitesWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
}

export function* fetchSitesWatcher() {
  yield* takeLatest(FETCH_SITES, fetchSitesWorker);
}

export function* fetchSitesWorker(action) {
  try {
    const requestURL = `${API_URL}/sites`;

    const filterObj = {
      include: [{
        relation: 'roles',
        scope: {
          include: ['user'],
        },
      }],
    };

    const searchParams = action.payload || {};

    if (searchParams.name) {
      filterObj.where = {
        name: {
          like: `%${searchParams.name}%`,
        },
      };
    }

    const queryParams = {
      filter: JSON.stringify(filterObj),
    };

    const response = yield call(request, requestURL, { query: queryParams });

    yield put(fetchSitesSuccess(response));
  } catch (e) {
    yield put(fetchSitesError(e));
  }
}

export function* fetchClientAdminWatcher() {
  yield* takeLatest(FETCH_CLIENT_ADMINS, fetchClientAdminWorker);
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

export function* fetchClientAdminWorker() {
  try {
    const requestURL = `${API_URL}/clients/fetchAllDashboardClientAdmins`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchClientAdminSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching sponsors');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchClientAdminError(err));
  }
}

export function* addClientAdminWatcher() {
  yield* takeLatest(ADD_CLIENT_ADMINS, addClientAdminWorker);
}

export function* addClientAdminWorker(action) {
  try {
    const requestURL = `${API_URL}/clients/addDashboardClientAdmin`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchClientAdmin());

    yield put(addClientAdminSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while adding sponsor user');
    yield put(toastrActions.error('', errorMessage));
    yield put(addClientAdminError(err));
  }
}

export function* editClientAdminWatcher() {
  yield* takeLatest(EDIT_CLIENT_ADMINS, editClientAdminWorker);
}

export function* editClientAdminWorker(action) {
  try {
    const requestURL = `${API_URL}/clients/editDashboardClientAdmin`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchClientAdmin());

    yield put(editClientAdminSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while adding sponsor user');
    yield put(toastrActions.error('', errorMessage));
    yield put(editClientAdminError(err));
  }
}

export function* deleteClientAdminWatcher() {
  yield* takeLatest(DELETE_CLIENT_ADMINS, deleteClientAdminWorker);
}

export function* deleteClientAdminWorker(action) {
  try {
    const { id } = action.payload;
    const requestURL = `${API_URL}/users/${id}`;

    const options = {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    };
    const response = yield call(request, requestURL, options);

    yield put(fetchClientAdmin());

    yield put(deleteClientAdminSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while adding sponsor user');
    yield put(toastrActions.error('', errorMessage));
    yield put(deleteClientAdminError(err));
  }
}
