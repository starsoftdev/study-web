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
  UPDATE_THANK_YOU_PAGE,
  FETCH_LANDING,
  UPDATE_FACEBOOK_LANDING_PAGE,
  FETCH_STUDY_MEDIA_TYPES,
  DELETE_STUDY_MEDIA_TYPE,
  EDIT_STUDY_MEDIA_TYPES,
} from './constants';

import {
  fetchNoteSuccess,
  fetchNoteError,
  addNoteSuccess,
  addNoteError,
  deleteNoteSuccess,
  deleteNoteError,
  updateThankYouPageSuccess,
  updateThankYouPageError,
  landingFetched,
  fetchLandingError,
  updateFacebookLandingPageError,
  updateFacebookLandingPageSuccess,
  fetchStudyMediaTypesError,
  fetchStudyMediaTypesSuccess,
  deleteStudyMediaTypeSuccess,
  editStudyMediaTypesSuccess,
  editStudyMediaTypesError,
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

export function* updateThankYouPageWatcher() {
  yield* takeLatest(UPDATE_THANK_YOU_PAGE, updateThankYouPageWorker);
}

export function* updateThankYouPageWorker(action) {
  const { params } = action;

  try {
    const requestURL = `${API_URL}/thankYouPages/updateThankYouPage`;
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);
    yield put(updateThankYouPageSuccess(response));
  } catch (err) {
    yield put(updateThankYouPageError(err));
  }
}

export function* fetchLandingForAdminWatcher() {
  yield* takeLatest(FETCH_LANDING, fetchLandingForAdminWorker);
}

export function* fetchLandingForAdminWorker(action) {
  const { studyId, utm } = action;
  try {
    const requestURL = `${API_URL}/landingPages/${studyId}/fetchLanding`;
    const response = yield call(request, requestURL, {
      method: 'GET',
      query: {
        utm,
      },
    });
    yield put(landingFetched(response));
    if (!response.isUtmValid) {
      toastr.error('', 'Error! Invalid UTM.');
    }
  } catch (err) {
    yield put(fetchLandingError(err));
  }
}

export function* updateFacebookLandingPageWatcher() {
  yield* takeLatest(UPDATE_FACEBOOK_LANDING_PAGE, updateFacebookLandingPageWorker);
}

export function* updateFacebookLandingPageWorker(action) {
  const { params } = action;

  try {
    const requestURL = `${API_URL}/landingPages/updateFacebookLandingPage`;
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);
    yield put(updateFacebookLandingPageSuccess(response));
  } catch (err) {
    yield put(updateFacebookLandingPageError(err));
  }
}

export function* fetchStudyMediaTypes() {
  while (true) {
    const { studyId } = yield take(FETCH_STUDY_MEDIA_TYPES);
    try {
      const options = {
        method: 'GET',
      };

      const requestURL = `${API_URL}/studies/${studyId}/studyMediaTypes`;
      const response = yield call(request, requestURL, options);

      yield put(fetchStudyMediaTypesSuccess(response));
    } catch (err) {
      yield put(fetchStudyMediaTypesError(err));
    }
  }
}

export function* deleteStudyMediaType() {
  yield* takeLatest(DELETE_STUDY_MEDIA_TYPE, deleteStudyMediaTypeWorker);
}

export function* deleteStudyMediaTypeWorker(action) {
  try {
    if (action.studySourceId) {
      const requestURL = `${API_URL}/studies/${action.studyId}/canDeleteSource/${action.studySourceId}`;
      const response = yield call(request, requestURL);
      if (response.canDelete) {
        yield put(deleteStudyMediaTypeSuccess(action.index));
      } else {
        toastr.error('', 'Error! There is patient data for a deleted media type in the study.');
      }
    } else {
      // if there is no study source id, this means that there is no studySource created on the server either, so we
      // can just remove this straightaway from the client side
      yield put(deleteStudyMediaTypeSuccess(action.index));
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

export function* editStudyMediaTypesWatcher() {
  yield* takeLatest(EDIT_STUDY_MEDIA_TYPES, editStudyMediaTypesWorker);
}

export function* editStudyMediaTypesWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.studyId}/editMediaTypes`;
    const params = {
      method: 'POST',
      body: JSON.stringify({
        mediaTypes: action.mediaTypes,
        mediaTracking: action.mediaTracking,
      }),
    };
    const response = yield call(request, requestURL, params);
    if (response.success) {
      yield put(editStudyMediaTypesSuccess(action.mediaTypes, action.studyId, action.mediaTracking));
      toastr.success('', 'The request has been submitted successfully.');
      // fetch the media types to get the new study source ids (if any were created)
      if (action.mediaTypes.length > 0) {
        let created = false;
        for (const mediaType of action.mediaTypes) {
          if (!mediaType.studySourceId) {
            // this media type doesn't have a studySourceId, so it is brand new, and needs an API call to get the study source id
            created = true;
            break;
          }
        }
        if (created) {
          yield put(fetchStudyMediaTypes(action.studyId));
        }
      }
    } else {
      yield put(editStudyMediaTypesError(response));
    }
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    toastr.error('', errorMessage);
    yield put(editStudyMediaTypesError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}


export function* adminStudyEditSaga() {
  const fetchNoteWatcher1 = yield fork(fetchNoteWatcher);
  const addNoteWatcher1 = yield fork(addNoteWatcher);
  const deleteNoteWatcher1 = yield fork(deleteNoteWatcher);
  const updateThankYouPageWatcher1 = yield fork(updateThankYouPageWatcher);
  const fetchLandingForAdminWatcher1 = yield fork(fetchLandingForAdminWatcher);
  const updateFacebookLandingPageWatcher1 = yield fork(updateFacebookLandingPageWatcher);
  const deleteStudyMediaTypeWatcher1 = yield fork(deleteStudyMediaType);
  const editStudyMediaTypesWatcher1 = yield fork(editStudyMediaTypesWatcher);
  yield fork(fetchStudyMediaTypes);


  yield take(LOCATION_CHANGE);
  yield cancel(fetchNoteWatcher1);
  yield cancel(addNoteWatcher1);
  yield cancel(deleteNoteWatcher1);
  yield cancel(updateThankYouPageWatcher1);
  yield cancel(fetchLandingForAdminWatcher1);
  yield cancel(updateFacebookLandingPageWatcher1);
  yield cancel(deleteStudyMediaTypeWatcher1);
  yield cancel(editStudyMediaTypesWatcher1);
}
