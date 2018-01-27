import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';

import {
  FETCH_LOCKED_USERS,
  UNLOCK_USER,
} from './constants';

import {
  fetchLockedUsersSuccess,
  fetchLockedUsersError,
  unlockUserSuccess,
  unlockUserError,
} from './actions';


export function* dashboardLockedUsersSaga() {
  const watcherA = yield fork(fetchLockedUsersWatcher);
  const watcherB = yield fork(unlockUserWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
}

export function* fetchLockedUsersWatcher() {
  yield* takeLatest(FETCH_LOCKED_USERS, fetchLockedUsersWorker);
}

export function* fetchLockedUsersWorker(action) {
  try {
    const query = action.query;
    const limit = action.limit || 10;
    const skip = action.skip || 0;
    let requestURL = `${API_URL}/users/fetchLockedUsers?limit=${limit}&offset=${skip}`;

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
    yield put(fetchLockedUsersSuccess(response, hasMoreItems, page));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching locked users');
    toastr.error('', errorMessage);
    yield put(fetchLockedUsersError(err));
  }
}


export function* unlockUserWatcher() {
  yield* takeLatest(UNLOCK_USER, unlockUserWorker);
}

export function* unlockUserWorker(action) {
  try {
    const requestURL = `${API_URL}/users/unlockUser`;
    const params = {
      method: 'POST',
      body: JSON.stringify({ userId: action.userId }),
    };

    yield call(request, requestURL, params);
    yield put(unlockUserSuccess(action.userId));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong');
    toastr.error('', errorMessage);
    yield put(unlockUserError(err));
  }
}


// All sagas to be loaded
export default [
  dashboardLockedUsersSaga,
];
