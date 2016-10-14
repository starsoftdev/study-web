/* eslint-disable no-constant-condition, consistent-return */

import { take, call, put, fork } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';

import request from 'utils/request';
import composeQueryString from 'utils/composeQueryString';
import {
  FETCH_SITES,
  FETCH_INDICATIONS,
  FETCH_SOURCES,
  FETCH_LEVELS,
  FETCH_COUPON,
  FETCH_CARDS,
  SAVE_CARD,
  DELETE_CARD,
  ADD_CREDITS,

  FETCH_CLIENT_SITES,
  FETCH_CLIENT_ROLES,
  FETCH_SITE,
  FETCH_USER,
  DELETE_USER,
  DELETE_CLIENT_ROLE,
  SAVE_SITE,
  SAVE_USER,
} from 'containers/App/constants';


import {
  sitesFetched,
  sitesFetchingError,
  indicationsFetched,
  indicationsFetchingError,
  sourcesFetched,
  sourcesFetchingError,
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

  clientSitesFetched,
  clientSitesFetchingError,
  clientRolesFetched,
  clientRolesFetchingError,
  siteFetched,
  siteFetchingError,
  userFetched,
  userFetchingError,
  userDeleted,
  userDeletingError,
  clientRoleDeleted,
  clientRoleDeletingError,
  siteSaved,
  siteSavingError,
  userSaved,
  userSavingError,
} from 'containers/App/actions';

export default function* baseDataSaga() {
  yield fork(fetchSitesWatcher);
  yield fork(fetchIndicationsWatcher);
  yield fork(fetchSourcesWatcher);
  yield fork(fetchLevelsWatcher);
  yield fork(fetchCouponWatcher);
  yield fork(fetchCardsWatcher);
  yield fork(saveCardWatcher);
  yield fork(deleteCardWatcher);
  yield fork(addCreditsWatcher);

  yield fork(fetchClientSitesWatcher);
  yield fork(fetchClientRolesWatcher);
  yield fork(fetchSiteWatcher);
  yield fork(fetchUserWatcher);
  yield fork(deleteUserWatcher);
  yield fork(deleteClientRoleWatcher);
  yield fork(saveSiteWatcher);
  yield fork(saveUserWatcher);
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

export function* fetchSourcesWatcher() {
  while (true) {
    yield take(FETCH_SOURCES);

    try {
      const requestURL = `${API_URL}/sources`;
      const response = yield call(request, requestURL);

      yield put(sourcesFetched(response));
    } catch (e) {
      yield put(sourcesFetchingError(e));
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

      yield put(toastrActions.success('Add New Card', 'Card saved successfully!'));
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

      yield put(toastrActions.success('Delete Card', 'Card deleted successfully!'));
      yield put(cardDeleted(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
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

export function* fetchClientSitesWatcher() {
  while (true) {
    const { clientId, searchParams } = yield take(FETCH_CLIENT_SITES);

    try {
      const filterObj = {
        include: ['users', 'studies'],
        where: {},
      };

      if (searchParams && searchParams.name) {
        filterObj.where = {
          name: {
            like: `%${searchParams.name}%`,
            options: 'i',
          },
        };
      }

      const queryParams = {
        filter: JSON.stringify(filterObj),
      };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/clients/${clientId}/sites?${queryString}`;
      const response = yield call(request, requestURL);

      yield put(clientSitesFetched(response));
    } catch (err) {
      yield put(clientSitesFetchingError(err));
    }
  }
}

export function* fetchClientRolesWatcher() {
  while (true) {
    const { clientId, searchParams } = yield take(FETCH_CLIENT_ROLES);

    try {
      const filterObj = {
        include: 'user',
        where: {},
      };

      if (searchParams && searchParams.name) {
        filterObj.where = {
          name: {
            like: `%${searchParams.name}%`,
            options: 'i',
          },
        };
      }

      const queryParams = {
        filter: JSON.stringify(filterObj),
      };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/clients/${clientId}/roles?${queryString}`;
      const response = yield call(request, requestURL);

      yield put(clientRolesFetched(response));
    } catch (err) {
      yield put(clientRolesFetchingError(err));
    }
  }
}

export function* fetchSiteWatcher() {
  while (true) {
    const { id } = yield take(FETCH_SITE);

    try {
      const requestURL = `${API_URL}/sites/${id}`;
      const response = yield call(request, requestURL);

      yield put(siteFetched(response));
    } catch (err) {
      yield put(siteFetchingError(err));
    }
  }
}

export function* fetchUserWatcher() {
  while (true) {
    const { id } = yield take(FETCH_USER);

    try {
      const queryParams = { filter: '{"include":"roleForClient"}' };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/users/${id}?${queryString}`;
      const response = yield call(request, requestURL);

      yield put(userFetched(response));
    } catch (err) {
      yield put(userFetchingError(err));
    }
  }
}

export function* deleteUserWatcher() {
  while (true) {
    const { id } = yield take(DELETE_USER);

    try {
      const requestURL = `${API_URL}/users/${id}`;
      const options = {
        method: 'DELETE',
      };
      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('Delete User', 'User deleted successfully!'));
      yield put(userDeleted(id, response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(userDeletingError(err));
    }
  }
}

export function* deleteClientRoleWatcher() {
  while (true) {
    const { id } = yield take(DELETE_CLIENT_ROLE);

    try {
      const requestURL = `${API_URL}/clientRoles/${id}`;
      const options = {
        method: 'DELETE',
      };
      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('Delete Client Role', 'Client Role deleted successfully!'));
      yield put(clientRoleDeleted(id, response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(clientRoleDeletingError(err));
    }
  }
}

export function* saveSiteWatcher() {
  while (true) {
    const { clientId, id, data } = yield take(SAVE_SITE);

    try {
      let requestURL = null;
      let options = null;
      data.client_id = clientId;

      if (id) {
        requestURL = `${API_URL}/sites/${id}`;
        options = {
          method: 'PUT',
          body: JSON.stringify(data),
        };
      } else {
        requestURL = `${API_URL}/sites`;
        options = {
          method: 'POST',
          body: JSON.stringify(data),
        };
      }

      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('Save Site', 'Site saved successfully!'));
      yield put(siteSaved(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(siteSavingError(err));
    }
  }
}

export function* saveUserWatcher() {
  while (true) {
    const { clientId, id, data } = yield take(SAVE_USER);

    try {
      let requestURL = null;
      let options = null;

      if (id) {
        data.userId = id;
        requestURL = `${API_URL}/clients/${clientId}/updateUserWithClientRole`;
        options = {
          method: 'PUT',
          body: JSON.stringify(data),
        };
      } else {
        requestURL = `${API_URL}/clients/${clientId}/addUserWithClientRole`;
        options = {
          method: 'POST',
          body: JSON.stringify(data),
        };
      }

      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('Save User', 'User saved successfully!'));
      yield put(userSaved(data.siteId, response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(userSavingError(err));
    }
  }
}
