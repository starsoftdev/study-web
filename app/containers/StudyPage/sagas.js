// /* eslint-disable no-constant-condition, consistent-return */

import { take, put, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';

import request from 'utils/request';

import { logout } from 'containers/LoginPage/actions';
import {
  FETCH_STUDY,
  FETCH_STUDY_PATIENTS,
} from 'containers/StudyPage/constants';

// Bootstrap sagas
export default [
  studyPageSaga,
];

export function* studyPageSaga() {
  // const watcherA = yield fork(changePassword);
  // const watcherB = yield fork(changeImage);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  // yield cancel(watcherA);
  // yield cancel(watcherB);
}
