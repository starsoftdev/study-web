/* eslint-disable no-constant-condition, consistent-return */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';

import request from 'utils/request';
import composeQueryString from 'utils/composeQueryString';
import {
  FETCH_CLIENT_SITES,
  FETCH_CLIENT_ROLES,
  FETCH_SITE,
  FETCH_USER,
  DELETE_USER,
  DELETE_CLIENT_ROLE,
  SAVE_SITE,
  SAVE_USER,
} from './constants';

import {
  clientSitesFetched,
  clientSitesFetchingError,
  clientRolesFetched,
  clientRolesFetchingError,
  siteFetched,
  siteFetchingError,
  userFetched,
  userFetchingError,
  userDeleted,
  userDeletingError,
  clientRoleDeleted,
  clientRoleDeletingError,
  siteSaved,
  siteSavingError,
  userSaved,
  userSavingError,
} from './actions';

export function* sitesUsersPageSaga() {
  const watcherA = yield fork(fetchClientSitesWatcher);
  const watcherB = yield fork(fetchClientRolesWatcher);
  const watcherC = yield fork(fetchSiteWatcher);
  const watcherD = yield fork(fetchUserWatcher);
  const watcherE = yield fork(deleteUserWatcher);
  const watcherF = yield fork(deleteClientRoleWatcher);
  const watcherG = yield fork(saveSiteWatcher);
  const watcherH = yield fork(saveUserWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
  yield cancel(watcherG);
  yield cancel(watcherH);
}

// Bootstrap sagas
export default [
  sitesUsersPageSaga,
];

export function* fetchClientSitesWatcher() {
  while (true) {
    const { clientId, searchParams } = yield take(FETCH_CLIENT_SITES);

    try {
      const filterObj = {
        include: ['users', 'studies'],
        where: {},
      };

      if (searchParams && searchParams.name) {
        filterObj.where = {
          name: {
            like: `%${searchParams.name}%`,
            options: 'i',
          },
        };
      }

      const queryParams = {
        filter: JSON.stringify(filterObj),
      };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/clients/${clientId}/sites?${queryString}`;
      const response = yield call(request, requestURL);

      yield put(clientSitesFetched(response));
    } catch (err) {
      yield put(clientSitesFetchingError(err));
    }
  }
}

export function* fetchClientRolesWatcher() {
  while (true) {
    const { clientId, searchParams } = yield take(FETCH_CLIENT_ROLES);

    try {
      const filterObj = {
        include: 'user',
        where: {},
      };

      if (searchParams && searchParams.name) {
        filterObj.where = {
          name: {
            like: `%${searchParams.name}%`,
            options: 'i',
          },
        };
      }

      const queryParams = {
        filter: JSON.stringify(filterObj),
      };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/clients/${clientId}/roles?${queryString}`;
      const response = yield call(request, requestURL);

      yield put(clientRolesFetched(response));
    } catch (err) {
      yield put(clientRolesFetchingError(err));
    }
  }
}

export function* fetchSiteWatcher() {
  while (true) {
    const { id } = yield take(FETCH_SITE);

    try {
      const requestURL = `${API_URL}/sites/${id}`;
      const response = yield call(request, requestURL);

      yield put(siteFetched(response));
    } catch (err) {
      yield put(siteFetchingError(err));
    }
  }
}

export function* fetchUserWatcher() {
  while (true) {
    const { id } = yield take(FETCH_USER);

    try {
      const queryParams = { filter: '{"include":"roleForClient"}' };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/users/${id}?${queryString}`;
      const response = yield call(request, requestURL);

      yield put(userFetched(response));
    } catch (err) {
      yield put(userFetchingError(err));
    }
  }
}

export function* deleteUserWatcher() {
  while (true) {
    const { id } = yield take(DELETE_USER);

    try {
      const requestURL = `${API_URL}/users/${id}`;
      const options = {
        method: 'DELETE',
      };
      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('Delete User', 'User deleted successfully!'));
      yield put(userDeleted(id, response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(userDeletingError(err));
    }
  }
}

export function* deleteClientRoleWatcher() {
  while (true) {
    const { id } = yield take(DELETE_CLIENT_ROLE);

    try {
      const requestURL = `${API_URL}/clientRoles/${id}`;
      const options = {
        method: 'DELETE',
      };
      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('Delete Client Role', 'Client Role deleted successfully!'));
      yield put(clientRoleDeleted(id, response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(clientRoleDeletingError(err));
    }
  }
}

export function* saveSiteWatcher() {
  while (true) {
    const { clientId, id, data } = yield take(SAVE_SITE);

    try {
      let requestURL = null;
      let options = null;
      data.client_id = clientId;

      if (id) {
        requestURL = `${API_URL}/sites/${id}`;
        options = {
          method: 'PUT',
          body: JSON.stringify(data),
        };
      } else {
        requestURL = `${API_URL}/sites`;
        options = {
          method: 'POST',
          body: JSON.stringify(data),
        };
      }

      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('Save Site', 'Site saved successfully!'));
      yield put(siteSaved(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(siteSavingError(err));
    }
  }
}

export function* saveUserWatcher() {
  while (true) {
    const { clientId, id, data } = yield take(SAVE_USER);

    try {
      let requestURL = null;
      let options = null;

      if (id) {
        data.userId = id;
        requestURL = `${API_URL}/clients/${clientId}/updateUserWithClientRole`;
        options = {
          method: 'PUT',
          body: JSON.stringify(data),
        };
      } else {
        requestURL = `${API_URL}/clients/${clientId}/addUserWithClientRole`;
        options = {
          method: 'POST',
          body: JSON.stringify(data),
        };
      }

      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('Save User', 'User saved successfully!'));
      yield put(userSaved(data.siteId, response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(userSavingError(err));
    }
  }
}
