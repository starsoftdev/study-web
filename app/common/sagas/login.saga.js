/**
 *
 */

/* eslint-disable no-constant-condition, consistent-return */

import {
  take, call, put, cancel, cancelled, fork, select,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import { selectLocationState } from 'containers/App/selectors';

import request from 'utils/request';
import { getItem, setItem, removeItem } from 'utils/localStorage';
import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
} from 'containers/LoginPage/constants';

import {
  RESET_PASSWORD_REQUEST,
} from 'containers/ResetPasswordPage/constants';

import {
  SET_NEW_PASSWORD_REQUEST,
} from 'containers/SetNewPasswordPage/constants';

import {
  CONFIRM_CHANGE_PASSWORD_REQUEST,
} from 'containers/ProfilePage/constants';

import { loginError, logout as logoutAction } from 'containers/LoginPage/actions';
import { fetchMeFromToken, setAuthState, setUserData } from 'containers/App/actions';

export default function* loginSaga() {
  while (true) {
    // listen for the LOGIN_REQUEST action dispatched on form submit
    const { payload } = yield take(LOGIN_REQUEST);

    // execute the authorize task asynchronously
    const task = yield fork(authorize, payload);

    // listen for the LOGOUT or LOGIN_ERROR action
    const action = yield take([LOGOUT_REQUEST, LOGIN_ERROR]);

    if (action.type === LOGOUT_REQUEST) {
      // since the authorize task executed asynchronously,
      // it is possible the LOGOUT action gets fired before
      // the the authorize task completes, so we call cancel on it
      yield cancel(task);
    } else {
      // remove jwt token from localstorage
      yield call(removeItem, 'auth_token');
      yield call(removeItem, 'user_id');
    }
  }
}

export function* authorize(data) {
  try {
    // send a post request with the login credentials
    const response = yield call(request, `${API_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // store auth token to localstorage
    yield call(setItem, 'auth_token', response.id);
    yield call(setItem, 'user_id', response.userId);
    // yield call(setItem, 'auth_token_ttl', response.ttl);
    yield put(setAuthState(true));

    // show toastr message
    yield put(toastrActions.success('', 'Login successful!'));

    // fetch details of authenticated user
    yield put(fetchMeFromToken());

    // return the response from the generator task
    return response;
  } catch (err) {
    // dispatch LOGIN_ERROR action
    yield put(loginError(err));
    yield put(toastrActions.error('', 'Login Failed!'));
  } finally {
    // because this generator task is asyc, it is possible to
    // send a logout action before the user gets logged in
    // whenever all the above code finish without an error,
    // check if this task got cancelled by the parent generator
    // http://yelouafi.github.io/redux-saga/docs/advanced/NonBlockingCalls.html
    if (yield cancelled()) {
      // TODO: do i need something here?
      // ... put special cancellation handling code here
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
    yield call(() => { location.href = '/login'; });
    yield call(logout);

    yield put(setAuthState(false));
    yield put(setUserData(null));
  }
}

export function* logout() {
  try {
    const authToken = getItem('auth_token');
    const requestURL = `${API_URL}/users/logout?access_token=${authToken}`;
    const params = {
      method: 'POST',
    };
    yield call(request, requestURL, params);

    yield call(removeItem, 'auth_token');
    yield call(removeItem, 'user_id');
  } catch (err) {
    // yield put()
  }
}

export function* resetPassword() {
  while (true) {
    try {
      const { payload } = yield take(RESET_PASSWORD_REQUEST);
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const requestURL = `${API_URL}/users/reset`;
      yield call(request, requestURL, params);
      yield put(toastrActions.success('Reset password', 'The request has been submitted successfully'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* setNewPassword() {
  while (true) {
    try {
      const { payload } = yield take(SET_NEW_PASSWORD_REQUEST);
      const state = yield select(selectLocationState());

      if (state.query && state.query.token) {
        const params = {
          method: 'POST',
          body: JSON.stringify(payload),
          authToken: state.query.token,
        };
        const requestURL = `${API_URL}/users/reset-password`;
        yield call(request, requestURL, params);
        yield put(toastrActions.success('Set new password', 'The request has been submitted successfully'));
        yield put(push('/app/login'));
      } else {
        const errorMessage = get(null, 'message', 'Can not find auth token!');
        yield put(toastrActions.error('', errorMessage));
      }
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* confirmPasswordChange() {
  while (true) {
    try {
      const { payload } = yield take(CONFIRM_CHANGE_PASSWORD_REQUEST);
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const requestURL = `${API_URL}/userPasswordChange/confirm-change-password`;
      yield call(request, requestURL, params);
      yield put(toastrActions.success('Change password', 'The password has been changed successfully'));

      yield put(logoutAction());
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}
