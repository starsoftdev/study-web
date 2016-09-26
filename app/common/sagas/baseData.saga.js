/*
 *  saga to load auth user details from the just token
 */
import { take, call, put, fork } from 'redux-saga/effects';

import request from 'utils/request';
import {
  FETCH_SITES,
  FETCH_INDICATIONS,
  FETCH_LEVELS,
  FETCH_COUPON,
  FETCH_CARDS,
} from 'containers/App/constants';

import {
  sitesFetched,
  sitesFetchingError,
  indicationsFetched,
  indicationsFetchingError,
  levelsFetched,
  levelsFetchingError,
  couponFetched,
  couponFetchingError,
  cardsFetched,
  cardsFetchingError,
} from 'containers/App/actions';

export default function* baseDataSaga() {
  yield fork(fetchSitesWatcher);
  yield fork(fetchIndicationsWatcher);
  yield fork(fetchLevelsWatcher);
  yield fork(fetchCouponWatcher);
  yield fork(fetchCardsWatcher);
}

export function* fetchSitesWatcher() {
  while (true) {
    yield take(FETCH_SITES);

    try {
      const requestURL = `${API_URL}/sites`;
      const response = yield call(request, requestURL);

      yield put(sitesFetched(response));
    } catch (e) {
      yield put(sitesFetchingError(e));
    }
  }
}

export function* fetchIndicationsWatcher() {
  while (true) {
    yield take(FETCH_INDICATIONS);

    try {
      const requestURL = `${API_URL}/indications`;
      const response = yield call(request, requestURL);

      yield put(indicationsFetched(response));
    } catch (e) {
      yield put(indicationsFetchingError(e));
    }
  }
}

export function* fetchLevelsWatcher() {
  while (true) {
    yield take(FETCH_LEVELS);

    try {
      const requestURL = `${API_URL}/levels`;
      const response = yield call(request, requestURL);

      yield put(levelsFetched(response));
    } catch (e) {
      yield put(levelsFetchingError(e));
    }
  }
}

export function* fetchCouponWatcher() {
  while (true) {
    const { couponId } = yield take(FETCH_COUPON);
    const encodedCouponId = encodeURIComponent(couponId);

    try {
      const requestURL = `${API_URL}/clients/retrieve_coupon/${encodedCouponId}`;
      const response = yield call(request, requestURL);

      yield put(couponFetched(response));
    } catch (err) {
      yield put(couponFetchingError(err));
    }
  }
}

export function* fetchCardsWatcher() {
  while (true) {
    const { customerId } = yield take(FETCH_CARDS);

    try {
      const requestURL = `${API_URL}/clients/stripe_customer/${customerId}/retrieve_cardsList`;
      const response = yield call(request, requestURL);

      yield put(cardsFetched(response));
    } catch (err) {
      yield put(cardsFetchingError(err));
    }
  }
}
