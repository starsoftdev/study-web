// /* eslint-disable no-constant-condition, consistent-return */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { reset } from 'redux-form';
import { get } from 'lodash';
import request from 'utils/request';

import {
  redeemSuccess,
  redeemError,
} from 'containers/RewardsPage/actions';

import {
  REDEEM,
} from 'containers/RewardsPage/constants';

// Bootstrap sagas
export default [
  RewardsPageSaga,
];

export function* redeemWatcher() {
  while (true) {
    // listen for the SUBMIT_FORM action dispatched on form submit
    const { payload } = yield take(REDEEM);

    try {
      const requestURL = `${API_URL}/rewards/redeem`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const response = yield call(request, requestURL, params);

      yield put(toastrActions.success('RewardRedemption', 'The request has been submitted successfully'));
      yield put(redeemSuccess(response));

      // Clear the form values
      yield put(reset('rewardRedemptions'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(redeemError(err));
    }
  }
}

export function* RewardsPageSaga() {
  const watcherB = yield fork(redeemWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherB);
}
