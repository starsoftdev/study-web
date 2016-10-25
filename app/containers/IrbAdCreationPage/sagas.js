import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { reset } from 'redux-form';
import { get } from 'lodash';

import request from 'utils/request';

import {
  formSubmitted,
  formSubmissionError,
  fetchIrbProductListSuccess,
  fetchIrbProductListError,
} from 'containers/IrbAdCreationPage/actions';

import {
  SUBMIT_FORM,
  FETCH_IRB_PRODUCT_LIST,
} from 'containers/IrbAdCreationPage/constants';

export function* submitFormWatcher() {
  while (true) {
    // listen for the SUBMIT_FORM action dispatched on form submit
    // cartValues
    const { cartValues, formValues } = yield take(SUBMIT_FORM);
    const requestParams = {
      ...formValues,
      ...cartValues,
    };
    try {
      const requestURL = `${API_URL}/irbAdCreations`;
      const params = {
        method: 'POST',
        body: JSON.stringify(requestParams),
      };
      const response = yield call(request, requestURL, params);

      yield put(toastrActions.success('IRB Ad Form', 'The request has been submitted successfully'));
      yield put(formSubmitted(response));

      // Clear the form values
      yield put(reset('irbAdCreation'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(formSubmissionError(err));
    }
  }
}

export function* fetchIrbProductListWatcher() {
  while (true) {
    yield take(FETCH_IRB_PRODUCT_LIST);

    try {
      const requestURL = `${API_URL}/irbAdProductList`;
      const response = yield call(request, requestURL);

      yield put(fetchIrbProductListSuccess(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Can not fetch IrbAd Product List');
      yield put(toastrActions.error('', errorMessage));
      yield put(fetchIrbProductListError(err));
    }
  }
}

export function* irbAdCreationPageSaga() {
  const watcherA = yield fork(submitFormWatcher);
  const watcherB = yield fork(fetchIrbProductListWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

// All sagas to be loaded
export default [
  irbAdCreationPageSaga,
];
