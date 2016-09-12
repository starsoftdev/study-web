import {
  take, call, put,
} from 'redux-saga/effects';

import { push } from 'react-router-redux';

import request from 'utils/request';
import { removeItem } from 'utils/localStorage';
import {
  LOGOUT_REQUEST,
} from 'containers/LoginPage/constants';

import { setAuthState } from 'containers/App/actions';

export default function* logoutSaga() {
  while (true) {
    yield take(LOGOUT_REQUEST);
    yield put(setAuthState(false));

    yield call(logout);
    yield put(push('/'));
  }
}

export function* logout() {
  try {
    const requestURL = `${API_URL}/users/out`;
    yield call(request, requestURL);

    yield call(removeItem, 'auth_token');
    yield call(removeItem, 'user_id');
  } catch (err) {
    // yield put()
  }
}
