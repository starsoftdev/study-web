/**
 * Created by mike on 9/23/16.
 */

import { take, call, put } from 'redux-saga/effects';

import request from 'utils/request';
import { getItem, removeItem } from 'utils/localStorage';
import { studyFetched } from './actions';

// Bootstrap sagas
export default [
  fetchStudySaga,
];

export function* fetchStudySaga() {
  yield call(fetchStudyDetails);
}

export function* fetchStudyDetails() {
  const studyId = getItem('study_id');
  const authToken = getItem('auth_token');
  console.log('test');
  console.log(authToken);

  if (!authToken) {
    return;
  }

  try {
    const requestURL = `${API_URL}/studies/${studyId}?access_token=${authToken}`;
    const response = yield call(request, requestURL);

    yield put(studyFetched(response));
  } catch (e) {
    // if returns forbidden we remove the token from local storage
    if (e.status === 401) {
      removeItem('auth_token');
    }
  }
}
