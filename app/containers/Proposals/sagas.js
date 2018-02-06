import FileSaver from 'file-saver';
import { get } from 'lodash';
import { take, put, fork, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import request from '../../utils/request';

import {
  proposalsReceived,
  pdfCreated,
} from '../../containers/Proposals/actions';
import {
  GET_PROPOSALS,
  CREATE_PDF,
  GET_PDF,
  SHOW_PROPOSAL_PDF,
} from '../../containers/Proposals/constants';

// Individual exports for testing
export function* proposalSaga() {
  const watcherA = yield fork(getProposals);
  const watcherB = yield fork(createPdf);
  const watcherC = yield fork(getPdf);
  const watcherD = yield fork(showPdf);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* getProposals() {
  while (true) {
    const { clientRoleId, limit, offset, proposals, searchParams } = yield take(GET_PROPOSALS);
    try {
      const body = {
        clientRoleId,
        limit,
        skip: offset,
        searchParams,
      };
      const params = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      const requestURL = `${API_URL}/proposals/getProposals`;
      const response = yield call(request, requestURL, params);

      let resultArr = [];
      if (offset === 0) {
        resultArr = response.map((p, i) => ({ ...p, orderNumber: i + 1 }));
      } else {
        resultArr = proposals.concat(response.map((p, i) => ({ ...p, orderNumber: proposals.length + i + 1 })));
      }

      let hasMore = true;
      let page = (offset / 50) + 1;
      if (response.length < limit) {
        hasMore = false;
        page = 1;
      }

      yield put(proposalsReceived(resultArr, hasMore, page));
    } catch (err) {
      const errorMessage = get(err, 'message', 'We encountered an error loading proposals. Please try again later.');
      toastr.error('', errorMessage);
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* createPdf() {
  while (true) {
    const { payload } = yield take(CREATE_PDF);
    try {
      const requestURL = `${API_URL}/proposals/createPDF`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };

      const response = yield call(request, requestURL, params);
      yield put(pdfCreated(response));
      toastr.success('', 'Success! DPF created.');
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
      if (payload.cb && typeof payload.cb === 'function') {
        payload.cb(err, null);
      }
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
      const requestURL = `${API_URL}/proposals/getProposalsPDF`;
      const proposals = [];
      for (const value of payload) {
        proposals.push(value.proposalpdfid);
      }
      const params = {
        query: {
          proposals: JSON.stringify(proposals),
        },
        doNotParseAsJson: true,
      };

      const response = yield call(request, requestURL, params);
      response.blob().then(blob => {
        if (proposals.length > 1) {
          const dateNow = new Date();
          const dateString = (`0${dateNow.getMonth() + 1}`).slice(-2) + (`0${dateNow.getDate()}`).slice(-2) + dateNow.getFullYear().toString().substr(2, 2);
          const filename = `StudyKIK_Proposals_${dateString}.zip`;
          FileSaver.saveAs(blob, filename);
        } else if (proposals.length === 1) {
          FileSaver.saveAs(blob, proposals[0].substr(proposals[0].indexOf('/') + 1));
        }
      });
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      toastr.error('', errorMessage);
      payload.cb(err, null);
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* showPdf() {
  while (true) {
    const { proposalId } = yield take(SHOW_PROPOSAL_PDF);
    //
    try {
      const requestURL = `${API_URL}/proposals/getPreSignedUrl`;
      const params = {
        query: {
          proposalId,
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
  proposalSaga,
];
