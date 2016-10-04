/**
 * Created by mike on 9/23/16.
 */

import { call, fork, put } from 'redux-saga/effects';

import request from 'utils/request';
import { getItem, removeItem } from 'utils/localStorage';

import { campaignsFetched, patientCategoriesFetched, sitesFetched, sourcesFetched, studyFetched } from './actions';

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
    fields: 'name',
  });
  const requestURL = `${API_URL}/patientCategories?access_token=${authToken}&filter=${filter}`;
  const response = yield call(request, requestURL, {
    method: 'GET',
  });
  const patientCategories = response.map(patientCategory => (
    patientCategory.name
  ));
    // populate the patient categories
  yield put(patientCategoriesFetched(patientCategories));
}

export function* fetchStudySaga() {
  const authToken = getItem('auth_token');
  if (!authToken) {
    return;
  }

  try {
    yield fork(fetchStudyDetails);
    yield fork(fetchPatientCategories);
  } catch (e) {
    // if returns forbidden we remove the token from local storage
    if (e.status === 401) {
      removeItem('auth_token');
    }
  }
}
