
/* eslint-disable no-constant-condition, consistent-return */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
import { get } from 'lodash';

import request from '../../utils/request';
import { translate } from '../../../common/utilities/localization';

import {
  formSubmitted,
  formSubmissionError,
} from './actions';

import {
  SUBMIT_FORM,
} from './constants';

// Bootstrap sagas
export default [
  helpAndSupportPageSaga,
];

export function* submitFormWatcher() {
  while (true) {
    // listen for the SUBMIT_FORM action dispatched on form submit
    const { payload } = yield take(SUBMIT_FORM);
    try {
      const requestURL = `${API_URL}/supports`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const response = yield call(request, requestURL, params);

      toastr.success(translate('client.component.helpAndSupportForm.toastrThankYouMessage'));
      yield put(formSubmitted(response));

      // Clear the form values
      yield put(reset('helpAndSupport'));
    } catch (err) {
      const errorMessage = get(err, 'message', translate('client.component.helpAndSupportForm.toastrErrorMessage'));
      toastr.error('', errorMessage);
      yield put(formSubmissionError(err));
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* helpAndSupportPageSaga() {
  const watcherB = yield fork(submitFormWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherB);
}
