import { take, put, fork, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import request from 'utils/request';
import { get } from 'lodash';

import {
  proposalsReceived,
  pdfCreated,
} from 'containers/Proposals/actions';
import {
  GET_PROPOSALS,
  CREATE_PDF,
  GET_PDF,
} from 'containers/Proposals/constants';

// Individual exports for testing
export function* proposalSaga() {
  const watcherA = yield fork(getProposals);
  const watcherB = yield fork(createPdf);
  const watcherC = yield fork(getPdf);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
}

export function* getProposals() {
  while (true) {
    const { payload } = yield take(GET_PROPOSALS);
    try {
      const requestURL = `${API_URL}/proposals`;
      const response = yield call(request, requestURL);

      yield put(proposalsReceived(response));
      yield put(toastrActions.success('', 'Proposals received.'));
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
      const requestURL = `${API_URL}/proposals/createPDF`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload)
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
      const requestURL = `${API_URL}/proposals/getPDF`;
      const fileName = (payload.length === 1) ? payload[0].fileName : null
      let archiveName = null
      if (payload.length > 1) {
        archiveName = 'proposals'
        for (const file of payload) {
          archiveName += '-' + file.proposal.id
        }
      }
      let query = {
        access_token: 'UFnxNZ1qnvzRRgXzRre2lc8ijpO9RwchwTXH41elUZO7RJSwnjxdWLRFDwCVAYFj'
      }
      if (fileName) {
        query.fileName = fileName;
      }
      if (archiveName) {
        query.archiveName = archiveName;
      }

      let params = "";
      for (const key in query) {
        if (params != "") {
          params += "&";
        }
        params += key + "=" + query[key];
      }

      location.replace(requestURL + '?' + params);
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      payload.cb(err, null);
    }
  }
}

// All sagas to be loaded
export default [
  proposalSaga,
];
