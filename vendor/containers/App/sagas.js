/*
 *  saga to load auth user details from the just token
 */
import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import moment from 'moment-timezone';

import request from '../../../app/utils/request';
import { getItem, removeItem } from '../../../app/utils/localStorage';
import { FETCH_ME_FROM_TOKEN } from '../../containers/App/constants';
import { setAuthState, setUserData } from '../../containers/App/actions';

export default function* fetchMeSaga() {
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
