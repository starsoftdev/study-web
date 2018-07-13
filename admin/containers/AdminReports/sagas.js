// Bootstrap sagas
import React from 'react';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions, toastr } from 'react-redux-toastr';
import { get } from 'lodash';
import FaSpinner from 'react-icons/lib/fa/spinner';
import request from '../../utils/request';
import {
  GET_CAMPAIGNS_STATS,
  EXPORT_MEDIA_TOTALS,
} from './constants';
import { getCampaignsStatsSuccess, getCampaignsStatsError } from './actions';

export default [
  adminReportsSaga,
];

export function* adminReportsSaga() {
  const getCampaignsStatsWatcher1 = yield fork(getCampaignsStatsWatcher);
  const exportMediaTotalsWatcher1 = yield fork(exportMediaTotalsWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(getCampaignsStatsWatcher1);
  yield cancel(exportMediaTotalsWatcher1);
}

export function* getCampaignsStatsWatcher() {
  yield* takeLatest(GET_CAMPAIGNS_STATS, getCampaignsStatsWorker);
}

export function* getCampaignsStatsWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/getCampaignsStats`;
    const { params, limit, offset } = action;
    params.limit = limit;
    params.offset = offset;
    params.getCampaignsStats = true;

    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);

    let hasMore = true;
    const page = (offset / 50) + 1;
    if (response.campaigns.length < 50) {
      hasMore = false;
    }

    yield put(getCampaignsStatsSuccess(response, hasMore, page));
  } catch (err) {
    console.log(err);
    yield put(getCampaignsStatsError(err));
  }
}

export function* exportMediaTotalsWatcher() {
  yield* takeLatest(EXPORT_MEDIA_TOTALS, exportMediaTotalsWorker);
}

export function* exportMediaTotalsWorker(action) {
  const { params } = action;
  try {
    const requestURL = `${API_URL}/studies/exportMediaTotalsForDashboard`;
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    yield call(request, requestURL, options);
    const toastrOptions = {
      id: 'loadingToasterForExportMediaTotals',
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
    const errorMessage = get(e, 'message', 'Something went wrong while exporting media totals. Please try again later.');
    toastr.error('', errorMessage);
  }
}

