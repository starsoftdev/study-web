
// /* eslint-disable no-constant-condition, consistent-return */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
import { get } from 'lodash';

import request from '../../utils/request';

import {
  formSubmitted,
  formSubmissionError,
  couponFetched,
  couponFetchingError,
  fetchProposalSuccess,
  fetchProposalError,
} from '../../containers/RequestProposalPage/actions';

import {
  SUBMIT_FORM,
  FETCH_COUPON,
  FETCH_PROPOSAL,
} from '../../containers/RequestProposalPage/constants';
import { translate } from '../../../common/utilities/localization';

// Bootstrap sagas
export default [
  requestProposalPageSaga,
];

export function* submitFormWatcher() {
  while (true) {
    // listen for the SUBMIT_FORM action dispatched on form submit
    const { payload } = yield take(SUBMIT_FORM);

    try {
      const requestURL = `${API_URL}/proposals`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const response = yield call(request, requestURL, params);

      toastr.success(translate('portals.component.requestProposalCart.submitSuccessToastrTitle'), translate('portals.component.requestProposalCart.submitSuccessToastrMessage'));
      yield put(formSubmitted(response));

      // Clear the form values
      yield put(reset('requestProposal'));
    } catch (err) {
      const errorMessage = get(err, 'message', translate('portals.component.requestProposalCart.submitErrorToastrMessage'));
      toastr.error('', errorMessage);
      yield put(formSubmissionError(err));
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* fetchCouponWatcher() {
  while (true) {
    const { couponId } = yield take(FETCH_COUPON);
    const encodedCouponId = encodeURIComponent(couponId);

    try {
      const requestURL = `${API_URL}/clients/payments/retrieveCoupon/${encodedCouponId}`;
      const response = yield call(request, requestURL);

      yield put(couponFetched(response));
    } catch (err) {
      yield put(couponFetchingError(err));
    }
  }
}

export function* fetchProposalWatcher() {
  while (true) {
    const { id } = yield take(FETCH_PROPOSAL);

    try {
      const requestURL = `${API_URL}/proposals/${id}`;
      const response = yield call(request, requestURL);

      yield put(fetchProposalSuccess(response));
    } catch (err) {
      yield put(fetchProposalError(err));
    }
  }
}

export function* requestProposalPageSaga() {
  const watcherA = yield fork(submitFormWatcher);
  const watcherB = yield fork(fetchCouponWatcher);
  const watcherC = yield fork(fetchProposalWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
}
