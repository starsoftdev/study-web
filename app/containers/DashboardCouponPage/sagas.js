import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_COUPON,
  ADD_COUPON,
  EDIT_COUPON,
  DELETE_COUPON,
} from './constants';

import {
  fetchCouponSuccess,
  fetchCouponError,
  addCouponSuccess,
  addCouponError,
  editCouponSuccess,
  editCouponError,
  deleteCouponSuccess,
  deleteCouponError,
  fetchCoupon,
} from './actions';

export function* dashboardCouponSaga() {
  const watcherA = yield fork(fetchCouponWatcher);
  const watcherB = yield fork(addCouponWatcher);
  const watcherC = yield fork(editCouponWatcher);
  const watcherD = yield fork(deleteCouponWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* fetchCouponWatcher() {
  yield* takeLatest(FETCH_COUPON, fetchCouponWorker);
}

export function* fetchCouponWorker() {
  try {
    const requestURL = `${API_URL}/coupons`;

    const filterObj = {
      where: {
        isArchived: {
          neq: true,
        },
      },
    };

    const queryParams = {
      filter: JSON.stringify(filterObj),
    };

    const response = yield call(request, requestURL, { query: queryParams });

    yield put(fetchCouponSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching coupons');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchCouponError(err));
  }
}

export function* addCouponWatcher() {
  yield* takeLatest(ADD_COUPON, addCouponWorker);
}

export function* addCouponWorker(action) {
  try {
    const requestURL = `${API_URL}/coupons`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(addCouponSuccess(response));
    yield put(fetchCoupon());
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving coupons');
    yield put(toastrActions.error('', errorMessage));
    yield put(addCouponError(err));
  }
}

export function* editCouponWatcher() {
  yield* takeLatest(EDIT_COUPON, editCouponWorker);
}

export function* editCouponWorker(action) {
  try {
    const requestURL = `${API_URL}/coupons/${action.payload.id}`;

    const params = {
      method: 'PUT',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(editCouponSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving coupons');
    yield put(toastrActions.error('', errorMessage));
    yield put(editCouponError(err));
  }
}

export function* deleteCouponWatcher() {
  yield* takeLatest(DELETE_COUPON, deleteCouponWorker);
}

export function* deleteCouponWorker(action) {
  try {
    const requestURL = `${API_URL}/coupons/${action.payload}`;

    const params = {
      method: 'DELETE',
    };
    yield call(request, requestURL, params);

    yield put(deleteCouponSuccess({ id: action.payload }));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while deleting coupons');
    yield put(toastrActions.error('', errorMessage));
    yield put(deleteCouponError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardCouponSaga,
];
