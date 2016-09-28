import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { get } from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { reset } from 'redux-form';

import request from 'utils/request';

import {
  creditCardsAdded,
  creditCardAddingError,
} from 'containers/PaymentInformationPage/actions';

import {
  ADD_CREDIT_CARD,
} from 'containers/PaymentInformationPage/constants';

export function* addCreditCardWatcher() {
  while (true) {
    const { payload } = yield take(ADD_CREDIT_CARD);
    try {
      const requestURL = `${API_URL}/clients/stripe_customer/${payload.customerId}/save_card`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const response = yield call(request, requestURL, params);

      yield put(creditCardsAdded(response));
      yield put(toastrActions.success('', 'Success!'));
      yield put(reset('addCreditCard'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      yield put(creditCardAddingError(err));
    }
  }
}

export function* paymentInformationPageSaga() {
  const watcherC = yield fork(addCreditCardWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherC);
}

// All sagas to be loaded
export default [
  paymentInformationPageSaga,
];
