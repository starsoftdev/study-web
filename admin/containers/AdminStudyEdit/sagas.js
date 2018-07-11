import { takeLatest } from 'redux-saga';
import { call, put, fork, cancel, take } from 'redux-saga/effects';
import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { translate } from '../../../common/utilities/localization';

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
  GET_STUDY_INFO,
  UPDATE_DASHBOARD_STUDY,
  FETCH_SITE_LOCATIONS,
  FETCH_MESSAGING_NUMBERS,
  FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS,
  ADD_EMAIL_NOTIFICATION_USER,
  FETCH_CUSTOM_NOTIFICATION_EMAILS,
  ADD_CUSTOM_EMAIL_NOTIFICATION,
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
  fetchStudyMediaTypes,
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
  fetchStudiesDashboardSuccess,
  fetchStudiesDashboardError,
  updateDashboardStudySuccess,
  fetchSiteLocationsSuccess,
  fetchSiteLocationsError,
  fetchMessagingNumbersDashboardSuccess,
  fetchMessagingNumbersDashboardError,
  fetchAllStudyEmailNotificationsSuccess,
  fetchAllStudyEmailNotificationsError,
  addEmailNotificationUserSuccess,
  fetchCustomNotificationEmailsSuccess,
  fetchCustomNotificationEmailsError,
  addCustomEmailNotificationSuccess,
  updateDashboardStudyError,
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

export function* fetchStudyMediaTypesWorker() {
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

export function* fetchStudiesDashboardWatcher() {
  yield* takeLatest(GET_STUDY_INFO, fetchStudiesDashboardWorker);
}

export function* fetchStudiesDashboardWorker(action) {
  const { params, limit, offset } = action;

  try {
    const requestURL = `${API_URL}/studies/getStudiesForDashboard`;
    params.limit = limit;
    params.offset = offset;

    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);

    let hasMore = true;
    const page = (offset / 50) + 1;
    if (response.studies.length < 50) {
      hasMore = false;
    }

    if (response.studies.length === 0 && offset === 0) {
      toastr.error('', translate('portals.client.component.studiesList.fetchStudiesToastrError'));
    }

    yield put(fetchStudiesDashboardSuccess(response, hasMore, page));
  } catch (err) {
    console.log(err);
    yield put(fetchStudiesDashboardError(err));
  }
}

export function* updateDashboardStudyWatcher() {
  yield* takeLatest(UPDATE_DASHBOARD_STUDY, updateDashboardStudyWorker);
}

export function* updateDashboardStudyWorker(action) {
  const { id, formValues, params, stopSubmit } = action;

  try {
    const requestURL = `${API_URL}/studies/${id}/updateDashboardStudy`;
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    yield call(request, requestURL, options);

    yield put(updateDashboardStudySuccess(id, params, formValues));
    stopSubmit();
  } catch (err) {
    const errorMessage = get(err, 'message', translate('portals.client.component.studiesList.updateStudyToastrError'));
    toastr.error('', errorMessage);
    yield put(updateDashboardStudyError(err));
    stopSubmit(err);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchSiteLocationsWatcher() {
  yield* takeLatest(FETCH_SITE_LOCATIONS, fetchSiteLocationsWorker);
}

export function* fetchSiteLocationsWorker() {
  try {
    const requestURL = `${API_URL}/sites/getSiteLocations`;
    const options = {
      method: 'GET',
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchSiteLocationsSuccess(response));
  } catch (err) {
    yield put(fetchSiteLocationsError(err));
  }
}

export function* fetchMessagingNumbersWatcher() {
  yield* takeLatest(FETCH_MESSAGING_NUMBERS, fetchMessagingNumbersWorker);
}

export function* fetchMessagingNumbersWorker() {
  try {
    const requestURL = `${API_URL}/studies/getNotAssignedPhoneNumbers`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchMessagingNumbersDashboardSuccess(response));
  } catch (err) {
    yield put(fetchMessagingNumbersDashboardError(err));
    const errorMessage = get(err, 'message', 'Something went wrong while fetching messaging numbers for selected study');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchAllClientUsersWatcher() {
  yield* takeLatest(FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS, fetchAllClientUsersWorker);
}

export function* fetchAllClientUsersWorker(action) {
  try {
    const requestURL = `${API_URL}/sites/getAllStudyNotificationEmails`;

    const params = {
      method: 'GET',
      query: {
        clientId: action.clientId,
        studyId: action.studyId,
      },
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchAllStudyEmailNotificationsSuccess(response));
  } catch (err) {
    yield put(fetchAllStudyEmailNotificationsError(err));
    const errorMessage = get(err, 'message', translate('portals.client.component.studiesList.fetchAllStudyEmailNotificationsError'));
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* addEmailNotificationUserWatcher() {
  yield* takeLatest(ADD_EMAIL_NOTIFICATION_USER, addEmailNotificationUserWorker);
}

export function* addEmailNotificationUserWorker(action) {
  const { payload } = action;
  try {
    const clientId = payload.clientId;
    delete payload.clientId;

    const requestURL = `${API_URL}/clients/${clientId}/addUserWithClientRole`;
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, options);
    yield put(addEmailNotificationUserSuccess(response.clientRole.user_id, response.user.email, response.user));
  } catch (err) {
    const errorMessage = get(err, 'message', translate('portals.client.component.studiesList.addEmailNotifToastrError'));
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchCustomNotificationEmailsWatcher() {
  yield* takeLatest(FETCH_CUSTOM_NOTIFICATION_EMAILS, fetchCustomNotificationEmailsWorker);
}

export function* fetchCustomNotificationEmailsWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.id}/customNotificationEmails`;
    const response = yield call(request, requestURL);

    yield put(fetchCustomNotificationEmailsSuccess(response));
  } catch (err) {
    yield put(fetchCustomNotificationEmailsError(err));
  }
}

export function* addCustomEmailNotificationWatcher() {
  yield* takeLatest(ADD_CUSTOM_EMAIL_NOTIFICATION, addCustomEmailNotificationWorker);
}

export function* addCustomEmailNotificationWorker(action) {
  const { payload } = action;
  try {
    const requestURL = `${API_URL}/studyNotificationEmails/customEmailNotification`;
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, options);
    yield put(addCustomEmailNotificationSuccess(response.id, response.email));
  } catch (err) {
    const errorMessage = get(err, 'message', translate('portals.client.component.studiesList.addCustomEmailNotifToastrError'));
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
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
  yield fork(fetchStudyMediaTypesWorker);
  const updateLandingPageWatcher1 = yield fork(updateLandingPageWatcher);
  const changeStudyAdWatcher1 = yield fork(changeStudyAdWatcher);
  const removeStudyAdWatcher1 = yield fork(removeStudyAdWatcher);
  const fetchStudiesDashboardWatcher1 = yield fork(fetchStudiesDashboardWatcher);
  const updateDashboardStudyWatcher1 = yield fork(updateDashboardStudyWatcher);
  const fetchSiteLocationsWatcher1 = yield fork(fetchSiteLocationsWatcher);
  const fetchMessagingNumbersWatcher1 = yield fork(fetchMessagingNumbersWatcher);
  const fetchAllClientUsersWatcher1 = yield fork(fetchAllClientUsersWatcher);
  const addEmailNotificationUserWatcher1 = yield fork(addEmailNotificationUserWatcher);
  const fetchCustomNotificationEmailsWatcher1 = yield fork(fetchCustomNotificationEmailsWatcher);
  const addCustomEmailNotificationWatcher1 = yield fork(addCustomEmailNotificationWatcher);


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
  yield cancel(fetchStudiesDashboardWatcher1);
  yield cancel(updateDashboardStudyWatcher1);
  yield cancel(fetchSiteLocationsWatcher1);
  yield cancel(fetchMessagingNumbersWatcher1);
  yield cancel(fetchAllClientUsersWatcher1);
  yield cancel(addEmailNotificationUserWatcher1);
  yield cancel(fetchCustomNotificationEmailsWatcher1);
  yield cancel(addCustomEmailNotificationWatcher1);
}
