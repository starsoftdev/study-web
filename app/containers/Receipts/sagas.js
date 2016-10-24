// import React from 'react';
import { take, put, fork, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import request from 'utils/request';
import { get } from 'lodash';
import composeQueryString from 'utils/composeQueryString';

import {
  receiptsReceived,
  pdfCreated,
} from 'containers/Receipts/actions';
import {
  GET_RECEIPT,
  CREATE_PDF,
  GET_PDF,
} from 'containers/Receipts/constants';
import { getItem } from 'utils/localStorage';

const serializeParams = (obj) => {
  const str = [];
  Object.keys(obj).forEach(p => {
    if ({}.hasOwnProperty.call(obj, p) && obj[p] !== undefined && obj[p] !== null) {  // we need to pass 0 and empty string
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  });
  return str.join('&');
};

// Individual exports for testing
export function* receiptSaga() {
  const watcherA = yield fork(getReceipts);
  const watcherB = yield fork(createPdf);
  const watcherC = yield fork(getPdf);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
}

export function* getReceipts() {
  while (true) {
    const { payload } = yield take(GET_RECEIPT);
    try {
      const queryParams = { filter: '{"include": ["paymentMethod", {"invoiceDetails": {"campaign": ["study", "site", "level"]}}]}' };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/invoices/?${queryString}`;
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

export function* createPdf() {
  while (true) {
    const { payload } = yield take(CREATE_PDF);
    try {
      const requestURL = `${API_URL}/invoices/createPDF`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };

      const response = yield call(request, requestURL, params);
      yield put(pdfCreated(response));
      yield put(toastrActions.success('', 'Success! DPF created.'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      payload.cb(err, null);
    }
  }
}

export function* getPdf() {
  while (true) {
    const { payload } = yield take(GET_PDF);
    try {
      const requestURL = `${API_URL}/invoices/getPDF`;
      const fileName = (payload.data.files.length === 1) ? payload.data.files[0].fileName : null;
      const authToken = getItem('auth_token');
      const archiveName = payload.data.archive;
      const params = {
        access_token: authToken,
      };

      if (fileName) {
        params.fileName = fileName;
      }
      if (archiveName) {
        params.archiveName = archiveName;
      }
      location.replace(`${requestURL}?${serializeParams(params)}`);
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
