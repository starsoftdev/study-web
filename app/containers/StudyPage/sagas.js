/**
 * Created by mike on 9/23/16.
 */

import { take, call, put } from 'redux-saga/effects';

import request from 'utils/request';
import { getItem, removeItem } from 'utils/localStorage';
import { FETCH_STUDY } from 'containers/App/constants';
import { studyFetched } from 'containers/App/actions';

export default function* fetchStudySaga() {
  yield take(FETCH_STUDY);
  yield call(fetchStudyDetails);
}

export function* fetchStudyDetails() {
  const studyId = getItem('study_id');
  const authToken = getItem('auth_token');

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
