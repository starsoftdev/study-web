// /* eslint-disable no-constant-condition, consistent-return */

import { take, put, fork, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';

import request from '../../utils/request';
import { translate } from '../../../common/utilities/localization';

import {
  passwordChanged,
  passwordChangingError,
  imageChanged,
  imageChangingError,
  fetchOtherUserSuccess,
  fetchOtherUserError,
} from '../../containers/ProfilePage/actions';
import { logout } from '../../containers/LoginPage/actions';
import {
  CHANGE_PASSWORD,
  CHANGE_IMAGE,
  FETCH_OTHER_USER_REQUEST,
} from '../../containers/ProfilePage/constants';

// Bootstrap sagas
export default [
  profilePageSaga,
];

export function* changePassword() {
  while (true) {
    const { payload } = yield take(CHANGE_PASSWORD);

    try {
      const requestURL = `${API_URL}/userPasswordChange/change-password`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const response = yield call(request, requestURL, params);

      yield put(passwordChanged(response));
      toastr.success('', translate('client.component.changePasswordForm.changePasswordToastrSuccess'));
      yield put(logout());
    } catch (err) {
      const errorMessage = get(err, 'message', translate('client.component.changePasswordForm.changePasswordToastrError'));
      toastr.error('', errorMessage);
      yield put(passwordChangingError(err));
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* changeImage() {
  while (true) {
    const { payload } = yield take(CHANGE_IMAGE);

    try {
      const requestURL = `${API_URL}/users/${payload.user_id}/change-profile-image`;
      const data = new FormData();
      data.append('file', payload.file);

      const params = {
        method: 'POST',
        body: data,
        useDefaultContentType: true,
      };
      const response = yield call(request, requestURL, params);
      yield put(imageChanged(response));
      toastr.success('', translate('client.component.profileImageForm.changeImageToastrSuccess'));
    } catch (err) {
      yield put(imageChangingError(err));
      const errorMessage = get(err, 'message', translate('client.component.profileImageForm.changeImageToastrError'));
      toastr.error('', errorMessage);
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* fetchOtherUserWorker() {
  while (true) {
    const { payload } = yield take(FETCH_OTHER_USER_REQUEST);
    try {
      const requestURL = `${API_URL}/users/${payload.userId}`;
      const response = yield call(request, requestURL);

      yield put(fetchOtherUserSuccess(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
      yield put(fetchOtherUserError(err));
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* profilePageSaga() {
  const watcherA = yield fork(changePassword);
  const watcherB = yield fork(changeImage);
  const watcherC = yield fork(fetchOtherUserWorker);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
}
