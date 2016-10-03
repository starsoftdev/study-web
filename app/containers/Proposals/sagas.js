import { take, put, fork, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import request from 'utils/request';
import { get } from 'lodash';

import {
  proposalsReceived,
} from 'containers/Proposals/actions';
import {
  GET_PROPOSALS,
} from 'containers/Proposals/constants';

// Individual exports for testing
export function* proposalSaga() {
  const watcherA = yield fork(getProposals);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

export function* getProposals() {
  while (true) {
    const { payload } = yield take(GET_PROPOSALS);
    try {
      const requestURL = `${API_URL}/proposals`;
      const response = yield call(request, requestURL);

      yield put(proposalsReceived(response));
      yield put(toastrActions.success('', 'Success! Proposals received.'));
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
