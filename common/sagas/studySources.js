import { call, put, take } from 'redux-saga/effects';
import request from '../../app/utils/request';
import { FETCH_STUDY_SOURCES } from '../constants/studySources';
import {
  fetchStudySourcesSuccess,
  fetchStudySourcesError,
} from '../actions/studySources';

export function* fetchStudySources() {
  while (true) {
    const { studyId } = yield take(FETCH_STUDY_SOURCES);
    try {
      const options = {
        method: 'GET',
      };

      const requestURL = `${API_URL}/studies/${studyId}/studySources`;
      const response = yield call(request, requestURL, options);

      yield put(fetchStudySourcesSuccess(response));
    } catch (err) {
      yield put(fetchStudySourcesError(err));
    }
  }
}
