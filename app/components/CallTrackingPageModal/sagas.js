import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { get } from 'lodash';

import request from '../../utils/request';

import { deleteMediaTypeSuccess } from './actions';

import {
  DELETE_MEDIA_TYPE,
} from './constants';

export function* deleteMediaType() {
  yield* takeLatest(DELETE_MEDIA_TYPE, deleteMediaTypeWorker);
}

export function* deleteMediaTypeWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.studyId}/canDeleteSource/${action.studySourceId}`;
    const response = yield call(request, requestURL);
    if (response.canDelete) {
      yield put(deleteMediaTypeSuccess(action.index));
    } else {
      toastr.error('', 'Error! There is patient data for a deleted media type in the study.');
    }
  } catch (err) {
    // give a redux toastr message in case there's an error
    const errorMessage = get(err, 'message', 'Something went wrong when validating the delete for media type.');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

let deleteMediaTypeWatcher = false;
export function* homePageSaga() {
  if (!deleteMediaTypeWatcher) {
    deleteMediaTypeWatcher = yield fork(deleteMediaType);
  }
  // Suspend execution until location changes
  const options = yield take(LOCATION_CHANGE);
  if (options.payload.pathname !== '/app') {
    if (deleteMediaTypeWatcher) {
      yield cancel(deleteMediaTypeWatcher);
      deleteMediaTypeWatcher = false;
    }
  }
}
