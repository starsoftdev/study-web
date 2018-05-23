import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from '../../utils/request';
import composeQueryString from '../../utils/composeQueryString';

import {
  FETCH_PATIENT,
} from './constants';

import {
  patientFetched,
  patientFetchingError,
} from './actions';

export function* fetchPatientWatcher() {
  while (true) {
    const { id } = yield take(FETCH_PATIENT);

    try {
      const queryParams = {
        filter: JSON.stringify({
          include: [
            {
              relation: 'patientIndications',
              scope: {
                include: 'indication',
              },
            },
            {
              studySource: 'source',
            },
            {
              studyPatientCategory: [
                'patientCategory',
                'study',
              ],
            },
          ],
        }),
      };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/patients/${id}?${queryString}`;
      const response = yield call(request, requestURL);
      if (response.source) {
        response.source = response.source.id;
      }
      yield put(patientFetched(response));
    } catch (err) {
      yield put(patientFetchingError(err));
      console.error(err);
    }
  }
}

export function* callCenterPatientPageSaga() {
  const watcherA = yield fork(fetchPatientWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
}

// Bootstrap sagas
export default [
  callCenterPatientPageSaga,
];
