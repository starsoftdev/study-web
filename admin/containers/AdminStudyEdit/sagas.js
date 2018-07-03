import { takeLatest } from 'redux-saga';
import { call, put, fork, cancel, take } from 'redux-saga/effects';
import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from '../../utils/request';

import {
  FETCH_NOTE,
  ADD_NOTE,
  DELETE_NOTE,
  FETCH_LANDING,
  EDIT_PATIENT_THANK_YOU,
} from './constants';

import {
  fetchNoteSuccess,
  fetchNoteError,
  addNoteSuccess,
  addNoteError,
  deleteNoteSuccess,
  deleteNoteError,
  fetchLandingSuccess,
  fetchLandingError,
  updatePatientThankYouEmailSuccess,
  updatePatientThankYouEmailError,
} from './actions';

// Bootstrap sagas
export default [
  adminStudyEditSaga,
];

export function* fetchNoteWatcher() {
  yield* takeLatest(FETCH_NOTE, fetchNoteWorker);
}

export function* fetchNoteWorker(action) {
  try {
    const requestURL = `${API_URL}/notes`;
    const { studyId } = action;

    const filterObj = {
      where: { study_id: studyId },
      include: [{
        relation: 'user',
        scope: {
          where: { isArchived: false },
          include: 'roleForClient',
        },
      }],
    };

    const queryParams = {
      filter: JSON.stringify(filterObj),
    };

    const response = yield call(request, requestURL, { query: queryParams });

    yield put(fetchNoteSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching note');
    toastr.error('', errorMessage);
    yield put(fetchNoteError(err));
  }
}

export function* addNoteWatcher() {
  yield* takeLatest(ADD_NOTE, addNoteWorker);
}

export function* addNoteWorker(action) {
  try {
    const requestURL = `${API_URL}/notes`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(addNoteSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving note');
    toastr.error('', errorMessage);
    yield put(addNoteError(err));
  }
}

export function* deleteNoteWatcher() {
  yield* takeLatest(DELETE_NOTE, deleteNoteWorker);
}

export function* deleteNoteWorker(action) {
  try {
    const requestURL = `${API_URL}/notes/${action.payload}`;

    const params = {
      method: 'DELETE',
    };
    yield call(request, requestURL, params);

    yield put(deleteNoteSuccess({ id: action.payload }));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while deleting note');
    toastr.error('', errorMessage);
    yield put(deleteNoteError(err));
  }
}

export function* fetchLandingWatcher() {
  yield* takeLatest(FETCH_LANDING, fetchLandingWorker);
}

export function* fetchLandingWorker(action) {
  const { studyId, utm } = action;

  // put the fetching study action in case of a navigation action
  try {
    const requestURL = `${API_URL}/landingPages/${studyId}/fetchLanding`;
    const response = yield call(request, requestURL, {
      method: 'GET',
      query: {
        utm,
      },
    });
    yield put(fetchLandingSuccess(response));
    if (!response.isUtmValid) {
      toastr.error('', 'Error! Invalid UTM.');
    }
  } catch (err) {
    yield put(fetchLandingError(err));
  }
}

export function* updatePatientThankYouEmailWatcher() {
  yield* takeLatest(EDIT_PATIENT_THANK_YOU, updatePatientThankYouEmailWorker);
}

export function* updatePatientThankYouEmailWorker(action) {
  const { params } = action;

  try {
    const requestURL = `${API_URL}/thankYouPages/updatePatientThankYouEmail`;
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);
    yield put(updatePatientThankYouEmailSuccess(response));
  } catch (err) {
    yield put(updatePatientThankYouEmailError(err));
  }
}

export function* adminStudyEditSaga() {
  const fetchNoteWatcher1 = yield fork(fetchNoteWatcher);
  const addNoteWatcher1 = yield fork(addNoteWatcher);
  const deleteNoteWatcher1 = yield fork(deleteNoteWatcher);
  const fetchLandingWatcher1 = yield fork(fetchLandingWatcher);
  const updatePatientThankYouEmailWatcher1 = yield fork(updatePatientThankYouEmailWatcher);


  yield take(LOCATION_CHANGE);
  yield cancel(fetchNoteWatcher1);
  yield cancel(addNoteWatcher1);
  yield cancel(deleteNoteWatcher1);
  yield cancel(fetchLandingWatcher1);
  yield cancel(updatePatientThankYouEmailWatcher1);
}
