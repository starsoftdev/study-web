import { takeLatest } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from '../../utils/request';
import { translate } from '../../../common/utilities/localization';

import {
  FETCH_STUDIES_FOR_ADMIN,
} from '../AdminHome/constants';

import {
  FETCH_STUDY_CAMPAIGNS_STATS,
  FETCH_CAMPAIGN_DETAIL_STATS,
} from './constants';

import {
  fetchStudiesForAdminSuccess,
  fetchStudiesForAdminError,
} from '../AdminHome/actions';

import {
  fetchStudyCampaignsStatsSuccess,
  fetchStudyCampaignsStatsError,
  fetchCampaignDetailStatsSuccess,
  fetchCampaignDetailStatsError,
} from './actions';

// Bootstrap sagas
export default [
  adminStudyStatsSaga,
];
export function* fetchCampaignDetailStatsWatcher() {
  yield* takeLatest(FETCH_CAMPAIGN_DETAIL_STATS, fetchCampaignDetailStatsWorker);
}

export function* fetchCampaignDetailStatsWorker(action) {
  const { studyId, campaignId } = action;
  try {
    const requestURL = `${API_URL}/studies/${studyId}/getStudyCampaignsStats`;

    const options = {
      method: 'GET',
      query: {
        campaignId,
      },
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchCampaignDetailStatsSuccess(response));
  } catch (err) {
    yield put(fetchCampaignDetailStatsError(err));
  }
}


export function* fetchStudyCampaignsStatsWatcher() {
  yield* takeLatest(FETCH_STUDY_CAMPAIGNS_STATS, fetchStudyCampaignsStatsWorker);
}

export function* fetchStudyCampaignsStatsWorker(action) {
  const { studyId } = action;
  try {
    const requestURL = `${API_URL}/studies/${studyId}/getStudyCampaignsStats`;

    const options = {
      method: 'GET',
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchStudyCampaignsStatsSuccess(response));
  } catch (err) {
    yield put(fetchStudyCampaignsStatsError(err));
  }
}

export function* fetchStudiesForAdminWatcher() {
  yield* takeLatest(FETCH_STUDIES_FOR_ADMIN, fetchStudiesForAdminWorker);
}

export function* fetchStudiesForAdminWorker(action) {
  const { params, limit, offset } = action;
  try {
    const requestURL = `${API_URL}/studies/getStudiesForDashboard`;
    params.limit = limit;
    params.offset = offset;

    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);

    let hasMore = true;
    const page = (offset / 50) + 1;
    if (response.studies.length < 50) {
      hasMore = false;
    }

    if (response.studies.length === 0 && offset === 0) {
      toastr.error('', translate('portals.client.component.studiesList.fetchStudiesToastrError'));
    }

    yield put(fetchStudiesForAdminSuccess(response, hasMore, page));
  } catch (err) {
    console.log(err);
    yield put(fetchStudiesForAdminError(err));
  }
}


export function* adminStudyStatsSaga() {
  const fetchStudiesForAdminWatcher1 = yield fork(fetchStudiesForAdminWatcher);
  const fetchStudyCampaignsStatsWatcher1 = yield fork(fetchStudyCampaignsStatsWatcher);
  const fetchCampaignDetailStatsWatcher1 = yield fork(fetchCampaignDetailStatsWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(fetchStudiesForAdminWatcher1);
  yield cancel(fetchStudyCampaignsStatsWatcher1);
  yield cancel(fetchCampaignDetailStatsWatcher1);
}
