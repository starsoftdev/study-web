/**
 * Created by mike on 9/23/16.
 */

import { call, fork, put} from 'redux-saga/effects';

import request from 'utils/request';
import { getItem, removeItem } from 'utils/localStorage';

import { campaignsFetched, patientCategoriesFetched, sourcesFetched, studyFetched } from './actions';

// Bootstrap sagas
export default [
  fetchStudySaga,
];

function* fetchStudyDetails() {
  const studyId = getItem('study_id');
  const authToken = getItem('auth_token');

  const filter = JSON.stringify({
    include: ['campaigns', 'sources'],
  });
  const requestURL = `${API_URL}/studies/${studyId}?access_token=${authToken}&filter=${filter}`;
  const response = yield call(request, requestURL, {
    method: 'GET',
  });
  // populate the campaigns and sources from the study
  yield put(campaignsFetched(response.campaigns));
  yield put(sourcesFetched(response.sources));
  delete response.campaigns;
  delete response.sources;
  // put in the study in the state
  yield put(studyFetched(response));
}

function* fetchPatientCategories() {
  const authToken = getItem('auth_token');

  const requestURL = `${API_URL}/patientCategories?access_token=${authToken}`;
  const response = yield call(request, requestURL, {
    method: 'GET',
  });
  // populate the patient categories
  yield put(patientCategoriesFetched(response));
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
