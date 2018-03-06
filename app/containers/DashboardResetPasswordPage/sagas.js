import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  UPDATE_PASSWORD,
} from './constants';

import {
  updatePasswordError,
  updatePasswordSuccess,
} from './actions';

export function* dashboardResetPasswordSaga() {
  const watcherA = yield fork(updatePasswordWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
}

export function* updatePasswordWatcher() {
  yield* takeLatest(UPDATE_PASSWORD, updatePasswordWorker);
}

export function* updatePasswordWorker(action) {
  try {
    const requestURL = `${API_URL}/users/adminResetUserPassword`;
    const { userEmail, newPassword } = action.payload;

    const params = {
      method: 'POST',
      body: JSON.stringify({ email : userEmail, password: newPassword }),
    };
    const response = yield call(request, requestURL, params);

    yield put(updatePasswordSuccess(response));
    const message = 'Password updated successfully';
    toastr.success('', message);
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while updating this user\'s password');
    toastr.error('', errorMessage);
    yield put(updatePasswordError(err));
  }
}


// All sagas to be loaded
export default [
  dashboardResetPasswordSaga,
];
