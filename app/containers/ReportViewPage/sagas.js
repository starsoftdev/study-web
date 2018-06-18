import React from 'react';
import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions, toastr } from 'react-redux-toastr';
import FaSpinner from 'react-icons/lib/fa/spinner';
import { get } from 'lodash';
import { getItem, removeItem } from '../../utils/localStorage';
import request from '../../utils/request';
import composeQueryString from '../../utils/composeQueryString';
import { translate } from '../../../common/utilities/localization';

import {
  GET_REPORTS_LIST,
  CHANGE_PROTOCOL_STATUS,
  EXPORT_STUDIES,
  GET_REPORTS_TOTALS,
  GET_CATEGORY_NOTES,
  FETCH_DISPOSITION_TOTALS,
} from './constants';

import {
  getReportsListSuccess,
  getReportsListError,
  changeProtocolStatusSuccess,
  changeProtocolStatusError,
  getReportsTotalsSuccess,
  getReportsTotalsError,
  getCategoryNotesSuccess,
  getCategoryNotesError,
  getDispositionTotalsSuccess,
  getDispositionTotalsError,
} from './actions';


export function* reportViewPageSaga() {
  const watcherA = yield fork(fetchReportsWatcher);
  const watcherB = yield fork(changeProtocolStatusWatcher);
  const watcherC = yield fork(exportStudiesWatcher);
  const watcherD = yield fork(fetchReportsTotalsWatcher);
  const watcherE = yield fork(getCategoryNotesWatcher);
  const watcherF = yield fork(fetchDispositionsWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
}

export function* fetchReportsWatcher() {
  yield* takeLatest(GET_REPORTS_LIST, fetchReportsWorker);
}

export function* fetchReportsWorker(action) {
  try {
    const params = action.searchParams;

    const limit = action.limit || 50;
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

    const requestURL = `${API_URL}/studies/getStudiesByProtocolTmp?${queryString}`;


    const response = yield call(request, requestURL);

    let hasMore = true;
    const page = (offset / 50) + 1;
    if (response.length < 50) {
      hasMore = false;
    }

    yield put(getReportsListSuccess(response, hasMore, page));
  } catch (err) {
    toastr.error('', translate('sponsor.page.reportViewPage.toastrFetchStatsErrorMessage'));
    yield put(getReportsListError(err));
  }
}

export function* changeProtocolStatusWatcher() {
  yield* takeLatest(CHANGE_PROTOCOL_STATUS, changeProtocolStatusWorker);
}

export function* changeProtocolStatusWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.payload.studyId}/changeProtocolStatus`;
    const options = {
      method: 'GET',
      query: {
        status: action.status,
      },
    };

    const response = yield call(request, requestURL, options);
    yield put(changeProtocolStatusSuccess(response));
    toastr.success(translate('common.constants.success'), translate('sponsor.page.reportViewPage.toastrStatusMessage', { status: (action.payload.status ? 'active' : 'inactive') }));
  } catch (err) {
    yield put(changeProtocolStatusError(err));
    const errorMessage = get(err, 'message', translate('sponsor.page.reportViewPage.toastrUpdatingErrorMessage'));
    toastr.error('', errorMessage);
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
    const queryString = composeQueryString({ ...action.payload });
    const requestURL = `${API_URL}/studies/getStudiesForDB?${queryString}`;
    yield call(request, requestURL);
    const toastrOptions = {
      id: 'loadingToasterForExportStudies',
      type: 'success',
      message: 'Loading...',
      options: {
        timeOut: 0,
        icon: (<FaSpinner size={40} className="spinner-icon text-info" />),
        showCloseButton: true,
      },
    };
    yield put(toastrActions.add(toastrOptions));
  } catch (e) {
    // if returns forbidden we remove the token from local storage
    if (e.status === 401) {
      removeItem('auth_token');
    }
    const errorMessage = get(e, 'message', translate('sponsor.page.reportViewPage.toastrExportingErrorMessage'));
    toastr.error('', errorMessage);
    if (e.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchReportsTotalsWatcher() {
  yield* takeEvery(GET_REPORTS_TOTALS, fetchReportsTotalsWorker);
}

export function* fetchReportsTotalsWorker(action) {
  try {
    let queryString;
    let requestURL;
    if (action.searchParams) {
      queryString = composeQueryString(action.searchParams);
      requestURL = `${API_URL}/studies/getStudiesByProtocolTotalsTmp?${queryString}`;
    } else {
      requestURL = `${API_URL}/studies/getStudiesByProtocolTotalsTmp`;
    }
    const response = yield call(request, requestURL);
    yield put(getReportsTotalsSuccess(action.searchParams.source, response));
  } catch (err) {
    toastr.error('', translate('sponsor.page.reportViewPage.toastrFetchStatsErrorMessage'));
    yield put(getReportsTotalsError(err));
  }
}

export function* getCategoryNotesWatcher() {
  yield* takeLatest(GET_CATEGORY_NOTES, getCategoryNotesWorker);
}

export function* getCategoryNotesWorker(action) {
  try {
    const params = action.searchParams || {};

    const limit = action.limit || 10;
    const offset = action.offset || 0;

    params.category = action.category;
    params.studyId = action.studyId;
    params.limit = limit;
    params.offset = offset;

    const queryString = composeQueryString(params);
    const requestURL = `${API_URL}/studies/getPatientNotesByCategory?${queryString}`;


    const response = yield call(request, requestURL);

    let hasMore = true;
    const page = (offset / 10) + 1;
    if (response.length < 10) {
      hasMore = false;
    }

    yield put(getCategoryNotesSuccess(response, hasMore, page));
  } catch (err) {
    yield put(getCategoryNotesError(err));
  }
}

export function* fetchDispositionsWatcher() {
  yield* takeLatest(FETCH_DISPOSITION_TOTALS, fetchDispositionsWorker);
}
export function* fetchDispositionsWorker(action) {
  try {
    let queryString;
    let requestURL;
    if (action.searchParams) {
      queryString = composeQueryString(action.searchParams);
      requestURL = `${API_URL}/studies/getStudiesByDispositionTotals?${queryString}`;
    } else {
      requestURL = `${API_URL}/studies/getStudiesByDispositionTotals`;
    }
    const response = yield call(request, requestURL);
    yield put(getDispositionTotalsSuccess(response));
  } catch (err) {
    toastr.error('', translate('sponsor.page.reportViewPage.toastrFetchStatsErrorMessage'));
    yield put(getDispositionTotalsError(err));
  }
}

// All sagas to be loaded
export default [
  reportViewPageSaga,
];
