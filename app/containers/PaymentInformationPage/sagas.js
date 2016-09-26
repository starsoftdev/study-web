import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { get } from 'lodash';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';

import request from 'utils/request';

import {
  creditCardsFetched,
  creditCardsFetchingError,
  creditCardsDeleted,
  creditCardDeletingError,
} from 'containers/PaymentInformationPage/actions';

import {
  FETCH_CREDIT_CARDS,
  DELETE_CREDIT_CARD,
} from 'containers/PaymentInformationPage/constants';

export function* fetchCreditCardsWatcher() {
  yield* takeLatest(FETCH_CREDIT_CARDS, fetchCreditCards);
}

export function* fetchCreditCards(payload) {
  try {
    const requestURL = `${API_URL}/clients/stripe_customer/${payload.client_id}'/retrieve_cardsList`;
    const response = yield call(request, requestURL);
    yield put(creditCardsFetched(response.data));
  } catch (err) {
    yield put(creditCardsFetchingError(err));
  }
}

export function* deleteCreditCardWatcher() {
  while (true) {
    const { payload } = yield take(DELETE_CREDIT_CARD);

    try {
      const requestURL = `${API_URL}/clients/stripe_customer/${payload.customerId}/remove_card/${payload.id}`;
      const params = {
        method: 'DELETE',
      };
      const response = yield call(request, requestURL, params);
      console.log(response);

      yield put(creditCardsDeleted(response));
      yield put(toastrActions.success('', 'Success!'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      yield put(creditCardDeletingError(err));
    }
  }
}

export function* paymentInformationPageSaga() {
  const watcherA = yield fork(fetchCreditCardsWatcher);
  const watcherB = yield fork(deleteCreditCardWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

// All sagas to be loaded
export default [
  paymentInformationPageSaga,
];
