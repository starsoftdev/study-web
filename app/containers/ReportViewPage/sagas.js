import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import { getItem, removeItem } from '../../utils/localStorage';
import request from '../../utils/request';
import composeQueryString from '../../utils/composeQueryString';

import {
  GET_REPORTS_LIST,
  CHANGE_PROTOCOL_STATUS,
  EXPORT_STUDIES,
} from './constants';

import {
  getReportsListSuccess,
  getReportsListError,
  changeProtocolStatusSuccess,
  changeProtocolStatusError,
} from './actions';


export function* reportViewPageSaga() {
  const watcherA = yield fork(fetchReportsWatcher);
  const watcherB = yield fork(changeProtocolStatusWatcher);
  const watcherC = yield fork(exportStudiesWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
}

export function* fetchReportsWatcher() {
  yield* takeLatest(GET_REPORTS_LIST, fetchReportsWorker);
}

export function* fetchReportsWorker(action) {
  try {
    let queryString;
    let requestURL;
    if (action.searchParams) {
      queryString = composeQueryString(action.searchParams);
      requestURL = `${API_URL}/studies/getStudiesByProtocol?${queryString}`;
    } else {
      requestURL = `${API_URL}/studies/getStudiesByProtocol`;
    }
    const response = yield call(request, requestURL);
    yield put(getReportsListSuccess(response));
  } catch (err) {
    yield put(getReportsListError(err));
  }
}

export function* changeProtocolStatusWatcher() {
  yield* takeLatest(CHANGE_PROTOCOL_STATUS, changeProtocolStatusWorker);
}

export function* changeProtocolStatusWorker(action) {
  try {
    const queryString = composeQueryString(action.payload);
    const requestURL = `${API_URL}/studies/changeProtocolStatus?${queryString}`;

    const response = yield call(request, requestURL);
    yield put(changeProtocolStatusSuccess(response));
    yield put(toastrActions.success('Success!', `The study is now ${action.payload.status ? 'active' : 'inactive'}.`));
  } catch (err) {
    yield put(changeProtocolStatusError(err));
    const errorMessage = get(err, 'message', 'Something went wrong while updating study status');
    yield put(toastrActions.error('', errorMessage));
  }
}

export function* exportStudiesWatcher() {
  yield* takeLatest(EXPORT_STUDIES, exportStudiesWorker);
}

export function* exportStudiesWorker(action) {
  const { studyId, text, campaignId, sourceId } = action.payload;
  const authToken = getItem('auth_token');
  if (!authToken) {
    return;
  }

  try {
    const queryString = composeQueryString(action.payload);
    const requestURL = `${API_URL}/studies/getStudiesForDB?access_token=${authToken}&${queryString}`;
    location.replace(`${requestURL}`);
  } catch (e) {
    // if returns forbidden we remove the token from local storage
    if (e.status === 401) {
      removeItem('auth_token');
    }
    const errorMessage = get(e, 'message', 'Something went wrong while fetching patients. Please try again later.');
    yield put(toastrActions.error('', errorMessage));
    if (e.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

// All sagas to be loaded
export default [
  reportViewPageSaga,
];
