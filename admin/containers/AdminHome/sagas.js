import { takeLatest } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from '../../utils/request';
import { translate } from '../../../common/utilities/localization';

import {
  FETCH_STUDIES_FOR_ADMIN,
  FETCH_TOTALS_FOR_ADMIN,
} from './constants';

import {
  fetchStudiesForAdminSuccess,
  fetchStudiesForAdminError,
  fetchTotalsForAdminSuccess,
  fetchTotalsForAdminError,
} from './actions';

// Bootstrap sagas
export default [
  adminHomePageSaga,
];

export function* fetchStudiesForAdminWatcher() {
  yield* takeLatest(FETCH_STUDIES_FOR_ADMIN, fetchStudiesForAdminWorker);
}

export function* fetchStudiesForAdminWorker(action) {
  const { params, limit, offset } = action;
  try {
    const requestURL = `${API_URL}/studies/getStudiesForDashboard`;
    params.limit = limit;
    params.offset = offset;

    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);

    let hasMore = true;
    const page = (offset / 50) + 1;
    if (response.studies.length < 50) {
      hasMore = false;
    }

    if (response.studies.length === 0 && offset === 0) {
      toastr.error('', translate('portals.client.component.studiesList.fetchStudiesToastrError'));
    }

    yield put(fetchStudiesForAdminSuccess(response, hasMore, page));
  } catch (err) {
    console.log(err);
    yield put(fetchStudiesForAdminError(err));
  }
}

export function* fetchTotalsForAdminWatcher() {
  yield* takeLatest(FETCH_TOTALS_FOR_ADMIN, fetchTotalsForAdminWorker);
}

export function* fetchTotalsForAdminWorker(action) {
  const { params, limit, offset } = action;
  try {
    const requestURL = `${API_URL}/studies/getTotalsForDashboard`;
    params.limit = limit;
    params.offset = offset;

    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchTotalsForAdminSuccess(response));
  } catch (err) {
    console.log(err);
    yield put(fetchTotalsForAdminError(err));
  }
}

export function* adminHomePageSaga() {
  const fetchStudiesForAdminWatcher1 = yield fork(fetchStudiesForAdminWatcher);
  const fetchTotalsForAdminWatcher1 = yield fork(fetchTotalsForAdminWatcher);


  const options = yield take(LOCATION_CHANGE);
  console.log('options.payload.pathname: ', options.payload.pathname);
  if (options.payload.pathname !== '/admin/home') {
    yield cancel(fetchStudiesForAdminWatcher1);
    yield cancel(fetchTotalsForAdminWatcher1);
  }
}
