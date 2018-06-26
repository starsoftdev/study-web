import { takeLatest } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from '../../utils/request';

import {
  FETCH_MEDIA_TOTALS_FOR_ADMIN,
} from './constants';

import {
  fetchMediaTotalsForAdminSuccess,
  fetchMediaTotalsForAdminError,
} from './actions';

// Bootstrap sagas
export default [
  adminHomePageSaga,
];

export function* fetchMediaTotalsForAdminWatcher() {
  yield* takeLatest(FETCH_MEDIA_TOTALS_FOR_ADMIN, fetchMediaTotalsForAdminWorker);
}

export function* fetchMediaTotalsForAdminWorker(action) {
  const { params } = action;
  try {
    const requestURL = `${API_URL}/studies/getMediaTotalsForDashboard`;
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchMediaTotalsForAdminSuccess(response));
  } catch (err) {
    console.log(err);
    yield put(fetchMediaTotalsForAdminError(err));
  }
}

export function* adminHomePageSaga() {
  const fetchMediaTotalsForAdminWatcher1 = yield fork(fetchMediaTotalsForAdminWatcher);


  const options = yield take(LOCATION_CHANGE);
  console.log('options.payload.pathname: ', options.payload.pathname);
  if (options.payload.pathname !== '/admin/home') {
    yield cancel(fetchMediaTotalsForAdminWatcher1);
  }
}
