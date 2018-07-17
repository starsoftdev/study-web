/*
 *  saga to load auth user details from the just token
 */
import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import moment from 'moment-timezone';

import request from '../../../common/utils/request';
import { getItem, removeItem } from '../../../app/utils/localStorage';
import { FETCH_ME_FROM_TOKEN, LOGOUT_REQUEST } from '../../containers/App/constants';
import { setAuthState, setUserData } from '../../containers/App/actions';
import { SET_SOCKET_CONNECTION } from '../../containers/GlobalNotifications/constants';
import { connectionEstablished } from '../../containers/GlobalNotifications/actions';

let socket = null;

export default function* vendorAppSaga() {
  yield fork(fetchMeSaga);
  yield fork(logoutSaga);
  yield fork(setSocketConnection);
}


export function* fetchMeSaga() {
  while (true) {
    const { redirect } = yield take(FETCH_ME_FROM_TOKEN);
    yield call(fetchMeFromToken, redirect);
  }
}

export function* fetchMeFromToken(redirect) {
  const userId = getItem('user_id');
  const authToken = getItem('auth_token');

  if (!authToken) {
    return;
  }

  try {
    const requestURL = `${API_URL}/users/${userId}/get-full-user-info`;
    const response = yield call(request, requestURL);
    moment.tz.setDefault(response.timezone);

    yield put(setUserData(response));

  } catch (e) {
    yield put(setAuthState(false));
    yield put(setUserData(null));

    // if returns forbidden we remove the token from local storage
    if (e.status === 401) {
      removeItem('auth_token');
    }
    // if the redirect is enabled (i.e. not for corporate site), then redirect to the login page
    if (redirect) {
      yield put(push('/login'));
    }
  }
}

export function* logoutSaga() {
  while (true) {
    yield take(LOGOUT_REQUEST);

    // Redirect to login page before setting auth state.
    // This way no components will attempt to re-render using
    // absent user data.
    // manually push the location state to the login URL, since replace will try to update redux state, which we do not want
    yield call(logout);
    yield call(removeItem, 'temp_password');
    yield call(() => { location.href = '/login'; });

    yield put(setAuthState(false));
    yield put(setUserData(null));
  }
}

export function* logout() {
  try {
    const requestURL = `${API_URL}/users/logout`;
    const params = {
      method: 'POST',
    };
    yield call(request, requestURL, params);

    yield call(removeItem, 'auth_token');
    yield call(removeItem, 'user_id');
    yield call(removeItem, 'auth_time');
  } catch (err) {
    // yield put()
  }
}

export function* setSocketConnection() {
  while (true) {
    const { payload } = yield take(SET_SOCKET_CONNECTION);
    try {
      if (!socket) {
        const requestURL = `${SOCKET_URL}/${payload.nsp}`;
        const nsp = window.io(requestURL);
        socket = nsp;
        yield put(connectionEstablished(nsp));
        payload.cb(null, socket);
      }
    } catch (err) {
      payload.cb(err, null);
    }
  }
}
