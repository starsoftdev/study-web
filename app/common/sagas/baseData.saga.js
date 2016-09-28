/*
 *  saga to load auth user details from the just token
 */
import { take, call, put, fork } from 'redux-saga/effects';

import request from 'utils/request';
import {
  FETCH_SITES,
  FETCH_INDICATIONS,
  FETCH_LEVELS,
} from 'containers/App/constants';

import {
  sitesFetched,
  sitesFetchingError,
  indicationsFetched,
  indicationsFetchingError,
  levelsFetched,
  levelsFetchingError,
} from 'containers/App/actions';


export default function* baseDataSaga() {
  yield fork(fetchSitesWatcher);
  yield fork(fetchIndicationsWatcher);
  yield fork(fetchLevelsWatcher);
}

export function* fetchSitesWatcher() {
  while (true) {
    const action = yield take(FETCH_SITES);

    try {
      const requestURL = `${API_URL}/sites`;

      const filterObj = {
        include: ['users', 'studies'],
      };

      const searchParams = action.payload || {};

      if (searchParams.name) {
        filterObj.where = {
          name: {
            like: `%${searchParams.name}%`,
          },
        };
      }

      const queryParams = {
        filter: JSON.stringify(filterObj),
      };

      const response = yield call(request, requestURL, { query: queryParams });

      yield put(sitesFetched(response));
    } catch (e) {
      yield put(sitesFetchingError(e));
    }
  }
}

export function* fetchIndicationsWatcher() {
  while (true) {
    yield take(FETCH_INDICATIONS);

    try {
      const requestURL = `${API_URL}/indications`;
      const response = yield call(request, requestURL);

      yield put(indicationsFetched(response));
    } catch (e) {
      yield put(indicationsFetchingError(e));
    }
  }
}

export function* fetchLevelsWatcher() {
  while (true) {
    yield take(FETCH_LEVELS);

    try {
      const requestURL = `${API_URL}/levels`;
      const response = yield call(request, requestURL);

      yield put(levelsFetched(response));
    } catch (e) {
      yield put(levelsFetchingError(e));
    }
  }
}
