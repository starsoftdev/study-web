// import React from 'react';
import { take, put, fork, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import request from 'utils/request';
import { get } from 'lodash';

import {
  receiptsReceived,
} from 'containers/Receipts/actions';
import {
  GET_RECEIPT,
} from 'containers/Receipts/constants';
// import { getItem } from 'utils/localStorage';

// Individual exports for testing
export function* receiptSaga() {
  const watcherA = yield fork(getReceipts);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

export function* getReceipts() {
  while (true) {
    const { payload } = yield take(GET_RECEIPT);
    try {
      const requestURL = `${API_URL}/invoices`;
      const response = yield call(request, requestURL);

      yield put(receiptsReceived(response));
      yield put(toastrActions.success('', 'Receipts received.'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      payload.cb(err, null);
    }
  }
}

// All sagas to be loaded
export default [
  receiptSaga,
];
