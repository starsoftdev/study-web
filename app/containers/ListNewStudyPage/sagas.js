import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { reset } from 'redux-form';
import _, { get } from 'lodash';

import request from 'utils/request';

import {
  formSubmitted,
  formSubmissionError,
} from 'containers/ListNewStudyPage/actions';

import {
  SUBMIT_FORM,
} from 'containers/ListNewStudyPage/constants';

export function* submitFormWatcher() {
  while (true) {
    const { cartValues, formValues } = yield take(SUBMIT_FORM);
    try {
      const requestURL = `${API_URL}/studies`;

      const data = new FormData();
      _.forEach(formValues, (value, index) => {
        if (index === 'file') {
          data.append(index, value[0]);
        } else if (index === 'emailNotifications' || index === 'leadSource') {
          data.append(index, JSON.stringify(value));
        } else {
          data.append(index, value);
        }
      });
      data.append('cartValues', JSON.stringify(cartValues));

      const params = {
        method: 'POST',
        body: data,
        useDefaultContentType: true,
      };
      const response = yield call(request, requestURL, params);

      yield put(toastrActions.success('List New Study', 'The request has been submitted successfully'));
      yield put(formSubmitted(response));

      // Clear the form values
      yield put(reset('listNewStudy'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(formSubmissionError(err));
    }
  }
}

export function* listNewStudyPageSaga() {
  const watcherA = yield fork(submitFormWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

// All sagas to be loaded
export default [
  listNewStudyPageSaga,
];
