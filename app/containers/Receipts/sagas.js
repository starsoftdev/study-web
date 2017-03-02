// import React from 'react';
import { take, put, fork, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import request from '../../utils/request';
import _, { get } from 'lodash';

import {
  receiptsReceived,
} from '../../containers/Receipts/actions';
import {
  GET_RECEIPT,
  GET_PDF,
  SHOW_INVOICE_PDF,
} from '../../containers/Receipts/constants';
import { getItem } from '../../utils/localStorage';

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
  const watcherC = yield fork(getPdf);
  const watcherB = yield fork(showPdf);


  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield put(receiptsReceived([], true, 1));
  yield cancel(watcherA);
  yield cancel(watcherC);
  yield cancel(watcherB);
}

export function* getReceipts() {
  while (true) {
    const { limit, offset, receipts, orderBy, orderDir, payload } = yield take(GET_RECEIPT);
    try {
      let requestURL;
      const authToken = getItem('auth_token');

      let sortParams = '';
      if (orderBy && orderDir && orderBy !== 'orderNumber') {
        sortParams = `&orderBy=${orderBy}&orderDir=${((orderDir === 'down') ? 'DESC' : 'ASC')}`;
      }
      if (!payload) {
        requestURL = `${API_URL}/invoices/getReceipts?limit=${limit}&skip=${offset}&${sortParams}`;
      } else {
        payload.limit = limit;
        payload.skip = offset;
        const options = JSON.stringify(payload);
        requestURL = `${API_URL}/invoices/getReceipts?options=${options}&limit=${limit}&skip=${offset}&${sortParams}`;
      }

      const response = yield call(request, requestURL);

      let resultArr = [];
      if (payload && offset === 0) {
        _.forEach(response, (item, index) => {
          response[index].orderNumber = index + 1;
        });
        resultArr = response;
      } else {
        const proposalsCount = receipts.length;
        _.forEach(response, (item, index) => {
          response[index].orderNumber = proposalsCount + index + 1;
        });
        resultArr = receipts.concat(response);
      }

      if (orderBy && orderBy === 'orderNumber') {
        const dir = ((orderDir === 'down') ? 'desc' : 'asc');
        resultArr = _.orderBy(resultArr, [function (o) {
          return o.orderNumber;
        }], [dir]);
      }

      let hasMore = true;
      let page = (offset / 15) + 1;
      if (response.length < limit) {
        hasMore = false;
        page = 1;
      }

      yield put(receiptsReceived(resultArr, hasMore, page));
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
      const requestURL = `${API_URL}/invoices/getInvoicePDF`;
      const authToken = getItem('auth_token');
      const params = {
        access_token: authToken,
      };
      const invoices = [];
      for (const value of payload) {
        invoices.push(value.invoice_pdf_id);
      }
      params.invoices = invoices;
      location.replace(`${requestURL}?${serializeParams(params)}`);
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* showPdf() {
  while (true) {
    const { invoiceId } = yield take(SHOW_INVOICE_PDF);
    //
    try {
      const requestURL = `${API_URL}/invoices/getPreSignedUrl`;
      const params = {
        query: {
          invoiceId,
        },
      };

      const response = yield call(request, requestURL, params);
      window.open(response.url, '_blank');
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

// All sagas to be loaded
export default [
  receiptSaga,
];
