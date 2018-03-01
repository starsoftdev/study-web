// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_SITES,
  FETCH_CLIENT_ADMINS,
  FETCH_USERS_BY_ROLES,
  ADD_CLIENT_ADMINS,
  EDIT_CLIENT_ADMINS,
  DELETE_CLIENT_ADMINS,
  GET_AVAIL_PHONE_NUMBERS,
  EDIT_MESSAGING_NUMBER,
  ADD_MESSAGING_NUMBER,
} from './constants';
import {
  fetchClientAdmin,
  getAvailPhoneNumbers,
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
  getAvailPhoneNumbersSuccess,
  getAvailPhoneNumbersError,
  editMessagingNumberSuccess,
  editMessagingNumberError,
  addMessagingNumberSuccess,
  addMessagingNumberError,
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
  const watcherG = yield fork(getAvailPhoneNumbersWatcher);
  const watcherH = yield fork(editMessagingNumberWatcher);
  const watcherI = yield fork(addMessagingNumberWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
  yield cancel(watcherG);
  yield cancel(watcherH);
  yield cancel(watcherI);
}

export function* addMessagingNumberWatcher() {
  yield* takeLatest(ADD_MESSAGING_NUMBER, addMessagingNumberWorker);
}

export function* addMessagingNumberWorker(action) {
  try {
    const requestURL = `${API_URL}/twilioNumbers`;
    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(getAvailPhoneNumbers());

    yield put(addMessagingNumberSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while adding sponsor user');
    toastr.error('', errorMessage);
    yield put(addMessagingNumberError(err));
  }
}

export function* editMessagingNumberWatcher() {
  yield* takeLatest(EDIT_MESSAGING_NUMBER, editMessagingNumberWorker);
}

export function* editMessagingNumberWorker(action) {
  try {
    const requestURL = `${API_URL}/clients/editDashboardSiteMessagingNumber`;

    const params = {
      method: 'POST',
      body: JSON.stringify({ params: action.payload }),
    };
    const response = yield call(request, requestURL, params);

    yield put(editMessagingNumberSuccess(response));
  } catch (err) {
    if (get(err, 'constraint') === 'twilio_number_id_idx') {
      toastr.error('', 'This number has already been assigned.');
    } else {
      const errorMessage = get(err, 'message', 'Something went wrong while editing the messaging number.');
      toastr.error('', errorMessage);
    }
    yield put(editMessagingNumberError(err));
  }
}

export function* getAvailPhoneNumbersWatcher() {
  yield* takeLatest(GET_AVAIL_PHONE_NUMBERS, getAvailPhoneNumbersWorker);
}

export function* getAvailPhoneNumbersWorker() {
  try {
    const requestURL = `${API_URL}/twilioNumbers`;
    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);
    yield put(getAvailPhoneNumbersSuccess(response));
  } catch (e) {
    yield put(getAvailPhoneNumbersError(e));
  }
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
          include: [{
            relation: 'user',
            scope: {
              where: { isArchived: false },
            },
          }],
        },
      }, {
        relation: 'twilioNumber',
      }, {
        relation: 'rewards',
      }],
    };

    const clientId = action.clientId || null;

    if (clientId) {
      filterObj.where = {
        client_id: clientId,
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
    toastr.error('', errorMessage);
    yield put(fetchUsersByRolesError(err));
  }
}

export function* fetchClientAdminWatcher() {
  yield* takeLatest(FETCH_CLIENT_ADMINS, fetchClientAdminWorker);
}

export function* fetchClientAdminWorker(action) {
  try {
    const query = action.query;
    const limit = action.limit || 50;
    const offset = action.offset || 0;
    const orderDir = action.orderDir || 'ASC';

    let requestURL = `${API_URL}/clients/fetchAllDashboardClientAdmins?limit=${limit}&offset=${offset}&orderDir=${orderDir}`;

    if (query) {
      requestURL += `&query=${query}`;
    }

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    let hasMore = true;
    const page = (offset / 50) + 1;
    if (response.length < 50) {
      hasMore = false;
    }
    yield put(fetchClientAdminSuccess(response, hasMore, page));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching sponsors');
    toastr.error('', errorMessage);
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
    toastr.error('', errorMessage);
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
    toastr.error('', errorMessage);
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
    toastr.error('', errorMessage);
    yield put(deleteClientAdminError(err));
  }
}
