/* eslint-disable no-constant-condition, consistent-return */

import React from 'react';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reset } from 'redux-form';
import { actions as toastrActions, toastr } from 'react-redux-toastr';
import FaSpinner from 'react-icons/lib/fa/spinner';
import { get } from 'lodash';

import request from '../../utils/request';
import {
  FETCH_FILTERED_PROTOCOLS,
  EXPORT_PATIENTS,
  ADD_PROTOCOL,
  FETCH_HISTORY,
  REVERT_BULK_UPLOAD,
} from './constants';

import {
  filteredProtcolsFetched,
  filteredProtcolsFetchingError,
  patientsExported,
  exportPatientsError,
  // emptyRowRequiredError,
  addProtocolSucceess,
  addProtocolError,
  historyFetched,
  historyFetchingError,
  revertBulkUploadSucceess,
  revertBulkUploadError,
} from './actions';

export function* patientDatabasePageSaga() {
  const watcherA = yield fork(fetchFilteredProtocolsWatcher);
  const watcherB = yield fork(exportPatientsWatcher);
  const watcherC = yield fork(addProtocolWatcher);
  const watcherD = yield fork(fetchHistoryWatcher);
  const watcherE = yield fork(revertBulkUploadWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
}

// Bootstrap sagas
export default [
  patientDatabasePageSaga,
];

export function* exportPatientsWatcher() {
  while (true) {
    const { data } = yield take(EXPORT_PATIENTS);

    try {
      // check if we need to update the patient with study info
      const requestURL = `${API_URL}/patients/exportPatients`;
      const options = {
        method: 'POST',
        body: JSON.stringify({
          ...data,
        }),
      };
      const response = yield call(request, requestURL, options);
      const toastrOptions = {
        id: 'loadingToasterForUploadPatients',
        type: 'success',
        message: 'Loading...',
        options: {
          timeOut: 0,
          icon: (<FaSpinner size={40} className="spinner-icon text-info" />),
          showCloseButton: true,
        },
      };
      yield put(toastrActions.add(toastrOptions));
      yield put(patientsExported(response));
      // yield put(emptyRowRequiredError(false));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      toastr.error('', errorMessage);
      yield put(exportPatientsError(err));
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* fetchHistoryWatcher() {
  while (true) {
    const { userId } = yield take(FETCH_HISTORY);

    try {
      const requestURL = `${API_URL}/uploadHistory/fetchHistory?userId=${userId}`;
      const response = yield call(request, requestURL, {
        method: 'GET',
      });

      yield put(historyFetched(response));
    } catch (err) {
      yield put(historyFetchingError(err));
    }
  }
}

export function* revertBulkUploadWatcher() {
  while (true) {
    const { uploadId } = yield take(REVERT_BULK_UPLOAD);

    try {
      const requestURL = `${API_URL}/patients/revertBulkUpload`;
      const options = {
        method: 'POST',
        body: JSON.stringify({
          uploadId,
        }),
      };
      const response = yield call(request, requestURL, options);

      yield put(revertBulkUploadSucceess(response));
    } catch (err) {
      yield put(revertBulkUploadError(err));
    }
  }
}

export function* addProtocolWatcher() {
  while (true) {
    const { payload } = yield take(ADD_PROTOCOL);
    console.log('addProtocolWatcher', payload);
    try {
      const requestURL = `${API_URL}/studies/addProtocol`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const response = yield call(request, requestURL, params);

      toastr.success('Add Protocol', 'The request has been submitted successfully');
      yield put(addProtocolSucceess(response));

      yield put(reset('addProtocol'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      toastr.error('', errorMessage);
      yield put(addProtocolError(err));
      // if returns forbidden we remove the token from local storage
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* fetchFilteredProtocolsWatcher() {
  while (true) {
    const { clientRoleId, siteId } = yield take(FETCH_FILTERED_PROTOCOLS);

    try {
      const params = {
        clientRoleId,
      };
      const requestURL = `${API_URL}/sites/${siteId}/protocols`;
      const response = yield call(request, requestURL, params);
      yield put(filteredProtcolsFetched(response));
    } catch (err) {
      yield put(filteredProtcolsFetchingError(err));
      console.error(err);
    }
  }
}
