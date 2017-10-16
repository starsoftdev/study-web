/* eslint-disable no-constant-condition, consistent-return */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';

import request from '../../utils/request';
import {
  FETCH_FILTERED_PROTOCOLS,
  EXPORT_PATIENTS,
} from './constants';

import {
  filteredProtcolsFetched,
  filteredProtcolsFetchingError,
  patientsExported,
  exportPatientsError,
  emptyRowRequiredError,
} from './actions';

export function* patientDatabasePageSaga() {
  const watcherA = yield fork(fetchFilteredProtocolsWatcher);
  const watcherB = yield fork(exportPatientsWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
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

      toastr.success('Export Patients', 'Success! You have uploaded your patients.');
      yield put(patientsExported(response));
      yield put(emptyRowRequiredError(false));
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
