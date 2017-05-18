import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import request from '../../utils/request';
import {
  FETCH_NOTE,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
} from './constants';

import {
  fetchNoteSuccess,
  fetchNoteError,
  addNoteSuccess,
  addNoteError,
  editNoteSuccess,
  editNoteError,
  deleteNoteSuccess,
  deleteNoteError,
} from './actions';

export function* dashboardNoteSaga() {
  const watcherA = yield fork(fetchNoteWatcher);
  const watcherB = yield fork(addNoteWatcher);
  const watcherC = yield fork(editNoteWatcher);
  const watcherD = yield fork(deleteNoteWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
}

export function* fetchNoteWatcher() {
  yield* takeLatest(FETCH_NOTE, fetchNoteWorker);
}

export function* fetchNoteWorker() {
  try {
    const requestURL = `${API_URL}/cros`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchNoteSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching note');
    yield put(toastrActions.error('', errorMessage));
    yield put(fetchNoteError(err));
  }
}

export function* addNoteWatcher() {
  yield* takeLatest(ADD_NOTE, addNoteWorker);
}

export function* addNoteWorker(action) {
  try {
    const requestURL = `${API_URL}/cros`;

    const params = {
      method: 'POST',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(addNoteSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving note');
    yield put(toastrActions.error('', errorMessage));
    yield put(addNoteError(err));
  }
}

export function* editNoteWatcher() {
  yield* takeLatest(EDIT_NOTE, editNoteWorker);
}

export function* editNoteWorker(action) {
  try {
    const requestURL = `${API_URL}/cros/${action.payload.id}`;

    const params = {
      method: 'PUT',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(editNoteSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving note');
    yield put(toastrActions.error('', errorMessage));
    yield put(editNoteError(err));
  }
}

export function* deleteNoteWatcher() {
  yield* takeLatest(DELETE_NOTE, deleteNoteWorker);
}

export function* deleteNoteWorker(action) {
  try {
    const requestURL = `${API_URL}/cros/${action.payload}`;

    const params = {
      method: 'DELETE',
    };
    yield call(request, requestURL, params);

    yield put(deleteNoteSuccess({ id: action.payload }));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while deleting note');
    yield put(toastrActions.error('', errorMessage));
    yield put(deleteNoteError(err));
  }
}

// All sagas to be loaded
export default [
  dashboardNoteSaga,
];
