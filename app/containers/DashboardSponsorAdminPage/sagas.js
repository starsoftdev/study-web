import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_SPONSORS,
} from './constants';
import {
  fetchSponsorsSuccess,
  fetchSponsorsError,
} from './actions';


export default [
  dashboardSponsorAdminsSaga,
];

export function* dashboardSponsorAdminsSaga() {
  const watcherA = yield fork(fetchSponsorsWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
}

export function* fetchSponsorsWatcher() {
  yield* takeLatest(FETCH_SPONSORS, fetchSponsorsWorker);
}

export function* fetchSponsorsWorker() {
  try {
    const requestURL = `${API_URL}/clients/fetchAllSponsorsAdmins`;

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