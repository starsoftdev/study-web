// import React from 'react';
import _, { get } from 'lodash';
import { take, put, fork, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import FileSaver from 'file-saver';

import {
  receiptsReceived,
} from '../../containers/Receipts/actions';
import {
  GET_RECEIPTS,
  GET_PDF,
  SHOW_INVOICE_PDF,
} from '../../containers/Receipts/constants';
import request from '../../utils/request';

// Individual exports for testing
export function* receiptSaga() {
  const watcherA = yield fork(getReceipts);
  const watcherC = yield fork(getPdf);
  const watcherB = yield fork(showPdf);

  const options = yield take(LOCATION_CHANGE);
  if (options.payload.pathname !== '/app/receipts') {
    // Suspend execution until location changes
    yield put(receiptsReceived([], true, 1));
    yield cancel(watcherA);
    yield cancel(watcherC);
    yield cancel(watcherB);
  }
}

export function* getReceipts() {
  while (true) {
    const { clientRoleId, limit, offset, receipts, orderBy, orderDir, payload } = yield take(GET_RECEIPTS);
    try {
      const body = {
        clientRoleId,
        limit,
        skip: offset,
        orderBy,
        orderDir: orderDir === 'up' ? 'ASC' : 'DESC',
        searchOptions: payload,
      };
      const params = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      const requestURL = `${API_URL}/invoices/receipts`;
      const response = yield call(request, requestURL, params);

      let resultArr = [];
      if (payload && offset === 0) {
        _.forEach(response, (item, index) => {
          response[index].orderNumber = index + 1;
        });
        resultArr = response;
      } else {
        const receiptsCount = receipts.length;
        _.forEach(response, (item, index) => {
          response[index].orderNumber = receiptsCount + index + 1;
        });
        resultArr = receipts.concat(response);
      }

      if (orderBy && orderBy === 'orderNumber') {
        const dir = ((orderDir === 'up') ? 'asc' : 'desc');
        resultArr = _.orderBy(resultArr, [function (o) {
          return o.orderNumber;
        }], [dir]);
      }

      let hasMore = true;
      let page = (offset / 50) + 1;
      if (response.length < limit) {
        hasMore = false;
        page = 1;
      }

      yield put(receiptsReceived(resultArr, hasMore, page));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* getPdf() {
  while (true) {
    const { payload } = yield take(GET_PDF);
    try {
      const requestURL = `${API_URL}/invoices/getInvoicePDF`;
      const invoices = [];
      for (const value of payload) {
        invoices.push(value.invoice_pdf_id);
      }

      const params = {
        query: {
          invoices: JSON.stringify(invoices),
        },
        doNotParseAsJson: true,
      };
      const response = yield call(request, requestURL, params);
      response.blob().then(blob => {
        if (invoices.length > 1) {
          const dateNow = new Date();
          const dateString = (`0${dateNow.getMonth() + 1}`).slice(-2) + (`0${dateNow.getDate()}`).slice(-2) + dateNow.getFullYear().toString().substr(2, 2);
          const filename = `StudyKIK_Receipt_${dateString}.zip`;
          FileSaver.saveAs(blob, filename);
        } else if (invoices.length === 1) {
          FileSaver.saveAs(blob, invoices[0].substr(invoices[0].indexOf('/') + 1));
        }
      });
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
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
      toastr.error('', errorMessage);
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

// All sagas to be loaded
export default [
  receiptSaga,
];
