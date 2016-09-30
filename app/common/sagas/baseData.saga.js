/*
 *  saga to load auth user details from the just token
 */
import { take, call, put, fork } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';

import request from 'utils/request';
import {
  FETCH_SITES,
  FETCH_INDICATIONS,
  FETCH_LEVELS,
  FETCH_COUPON,
  FETCH_CARDS,
  SAVE_CARD,
  DELETE_CARD,
  ADD_CREDITS,
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
  cardSaved,
  cardSavingError,
  cardDeleted,
  cardDeletingError,
  creditsAdded,
  creditsAddingError,
} from 'containers/App/actions';

export default function* baseDataSaga() {
  yield fork(fetchSitesWatcher);
  yield fork(fetchIndicationsWatcher);
  yield fork(fetchLevelsWatcher);
  yield fork(fetchCouponWatcher);
  yield fork(fetchCardsWatcher);
  yield fork(saveCardWatcher);
  yield fork(deleteCardWatcher);
  yield fork(addCreditsWatcher);
}

export function* fetchSitesWatcher() {
  while (true) {
    const action = yield take(FETCH_SITES);

    try {
      const requestURL = `${API_URL}/sites`;

      const filterObj = {
        include: ['users', 'studies'],
      };

      const searchParams = action.payload || {};

      if (searchParams.name) {
        filterObj.where = {
          name: {
            like: `%${searchParams.name}%`,
          },
        };
      }

      const queryParams = {
        filter: JSON.stringify(filterObj),
      };

      const response = yield call(request, requestURL, { query: queryParams });

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

export function* saveCardWatcher() {
  while (true) {
    const { customerId, cardData } = yield take(SAVE_CARD);

    try {
      const requestURL = `${API_URL}/clients/stripe_customer/${customerId}/save_card`;
      const options = {
        method: 'POST',
        body: JSON.stringify(cardData),
      };
      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('AddNewCard', 'Card saved successfully!'));
      yield put(cardSaved(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(cardSavingError(err));
    }
  }
}

export function* deleteCardWatcher() {
  while (true) {
    const { customerId, cardId } = yield take(DELETE_CARD);
    const options = {
      method: 'DELETE',
    };

    try {
      const requestURL = `${API_URL}/clients/stripe_customer/${customerId}/delete_card/${cardId}`;
      const response = yield call(request, requestURL, options);

      yield put(cardDeleted(response));
    } catch (err) {
      yield put(cardDeletingError(err));
    }
  }
}

export function* addCreditsWatcher() {
  while (true) {
    const { customerId, data } = yield take(ADD_CREDITS);
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    };

    try {
      const requestURL = `${API_URL}/clients/stripe_customer/${customerId}/checkout_credits`;
      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('Add Credits', 'Credits added successfully!'));
      yield put(creditsAdded(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(creditsAddingError(err));
    }
  }
}
