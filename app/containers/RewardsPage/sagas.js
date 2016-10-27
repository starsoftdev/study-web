
// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { reset } from 'redux-form';
import { get } from 'lodash';

import request from 'utils/request';

import {
  formSubmitted,
  formSubmissionError,
  siteLocationsFetched,
  siteLocationsFetchingError,
} from 'containers/RewardsPage/actions';

import {
  SUBMIT_FORM,
  FETCH_SITE_LOCATIONS,
} from 'containers/RewardsPage/constants';

// Bootstrap sagas
export default [
  RewardsPageSaga,
];

// Does not allow concurrent fetches of site locations (for demo purpose)
// Alternatively you may use takeEvery
export function* fetchSiteLocationsWatcher() {
  yield* takeLatest(FETCH_SITE_LOCATIONS, fetchSiteLocations);
}

export function* fetchSiteLocations() {
  try {
    const requestURL = `${API_URL}/sites`;
    const response = yield call(request, requestURL);
    yield put(siteLocationsFetched(response));
  } catch (err) {
    yield put(siteLocationsFetchingError(err));
  }
}

export function* submitFormWatcher() {
  while (true) {
    // listen for the SUBMIT_FORM action dispatched on form submit
    const { payload } = yield take(SUBMIT_FORM);

    try {
      const requestURL = `${API_URL}/sites`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const response = yield call(request, requestURL, params);

      yield put(toastrActions.success('Rewards', 'The request has been submitted successfully'));
      yield put(formSubmitted(response));

      // Clear the form values
      yield put(reset('rewards'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(formSubmissionError(err));
    }
  }
}

export function* RewardsPageSaga() {
  const watcherA = yield fork(fetchSiteLocationsWatcher);
  const watcherB = yield fork(submitFormWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}
