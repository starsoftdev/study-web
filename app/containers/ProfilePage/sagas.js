// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  passwordChanged,
  passwordChangingError,
} from 'containers/ProfilePage/actions';

import {
  CHANGE_PASSWORD,
} from 'containers/ProfilePage/constants';

// Bootstrap sagas
export default [
  profilePageSaga,
];

export function* changePasswordWatcher() {
  yield* takeLatest(CHANGE_PASSWORD, changePassword);
}

export function* changePassword() {
  try {
    /* const requestURL = `${API_URL}/companyTypes`;
    const response = yield call(request, requestURL);*/
    const response = {
      test: 123,
    };

    yield put(passwordChanged(response));
  } catch (err) {
    yield put(passwordChangingError(err));
  }
}

export function* profilePageSaga() {
  const watcherA = yield fork(changePasswordWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}
