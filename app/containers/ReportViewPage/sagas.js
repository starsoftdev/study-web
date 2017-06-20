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
  GET_REPORTS_TOTALS,
} from './constants';

import {
  getReportsListSuccess,
  getReportsListError,
  changeProtocolStatusSuccess,
  changeProtocolStatusError,
  getReportsTotalsSuccess,
  getReportsTotalsError,
} from './actions';


export function* reportViewPageSaga() {
  const watcherA = yield fork(fetchReportsWatcher);
  const watcherB = yield fork(changeProtocolStatusWatcher);
  const watcherC = yield fork(exportStudiesWatcher);
  const watcherD = yield fork(fetchReportsTotalsWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* fetchReportsWatcher() {
  yield* takeLatest(GET_REPORTS_LIST, fetchReportsWorker);
}

export function* fetchReportsWorker(action) {
  try {
    const params = action.searchParams;

    const limit = action.limit || 10;
    const offset = action.offset || 0;
    const sort = action.sort || null;
    const order = action.order || null;

    params.limit = limit;
    params.offset = offset;
    if (sort && order) {
      params.orderBy = sort;
      params.orderDir = ((order === 'down') ? 'DESC' : 'ASC');
    }

    const queryString = composeQueryString(params);

    const requestURL = `${API_URL}/studies/getStudiesByProtocol?${queryString}`;


    const response = yield call(request, requestURL);

    let hasMore = true;
    const page = (offset / 10) + 1;
    if (response.length < 10) {
      hasMore = false;
    }

    yield put(getReportsListSuccess(response, hasMore, page));
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

export function* fetchReportsTotalsWatcher() {
  yield* takeLatest(GET_REPORTS_TOTALS, fetchReportsTotalsWorker);
}

export function* fetchReportsTotalsWorker(action) {
  try {
    let queryString;
    let requestURL;
    if (action.searchParams) {
      queryString = composeQueryString(action.searchParams);
      requestURL = `${API_URL}/studies/getStudiesByProtocolTotals?${queryString}`;
    } else {
      requestURL = `${API_URL}/studies/getStudiesByProtocolTotals`;
    }
    const response = yield call(request, requestURL);
    yield put(getReportsTotalsSuccess(response));
  } catch (err) {
    yield put(getReportsTotalsError(err));
  }
}

// All sagas to be loaded
export default [
  reportViewPageSaga,
];
