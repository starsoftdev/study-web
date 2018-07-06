// Bootstrap sagas
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from '../../utils/request';
import { GET_CAMPAIGNS_STATS } from './constants';
import { getCampaignsStatsSuccess, getCampaignsStatsError } from './actions';

export default [
  adminReportsSaga,
];

export function* adminReportsSaga() {
  const getCampaignsStatsWatcher1 = yield fork(getCampaignsStatsWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(getCampaignsStatsWatcher1);
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

