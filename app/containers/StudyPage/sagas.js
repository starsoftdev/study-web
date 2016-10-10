/**
 * Created by mike on 9/23/16.
 */

import { call, fork, put, take } from 'redux-saga/effects';
import request from 'utils/request';
import { getItem, removeItem } from 'utils/localStorage';
import { FETCH_PATIENTS } from './constants';

import { campaignsFetched, patientCategoriesFetched, patientsFetched, sitesFetched, sourcesFetched, studyFetched } from './actions';

// Bootstrap sagas
export default [
  fetchStudySaga,
];

function* fetchStudyDetails() {
  const studyId = getItem('study_id');
  const authToken = getItem('auth_token');

  const filter = JSON.stringify({
    include: ['campaigns', 'sources', 'sites'],
  });
  const requestURL = `${API_URL}/studies/${studyId}?access_token=${authToken}&filter=${filter}`;
  const response = yield call(request, requestURL, {
    method: 'GET',
  });
  // populate the campaigns and sources from the study
  yield put(campaignsFetched(response.campaigns));
  yield put(sourcesFetched(response.sources));
  yield put(sitesFetched(response.sites));
  delete response.campaigns;
  delete response.sources;
  delete response.sites;
  // put in the study in the state
  yield put(studyFetched(response));
}

function* fetchPatientCategories() {
  const authToken = getItem('auth_token');

  const filter = JSON.stringify({
    fields: ['name', 'id'],
  });
  const requestURL = `${API_URL}/patientCategories?access_token=${authToken}&filter=${filter}`;
  const response = yield call(request, requestURL, {
    method: 'GET',
  });
  // populate the patient categories
  yield put(patientCategoriesFetched(response));
}

export function* fetchPatients(filter) {
  const authToken = getItem('auth_token');
  if (!authToken) {
    return;
  }
  const studyId = getItem('study_id');
  const siteId = getItem('site_id');
  const campaignId = getItem('campaign_id');
  const sourceId = getItem('source_id');

  try {
    let requestURL = `${API_URL}/studies/${studyId}/patients?access_token=${authToken}&siteId=${siteId}`;
    if (campaignId) {
      requestURL += `&campaignId=${campaignId}`;
    }
    if (sourceId) {
      requestURL += `&sourceId=${sourceId}`;
    }
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    // populate the patients
    yield put(patientsFetched(response));
  } catch (e) {
    // if returns forbidden we remove the token from local storage
    if (e.status === 401) {
      removeItem('auth_token');
    }
  }
}

export function* fetchPatientsWithFilter() {
  while(true) {
    // listen for the FETCH_PATIENTS action
    const { filter } = yield take(FETCH_PATIENTS);
    yield call(fetchPatients(filter));
  }
}

export function* fetchStudySaga() {
  const authToken = getItem('auth_token');
  if (!authToken) {
    return;
  }

  try {
    yield fork(fetchStudyDetails);
    yield call(fetchPatientCategories);
    yield fork(fetchPatients);
    yield fork(fetchPatientsWithFilter);
  } catch (e) {
    // if returns forbidden we remove the token from local storage
    if (e.status === 401) {
      removeItem('auth_token');
    }
  }
}
