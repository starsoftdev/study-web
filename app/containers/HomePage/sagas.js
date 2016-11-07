// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { reset } from 'redux-form';
import { get, forEach } from 'lodash';

import request from 'utils/request';
import composeQueryString from 'utils/composeQueryString';
import {
  FETCH_PATIENT_SIGN_UPS,
  FETCH_PATIENT_MESSAGES,
  FETCH_REWARDS_POINT,
  FETCH_STUDIES,
  FETCH_INDICATION_LEVEL_PRICE,
  RENEW_STUDY,
} from './constants';

import {
  fetchPatientSignUpsSucceeded,
  fetchPatientMessagesSucceeded,
  fetchRewardsPointSucceeded,
  studiesFetched,
  studiesFetchingError,
  indicationLevelPriceFetched,
  indicationLevelPriceFetchingError,
  studyRenewed,
  studyRenewingError,
} from './actions';

// Bootstrap sagas
export default [
  homePageSaga,
];

export function* fetchPatientSignUpsWatcher() {
  yield* takeLatest(FETCH_PATIENT_SIGN_UPS, fetchPatientSignUpsWorker);
}

export function* fetchPatientSignUpsWorker(action) {
  try {
    const requestURL = `${API_URL}/clients/${action.currentUser.roleForClient.client_id}/patientSignUps`;
    const params = {
      method: 'GET',
      query: {
        timezoneOffset: -new Date().getTimezoneOffset() / 60,
      },
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchPatientSignUpsSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching patients for selected study');
    yield put(toastrActions.error('', errorMessage));
  }
}

export function* fetchPatientMessagesWatcher() {
  yield* takeLatest(FETCH_PATIENT_MESSAGES, fetchPatientMessagesWorker);
}

export function* fetchPatientMessagesWorker(action) {
  try {
    const requestURL = `${API_URL}/clients/${action.currentUser.roleForClient.client_id}/patientMessages`;
    const response = yield call(request, requestURL);

    yield put(fetchPatientMessagesSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching schedules');
    yield put(toastrActions.error('', errorMessage));
  }
}

export function* fetchRewardsPointWatcher() {
  yield* takeLatest(FETCH_REWARDS_POINT, fetchRewardsPointWorker);
}

export function* fetchRewardsPointWorker(action) {
  try {
    const requestURL = `${API_URL}/clients/${action.currentUser.roleForClient.client_id}`;
    const response = yield call(request, requestURL);

    yield put(fetchRewardsPointSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting a schedule');
    yield put(toastrActions.error('', errorMessage));
  }
}

export function* fetchStudiesWatcher() {
  yield* takeLatest(FETCH_STUDIES, fetchStudiesWorker);
}

export function* fetchStudiesWorker(action) {
  try {
    let queryString;
    let requestURL;
    if (action.searchParams) {
      queryString = composeQueryString(action.searchParams);
      requestURL = `${API_URL}/studies/get_filtered_studies?${queryString}`;
    } else {
      requestURL = `${API_URL}/studies/get_filtered_studies`;
    }
    const response = yield call(request, requestURL);

    yield put(studiesFetched(response));
  } catch (err) {
    yield put(studiesFetchingError(err));
  }
}

export function* fetchIndicationLevelPriceWatcher() {
  yield* takeLatest(FETCH_INDICATION_LEVEL_PRICE, fetchIndicationLevelPriceWorker);
}

export function* fetchIndicationLevelPriceWorker(action) {
  try {
    const { levelId, indicationId } = action;
    const requestURL = `${API_URL}/indicationLevelSkus/getPrice`;
    const params = {
      query: {
        levelId,
        indicationId,
      },
    };
    const response = yield call(request, requestURL, params);
    yield put(indicationLevelPriceFetched(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Can not get price for Indication Level');
    yield put(toastrActions.error('', errorMessage));
    yield put(indicationLevelPriceFetchingError(err));
  }
}

export function* renewStudyWatcher() {
  yield* takeLatest(RENEW_STUDY, renewStudyWorker);
}

export function* renewStudyWorker(action) {
  try {
    const { cartValues, formValues } = action;
    const requestURL = `${API_URL}/studies/${formValues.studyId}`;

    const data = new FormData();
    forEach(formValues, (value, index) => {
      if (index === 'studyId') {
        return true;
      }
      return data.append(index, value);
    });
    data.append('cartValues', JSON.stringify(cartValues));

    const params = {
      method: 'PUT',
      body: data,
      useDefaultContentType: true,
    };
    const response = yield call(request, requestURL, params);

    yield put(toastrActions.success('Renew Study', 'The request has been submitted successfully'));
    yield put(studyRenewed(response));
    yield put(reset('renewStudy'));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    yield put(toastrActions.error('', errorMessage));
    yield put(studyRenewingError(err));
  }
}

export function* homePageSaga() {
  const watcherA = yield fork(fetchPatientSignUpsWatcher);
  const watcherB = yield fork(fetchPatientMessagesWatcher);
  const watcherC = yield fork(fetchRewardsPointWatcher);
  const watcherD = yield fork(fetchStudiesWatcher);
  const watcherE = yield fork(fetchIndicationLevelPriceWatcher);
  const watcherF = yield fork(renewStudyWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
}
