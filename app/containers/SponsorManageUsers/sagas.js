import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import _, { get } from 'lodash';
import { toastr } from 'react-redux-toastr';

import request from '../../utils/request';
import composeQueryString from '../../utils/composeQueryString';
import { translate } from '../../../common/utilities/localization';

import {
  FETCH_MANAGE_SPONSOR_USERS_DATA,
  EDIT_SPONSOR_USER,
  DELETE_SPONSOR_USER,
  EDIT_PROTOCOL,
} from './constants';

import {
  fetchManageSponsorUsersDataSuccess,
  fetchManageSponsorUsersDataError,
  editSponsorUserSuccess,
  editSponsorUserError,
  deleteSponsorUserSuccess,
  deleteSponsorUserError,
  editProtocolSuccess,
  editProtocolError,
} from './actions';


export function* manageSponsorUsersPageSaga() {
  const watcherA = yield fork(fetchSponsorUsersDataWatcher);
  const watcherB = yield fork(editSponsorUserWatcher);
  const watcherC = yield fork(deleteSponsorUserWatcher);
  const watcherD = yield fork(editProtocolWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* fetchSponsorUsersDataWatcher() {
  yield* takeLatest(FETCH_MANAGE_SPONSOR_USERS_DATA, fetchSponsorUsersDataWorker);
}

export function* fetchSponsorUsersDataWorker(action) {
  try {
    let queryString;
    let requestURL;
    if (action.searchParams) {
      queryString = composeQueryString(action.searchParams);
      requestURL = `${API_URL}/studies/getManageSponsorUsersData?${queryString}`;
    } else {
      requestURL = `${API_URL}/studies/getManageSponsorUsersData`;
    }
    const response = yield call(request, requestURL);
    yield put(fetchManageSponsorUsersDataSuccess(response));
  } catch (err) {
    yield put(fetchManageSponsorUsersDataError(err));
  }
}

export function* editSponsorUserWatcher() {
  yield* takeLatest(EDIT_SPONSOR_USER, editSponsorUserWorker);
}

export function* editSponsorUserWorker(action) {
  try {
    const requestURL = `${API_URL}/sponsorRoles/editSponsorUser`;
    const params = {
      method: 'PUT',
      body: JSON.stringify(action.params),
    };
    const response = yield call(request, requestURL, params);

    yield put(editSponsorUserSuccess(response));
    if (action.params.isNew) {
      toastr.success(translate('common.constants.success'), translate('sponsor.page.sponsorManageUsers.toastrAddSuccess'));
    } else {
      toastr.success(translate('common.constants.success'), translate('sponsor.page.sponsorManageUsers.toastrUpdateSuccess'));
    }
  } catch (err) {
    const errorMessage = get(err, 'message', translate('sponsor.page.sponsorManageUsers.toastrUpdateDefaultError'));
    toastr.error('', errorMessage);
    yield put(editSponsorUserError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* deleteSponsorUserWatcher() {
  yield* takeLatest(DELETE_SPONSOR_USER, deleteSponsorUserWorker);
}

export function* deleteSponsorUserWorker(action) {
  try {
    const requestURL = `${API_URL}/sponsorRoles/deleteSponsorUser`;
    const params = {
      method: 'POST',
      body: JSON.stringify(action.params),
    };
    const response = yield call(request, requestURL, params);

    yield put(deleteSponsorUserSuccess(response));
    toastr.success(translate('common.constants.success'), translate('sponsor.page.sponsorManageUsers.toastrDeleteSuccess'));
  } catch (err) {
    const errorMessage = get(err, 'message', translate('sponsor.page.sponsorManageUsers.toastrDeleteDefaultError'));
    toastr.error('', errorMessage);
    yield put(deleteSponsorUserError(err));
  }
}

export function* editProtocolWatcher() {
  yield* takeLatest(EDIT_PROTOCOL, editProtocolWorker);
}

export function* editProtocolWorker(action) {
  try {
    const requestURL = `${API_URL}/protocols/${action.payload.id}`;

    const data = new FormData();
    _.forEach(action.payload, (value, index) => {
      if (index !== 'file') {
        data.append(index, value);
      }
    });

    if (action.payload.file && action.payload.file[0]) {
      data.append('file', action.payload.file[0]);
    }

    const params = {
      method: 'PUT',
      body: data,
      useDefaultContentType: true,
    };
    const response = yield call(request, requestURL, params);

    yield put(editProtocolSuccess(response));
    toastr.success(translate('common.constants.success'), translate('client.component.editProtocolForm.toastrSuccess'));
  } catch (err) {
    const errorMessage = get(err, 'message', translate('client.component.editProtocolForm.toastrDefaultError'));
    toastr.error('', errorMessage);
    yield put(editProtocolError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

// All sagas to be loaded
export default [
  manageSponsorUsersPageSaga,
];
