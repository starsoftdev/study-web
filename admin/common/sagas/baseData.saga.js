/* eslint-disable no-constant-condition, consistent-return */

import { take, call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import composeQueryString from '../../utils/composeQueryString';

import {
  FETCH_INDICATIONS,
  FETCH_SOURCES,
  FETCH_LEVELS,
  FETCH_SPONSORS,
  FETCH_PROTOCOLS,
  FETCH_CRO,
  FETCH_USERS_BY_ROLE,
  FETCH_STUDIES_FOR_ADMIN,
  FETCH_TOTALS_FOR_ADMIN,
} from '../../containers/App/constants';

import {
  indicationsFetched,
  indicationsFetchingError,
  sourcesFetched,
  sourcesFetchingError,
  levelsFetched,
  levelsFetchingError,
  fetchSponsorsSuccess,
  fetchSponsorsError,
  fetchProtocolsSuccess,
  fetchProtocolsError,
  fetchCroSuccess,
  fetchCroError,
  fetchUsersByRoleSuccess,
  fetchUsersByRoleError,
  fetchStudiesForAdminError,
  fetchStudiesForAdminSuccess,
  fetchTotalsForAdminError,
  fetchTotalsForAdminSuccess,
} from '../../containers/App/actions';
import { translate } from '../../../common/utilities/localization';

export default function* baseDataSaga() {
  yield fork(fetchIndicationsWatcher);
  yield fork(fetchSourcesWatcher);
  yield fork(fetchLevelsWatcher);
  yield fork(fetchSponsorsWatcher);
  yield fork(fetchProtocolsWatcher);
  yield fork(fetchCroWatcher);
  yield fork(fetchUsersByRoleWatcher);
  yield fork(fetchStudiesForAdminWatcher);
  yield fork(fetchTotalsForAdminWatcher);
}

function* fetchIndicationsWatcher() {
  while (true) {
    yield take(FETCH_INDICATIONS);

    try {
      const requestURL = `${API_URL}/indications`;

      const options = {
        method: 'GET',
        query: {
          filter: JSON.stringify({
            order: 'name',
            where: {
              isArchived: false,
            },
          }),
        },
      };

      const response = yield call(request, requestURL, options);

      yield put(indicationsFetched(response));
    } catch (e) {
      yield put(indicationsFetchingError(e));
    }
  }
}

function* fetchSourcesWatcher() {
  while (true) {
    yield take(FETCH_SOURCES);

    try {
      const options = {
        method: 'GET',
        query: {
          filter: JSON.stringify({
            order: 'orderNumber ASC',
          }),
        },
      };
      const requestURL = `${API_URL}/sources`;
      const response = yield call(request, requestURL, options);

      yield put(sourcesFetched(response));
    } catch (e) {
      yield put(sourcesFetchingError(e));
    }
  }
}

function* fetchLevelsWatcher() {
  while (true) {
    yield take(FETCH_LEVELS);

    try {
      const filterObj = {
        where: {
          isArchived: false,
          isActive: true,
        },
        order: 'position DESC',
      };

      const queryParams = {
        filter: JSON.stringify(filterObj),
      };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/levels?${queryString}`;
      const response = yield call(request, requestURL);

      yield put(levelsFetched(response));
    } catch (e) {
      yield put(levelsFetchingError(e));
    }
  }
}

function* fetchSponsorsWatcher() {
  while (true) {
    yield take(FETCH_SPONSORS);

    try {
      const requestURL = `${API_URL}/sponsors`;

      const params = {
        method: 'GET',
      };
      const response = yield call(request, requestURL, params);

      yield put(fetchSponsorsSuccess(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while fetching sponsors');
      toastr.error('', errorMessage);
      yield put(fetchSponsorsError(err));
    }
  }
}

function* fetchProtocolsWatcher() {
  while (true) {
    const { clientRoleId, sponsorRoleId } = yield take(FETCH_PROTOCOLS);

    try {
      const requestURL = `${API_URL}/protocols`;

      const params = {
        method: 'GET',
        query: {
          clientRoleId,
          sponsorRoleId,
        },
      };
      const response = yield call(request, requestURL, params);

      yield put(fetchProtocolsSuccess(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while fetching protocols');
      toastr.error('', errorMessage);
      yield put(fetchProtocolsError(err));
    }
  }
}

function* fetchCroWatcher() {
  while (true) {
    yield take(FETCH_CRO);

    try {
      const requestURL = `${API_URL}/cros`;

      const params = {
        method: 'GET',
      };
      const response = yield call(request, requestURL, params);

      yield put(fetchCroSuccess(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while fetching cros');
      toastr.error('', errorMessage);
      yield put(fetchCroError(err));
    }
  }
}

function* fetchUsersByRoleWatcher() {
  while (true) {
    yield take(FETCH_USERS_BY_ROLE);

    try {
      const requestURL = `${API_URL}/users/fetchDashboardUsersByRole`;

      const params = {
        method: 'GET',
      };
      const response = yield call(request, requestURL, params);

      yield put(fetchUsersByRoleSuccess(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while fetching users');
      toastr.error('', errorMessage);
      yield put(fetchUsersByRoleError(err));
    }
  }
}

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