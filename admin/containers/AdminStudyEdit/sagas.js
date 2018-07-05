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
  UPDATE_THANK_YOU_PAGE,
  FETCH_LANDING,
  UPDATE_FACEBOOK_LANDING_PAGE,
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
  updateFacebookLandingPageError,
  updateFacebookLandingPageSuccess,
  fetchStudiesDashboardSuccess,
  fetchStudiesDashboardError,
  updateDashboardStudySuccess,
  updateDashboardStudyError,
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
    console.log(err);
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
  const updateThankYouPageWatcher1 = yield fork(updateThankYouPageWatcher);
  const fetchLandingForAdminWatcher1 = yield fork(fetchLandingForAdminWatcher);
  const updateFacebookLandingPageWatcher1 = yield fork(updateFacebookLandingPageWatcher);
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
  yield cancel(updateThankYouPageWatcher1);
  yield cancel(fetchLandingForAdminWatcher1);
  yield cancel(updateFacebookLandingPageWatcher1);
  yield cancel(fetchStudiesDashboardWatcher1);
  yield cancel(updateDashboardStudyWatcher1);
  yield cancel(fetchSiteLocationsWatcher1);
  yield cancel(fetchMessagingNumbersWatcher1);
  yield cancel(fetchAllClientUsersWatcher1);
  yield cancel(addEmailNotificationUserWatcher1);
  yield cancel(fetchCustomNotificationEmailsWatcher1);
  yield cancel(addCustomEmailNotificationWatcher1);
}
