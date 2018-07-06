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
  UPDATE_THANK_YOU_PAGE,
  UPDATE_FACEBOOK_LANDING_PAGE,
  FETCH_STUDY_MEDIA_TYPES,
  DELETE_STUDY_MEDIA_TYPE,
  EDIT_STUDY_MEDIA_TYPES,
  UPDATE_LANDING_PAGE,
  CHANGE_STUDY_AD,
  REMOVE_STUDY_AD,
  FETCH_LEVELS,
  FETCH_CAMPAIGNS_BY_STUDY,
  EDIT_CAMPAIGN,
  DELETE_CAMPAIGN,
  FETCH_FIVE_9_LIST,


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
  updatePatientThankYouEmailSuccess,
  updatePatientThankYouEmailError,
  updateFacebookLandingPageError,
  updateFacebookLandingPageSuccess,
  fetchStudyMediaTypesError,
  fetchStudyMediaTypesSuccess,
  deleteStudyMediaTypeSuccess,
  editStudyMediaTypesSuccess,
  editStudyMediaTypesError,
  updateLandingPageError,
  updateLandingPageSuccess,
  removeStudyAdError,
  removeStudyAdSuccess,
  changeStudyAdError,
  changeStudyAdSuccess,
  levelsFetched,
  levelsFetchingError,
  fetchCampaignsByStudySuccess,
  fetchCampaignsByStudyError,
  editCampaignSuccess,
  editCampaignError,
  deleteCampaignSuccess,
  deleteCampaignError,
  fetchCampaignsByStudy,
  fetchFive9ListSuccess,
  fetchFive9ListError,
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


export function* updateLandingPageWatcher() {
  yield* takeLatest(UPDATE_LANDING_PAGE, updateLandingPageWorker);
}

export function* updateLandingPageWorker(action) {
  const { params } = action;

  try {
    const requestURL = `${API_URL}/landingPages/updateLandingPage`;
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);
    yield put(updateLandingPageSuccess(response));
  } catch (err) {
    yield put(updateLandingPageError(err));
  }
}

export function* changeStudyAdWatcher() {
  yield* takeLatest(CHANGE_STUDY_AD, changeStudyAdWorker);
}

export function* changeStudyAdWorker(action) {
  const { payload } = action;

  try {
    const requestURL = `${API_URL}/landingPages/change-study-add`;
    const data = new FormData();
    data.append('file', payload.file);
    data.append('study_id', payload.study_id);

    const options = {
      method: 'POST',
      body: data,
      useDefaultContentType: true,
    };

    const response = yield call(request, requestURL, options);
    toastr.success('', 'Success! Study ad has been updated.');
    yield put(changeStudyAdSuccess(response));
  } catch (err) {
    toastr.error('', 'Error! Unable to read file. Please try a different one.');
    yield put(changeStudyAdError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* removeStudyAdWatcher() {
  yield* takeLatest(REMOVE_STUDY_AD, removeStudyAdWorker);
}

export function* removeStudyAdWorker(action) {
  const { studyId } = action;

  try {
    const requestURL = `${API_URL}/landingPages/remove-study-add`;

    const options = {
      method: 'POST',
      body: JSON.stringify({ studyId }),
    };

    yield call(request, requestURL, options);
    toastr.success('', 'Success! Study ad has been removed.');
    yield put(removeStudyAdSuccess(studyId));
  } catch (err) {
    toastr.error('Error!');
    yield put(removeStudyAdError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchLevelsWatcher() {
  yield* takeLatest(FETCH_LEVELS, fetchLevelsWorker);
}

export function* fetchLevelsWorker() {
  try {
    const requestURL = `${API_URL}/levels`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(levelsFetched(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching level');
    toastr.error('', errorMessage);
    yield put(levelsFetchingError(err));
  }
}

export function* fetchCampaignsByStudyWatcher() {
  yield* takeLatest(FETCH_CAMPAIGNS_BY_STUDY, fetchCampaignsByStudyWorker);
}

export function* fetchCampaignsByStudyWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.payload}/getCampaignsWithPatientsCount`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchCampaignsByStudySuccess(response));
  } catch (err) {
    yield put(fetchCampaignsByStudyError(err));
    const errorMessage = get(err, 'message', 'Something went wrong while fetching campaigns for selected study');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* editCampaignWatcher() {
  yield* takeLatest(EDIT_CAMPAIGN, editCampaignWorker);
}

export function* editCampaignWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.payload.studyId}/campaigns/${action.payload.campaignId}`;
    const params = {
      method: 'PUT',
      body: JSON.stringify(action.payload),
    };
    yield call(request, requestURL, params);
    yield put(editCampaignSuccess(action.payload, action.campaignInfo));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    toastr.error('', errorMessage);
    yield put(editCampaignError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* deleteCampaignWatcher() {
  yield* takeLatest(DELETE_CAMPAIGN, deleteCampaignWorker);
}

export function* deleteCampaignWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.payload.studyId}/campaigns/${action.payload.campaignId}`;
    const params = {
      method: 'DELETE',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);
    if (response.success) {
      yield put(fetchCampaignsByStudy(action.payload.studyId));
      yield put(deleteCampaignSuccess(action.payload));
    } else {
      yield put(deleteCampaignError(response));
    }
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    toastr.error('', errorMessage);
    yield put(deleteCampaignError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchFive9ListWatcher() {
  yield* takeLatest(FETCH_FIVE_9_LIST, fetchFive9ListWorker);
}

export function* fetchFive9ListWorker() {
  try {
    const requestURL = `${API_URL}/studies/getFive9ListsList`;
    const options = {
      method: 'GET',
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchFive9ListSuccess(response));
  } catch (err) {
    yield put(fetchFive9ListError(err));
  }
}


export function* adminStudyEditSaga() {
  const fetchNoteWatcher1 = yield fork(fetchNoteWatcher);
  const addNoteWatcher1 = yield fork(addNoteWatcher);
  const deleteNoteWatcher1 = yield fork(deleteNoteWatcher);
  const updatePatientThankYouEmailWatcher1 = yield fork(updatePatientThankYouEmailWatcher);
  const updateThankYouPageWatcher1 = yield fork(updateThankYouPageWatcher);
  const fetchLandingForAdminWatcher1 = yield fork(fetchLandingForAdminWatcher);
  const updateFacebookLandingPageWatcher1 = yield fork(updateFacebookLandingPageWatcher);
  const deleteStudyMediaTypeWatcher1 = yield fork(deleteStudyMediaType);
  const editStudyMediaTypesWatcher1 = yield fork(editStudyMediaTypesWatcher);
  yield fork(fetchStudyMediaTypes);
  const updateLandingPageWatcher1 = yield fork(updateLandingPageWatcher);
  const changeStudyAdWatcher1 = yield fork(changeStudyAdWatcher);
  const removeStudyAdWatcher1 = yield fork(removeStudyAdWatcher);
  const fetchLevelsWatcher1 = yield fork(fetchLevelsWatcher);
  const fetchFive9ListWatcher1 = yield fork(fetchFive9ListWatcher);
  const fetchCampaignsByStudyWatcher1 = yield fork(fetchCampaignsByStudyWatcher);
  const editCampaignWatcher1 = yield fork(editCampaignWatcher);
  const deleteCampaignWatcher1 = yield fork(deleteCampaignWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(fetchNoteWatcher1);
  yield cancel(addNoteWatcher1);
  yield cancel(deleteNoteWatcher1);
  yield cancel(updatePatientThankYouEmailWatcher1);
  yield cancel(updateThankYouPageWatcher1);
  yield cancel(fetchLandingForAdminWatcher1);
  yield cancel(updateFacebookLandingPageWatcher1);
  yield cancel(deleteStudyMediaTypeWatcher1);
  yield cancel(editStudyMediaTypesWatcher1);
  yield cancel(updateLandingPageWatcher1);
  yield cancel(changeStudyAdWatcher1);
  yield cancel(removeStudyAdWatcher1);
  yield cancel(fetchLevelsWatcher1);
  yield cancel(fetchCampaignsByStudyWatcher1);
  yield cancel(editCampaignWatcher1);
  yield cancel(deleteCampaignWatcher1);
  yield cancel(fetchFive9ListWatcher1);

}
