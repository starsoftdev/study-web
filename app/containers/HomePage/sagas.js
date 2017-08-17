// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
import _, { get } from 'lodash';

import request from '../../utils/request';
import composeQueryString from '../../utils/composeQueryString';
import {
  FETCH_PATIENT_SIGN_UPS,
  FETCH_PATIENT_MESSAGES,
  FETCH_PRINCIPAL_INVESTIGATOR_TOTALS,
  FETCH_STUDIES,
  FETCH_PROTOCOLS,
  FETCH_PROTOCOL_NUMBERS,
  FETCH_INDICATIONS,
  FETCH_INDICATION_LEVEL_PRICE,
  RENEW_STUDY,
  UPGRADE_STUDY,
  EDIT_STUDY,
  FETCH_UPGRADE_STUDY_PRICE,
} from './constants';

import {
  FETCH_NOTE,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  FETCH_STUDIES_DASHBOARD,
  FETCH_TOTALS_DASHBOARD,
  FETCH_SITE_LOCATIONS,
  FETCH_SITE_NAMES,
  UPDATE_DASHBOARD_STUDY,
  FETCH_ALL_CLIENT_USERS,
  FETCH_STUDY_CAMPAIGNS,
  CHANGE_STUDY_STATUS,
  UPDATE_LANDING_PAGE,
  CHANGE_STUDY_ADD,
  UPDATE_THANK_YOU_PAGE,
  UPDATE_PATIENT_THANK_YOU_EMAIL,
  FETCH_MESSAGING_NUMBERS,
  UPDATE_TWILIO_NUMBERS,
  FETCH_CUSTOM_NOTIFICATION_EMAILS,
  ADD_STUDY_INDICATION_TAG,
  REMOVE_STUDY_INDICATION_TAG,
  FETCH_STUDY_INDICATION_TAG,
  FETCH_CAMPAIGNS_BY_STUDY,
  EDIT_CAMPAIGN,
  DELETE_CAMPAIGN,
} from './AdminDashboard/constants';

import {
  fetchStudiesDashboardSuccess,
  fetchStudiesDashboardError,
  fetchTotalsDashboardSuccess,
  fetchTotalsDashboardError,
  fetchSiteLocationsSuccess,
  fetchSiteLocationsError,
  fetchSiteNamesSuccess,
  fetchSiteNamesError,
  updateDashboardStudySuccess,
  updateDashboardStudyError,
  fetchAllClientUsersDashboard,
  fetchAllClientUsersDashboardSuccess,
  fetchAllClientUsersDashboardError,
  fetchStudyCampaignsDashboardSuccess,
  fetchStudyCampaignsDashboardError,
  fetchCustomNotificationEmails,
  fetchCustomNotificationEmailsSuccess,
  fetchCustomNotificationEmailsError,
  changeStudyStatusDashboardSuccess,
  changeStudyStatusDashboardError,
  updateLandingPageSuccess,
  updateLandingPageError,
  updateThankYouPageSuccess,
  updateThankYouPageError,
  updatePatientThankYouEmailSuccess,
  updatePatientThankYouEmailError,
  fetchMessagingNumbersDashboardSuccess,
  fetchMessagingNumbersDashboardError,
  fetchMessagingNumbersDashboard,
  changeStudyAddSuccess,
  changeStudyAddError,
  updateTwilioNumbersSuccess,
  updateTwilioNumbersError,
  clearFilters,
  fetchNoteSuccess,
  fetchNoteError,
  addNoteSuccess,
  addNoteError,
  editNoteSuccess,
  editNoteError,
  deleteNoteSuccess,
  deleteNoteError,
  fetchStudyIndicationTag,
  fetchStudyIndicationTagSuccess,
  fetchStudyIndicationTagError,
  addStudyIndicationTagSuccess,
  addStudyIndicationTagError,
  removeStudyIndicationTagSuccess,
  removeStudyIndicationTagError,
  fetchCampaignsByStudySuccess,
  fetchCampaignsByStudyError,
  editCampaignSuccess,
  editCampaignError,
  deleteCampaignSuccess,
  deleteCampaignError,
  fetchCampaignsByStudy,

} from './AdminDashboard/actions';

import {
  ADD_EMAIL_NOTIFICATION_USER,
  ADD_CUSTOM_EMAIL_NOTIFICATION,
  REMOVE_CUSTOM_EMAIL_NOTIFICATION,
} from '../../containers/App/constants';
import {
  addEmailNotificationUserSuccess,
  addEmailNotificationUserError,
  addCustomEmailNotificationSuccess,
  addCustomEmailNotificationError,
  removeCustomEmailNotificationSuccess,
  removeCustomEmailNotificationError,
  fetchClientSites,
  fetchClientCredits,
  fetchRewardsBalance,
} from '../../containers/App/actions';

import {
  fetchPatientSignUpsSucceeded,
  fetchPrincipalInvestigatorTotalsSucceeded,
  studiesFetched,
  studiesFetchingError,
  protocolsFetched,
  protocolsFetchingError,
  protocolNumbersFetched,
  protocolNumbersFetchingError,
  indicationsFetched,
  indicationsFetchingError,
  indicationLevelPriceFetched,
  indicationLevelPriceFetchingError,
  studyRenewed,
  studyRenewingError,
  studyUpgraded,
  studyUpgradingError,
  studyEdited,
  studyEditingError,
  updateStudy,
} from './actions';

// Bootstrap sagas
export default [
  homePageSaga,
];

export function* addStudyIndicationTagWatcher() {
  yield* takeLatest(ADD_STUDY_INDICATION_TAG, addStudyIndicationTagWorker);
}

export function* addStudyIndicationTagWorker(action) {
  const { payload } = action;
  try {
    const requestURL = `${API_URL}/studyIndicationTags`;
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchStudyIndicationTag(payload.studyId));
    yield put(addStudyIndicationTagSuccess(response));
  } catch (err) {
    yield put(addStudyIndicationTagError(err));
  }
}

export function* removeStudyIndicationTagWatcher() {
  yield* takeLatest(REMOVE_STUDY_INDICATION_TAG, removeStudyIndicationTagWorker);
}

export function* removeStudyIndicationTagWorker(action) {
  const { payload } = action;
  try {
    const requestURL = `${API_URL}/studyIndicationTags`;
    const options = {
      method: 'DELETE',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchStudyIndicationTag(payload.studyId));
    yield put(removeStudyIndicationTagSuccess(response));
  } catch (err) {
    yield put(removeStudyIndicationTagError(err));
  }
}

export function* fetchStudyIndicationTagsWatcher() {
  yield* takeLatest(FETCH_STUDY_INDICATION_TAG, fetchStudyIndicationTagsWorker);
}

export function* fetchStudyIndicationTagsWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/getStudyIndicationTags`;

    const params = {
      method: 'GET',
      query: {
        id: action.params,
      },
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchStudyIndicationTagSuccess(response));
  } catch (err) {
    yield put(fetchStudyIndicationTagError(err));
  }
}

export function* fetchNoteWatcher() {
  yield* takeLatest(FETCH_NOTE, fetchNoteWorker);
}

export function* fetchNoteWorker() {
  try {
    const requestURL = `${API_URL}/notes`;

    const filterObj = {
      include: [{
        relation: 'site',
      }, {
        relation: 'user',
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

export function* editNoteWatcher() {
  yield* takeLatest(EDIT_NOTE, editNoteWorker);
}

export function* editNoteWorker(action) {
  try {
    const requestURL = `${API_URL}/notes/${action.payload.id}`;

    const params = {
      method: 'PUT',
      body: JSON.stringify(action.payload),
    };
    const response = yield call(request, requestURL, params);

    yield put(editNoteSuccess(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while saving note');
    toastr.error('', errorMessage);
    yield put(editNoteError(err));
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

export function* fetchPatientSignUpsWatcher() {
  yield* takeLatest(FETCH_PATIENT_SIGN_UPS, fetchPatientSignUpsWorker);
}

export function* fetchPatientSignUpsWorker(action) {
  try {
    let requestURL = '';
    if (action.currentUser.roleForClient && action.currentUser.roleForClient.client_id) {
      requestURL = `${API_URL}/clients/${action.currentUser.roleForClient.client_id}/patientSignUps`;
    } else {
      requestURL = `${API_URL}/sponsorRoles/${action.currentUser.roleForSponsor.id}/patientSignUps`;
    }

    const params = {
      method: 'GET',
      query: {
        timezoneOffset: -new Date().getTimezoneOffset() / 60,
      },
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchPatientSignUpsSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching patients for selected study');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchPrincipalInvestigatorTotalsWatcher() {
  yield* takeLatest(FETCH_PRINCIPAL_INVESTIGATOR_TOTALS, fetchPrincipalInvestigatorTotalsWorker);
}

export function* fetchPrincipalInvestigatorTotalsWorker(action) {
  try {
    const requestURL = `${API_URL}/sponsorRoles/${action.currentUser.roleForSponsor.id}/principalInvestigators`;

    const params = {
      method: 'GET',
      query: {},
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchPrincipalInvestigatorTotalsSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching principal investigators');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchPatientMessagesWatcher() {
  yield* takeLatest(FETCH_PATIENT_MESSAGES, fetchPatientMessagesWorker);
}

export function* fetchPatientMessagesWorker(action) { // eslint-disable-line no-unused-vars
  // try {
  //   const requestURL = `${API_URL}/clients/${action.currentUser.roleForClient.client_id}/patientMessageStats`;
  //   const response = yield call(request, requestURL);
  //
  //   yield put(fetchPatientMessagesSucceeded(response));
  // TODO re-enable patient message stat fetching
  // yield put(fetchPatientMessagesSucceeded({ unreadTexts: 0, unreadEmails: 0, total: 0 }));
  // } catch (err) {
  //   const errorMessage = get(err, 'message', 'Something went wrong while fetching patient messages');
  //   toastr.error('', errorMessage);
  //   if (err.status === 401) {
  //     yield call(() => { location.href = '/login'; });
  //   }
  // }
}

export function* fetchStudiesWatcher() {
  yield* takeLatest(FETCH_STUDIES, fetchStudiesWorker);
}

export function* fetchStudiesWorker(action) {
  try {
    let queryString;
    let requestURL;
    if (action.searchParams) {
      queryString = composeQueryString(action.searchParams);
      requestURL = `${API_URL}/clients/${action.currentUser.roleForClient.client_id}/studiesForHomePage?${queryString}`;
    } else {
      requestURL = `${API_URL}/clients/${action.currentUser.roleForClient.client_id}/studiesForHomePage`;
    }
    const response = yield call(request, requestURL);

    yield put(studiesFetched(response));
  } catch (err) {
    yield put(studiesFetchingError(err));
  }
}

export function* fetchProtocolsWatcher() {
  yield* takeLatest(FETCH_PROTOCOLS, fetchProtocolsWorker);
}

export function* fetchProtocolsWorker(action) {
  try {
    const limit = action.limit || 10;
    const offset = action.offset || 0;
    const sort = action.sort || null;
    const order = action.order || null;
    const params = {
      method: 'GET',
      query: {
        sponsorRoleId: action.sponsorRoleId,
      },
    };

    if (action.searchParams) {
      params.query.searchParams = JSON.stringify(action.searchParams);
    }
    params.query.limit = limit;
    params.query.offset = offset;
    if (sort && order) {
      params.query.orderBy = sort;
      params.query.orderDir = ((order === 'down') ? 'DESC' : 'ASC');
    }
    const requestURL = `${API_URL}/protocols/protocolsForHomePage`;
    const response = yield call(request, requestURL, params);

    let hasMore = true;
    const page = (offset / 10) + 1;
    if (response.length < 10) {
      hasMore = false;
    }

    yield put(protocolsFetched(response, hasMore, page));
  } catch (err) {
    yield put(protocolsFetchingError(err));
  }
}

export function* fetchProtocolNumbersWatcher() {
  yield* takeLatest(FETCH_PROTOCOL_NUMBERS, fetchProtocolNumbersWorker);
}

export function* fetchProtocolNumbersWorker(action) {
  try {
    const params = {
      method: 'GET',
      query: {
        sponsorRoleId: action.sponsorRoleId,
      },
    };

    const requestURL = `${API_URL}/protocols`;
    const response = yield call(request, requestURL, params);

    yield put(protocolNumbersFetched(response));
  } catch (err) {
    yield put(protocolNumbersFetchingError(err));
  }
}

export function* fetchIndicationsWatcher() {
  yield* takeLatest(FETCH_INDICATIONS, fetchIndicationsWorker);
}

export function* fetchIndicationsWorker(action) {
  try {
    const requestURL = `${API_URL}/sponsorRoles/${action.currentUser.roleForSponsor.id}/indications`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(indicationsFetched(response));
  } catch (err) {
    yield put(indicationsFetchingError(err));
  }
}

export function* fetchIndicationLevelPriceWatcher() {
  yield* takeLatest(FETCH_INDICATION_LEVEL_PRICE, fetchIndicationLevelPriceWorker);
}

export function* fetchIndicationLevelPriceWorker(action) {
  try {
    const { levelId } = action;
    const requestURL = `${API_URL}/levels/getPrice`;
    const params = {
      query: {
        levelId,
      },
    };
    const response = yield call(request, requestURL, params);
    yield put(indicationLevelPriceFetched(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Can not get price for Level');
    toastr.error('', errorMessage);
    yield put(indicationLevelPriceFetchingError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchUpgradeStudyPriceWatcher() {
  yield* takeLatest(FETCH_UPGRADE_STUDY_PRICE, fetchUpgradeStudyPriceWorker);
}

export function* fetchUpgradeStudyPriceWorker(action) {
  try {
    const { fromLevel, toLevel } = action;
    const requestURL = `${API_URL}/upgradeLevelSkus/getPrice`;
    const params = {
      query: {
        fromLevel,
        toLevel,
      },
    };
    const response = yield call(request, requestURL, params);
    yield put(indicationLevelPriceFetched(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Can not get price for Indication Level');
    toastr.error('', errorMessage);
    yield put(indicationLevelPriceFetchingError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* renewStudyWatcher() {
  yield* takeLatest(RENEW_STUDY, renewStudyWorker);
}

export function* renewStudyWorker(action) {
  try {
    const { studyId, cartValues, formValues, onClose } = action;

    const params = {
      method: 'POST',
      body: JSON.stringify({
        ...formValues,
        ...cartValues,
        startDate: formValues.startDate ? formValues.startDate.format('YYYY-MM-DD') : null,
      }),
    };
    const requestURL = `${API_URL}/studies/${studyId}/renewStudy`;
    const response = yield call(request, requestURL, params);

    yield put(fetchRewardsBalance(formValues.currentUser.roleForClient.client_id, formValues.currentUser.roleForClient.site_id));
    yield put(fetchClientCredits(formValues.user_id));
    yield put(studyRenewed(response));
    toastr.success('Renew Study', 'The request has been submitted successfully');
    yield put(updateStudy({
      studyId,
      condenseTwoWeeks: formValues.condenseTwoWeeks,
      campaignLength: formValues.campaignLength,
      startDate: (formValues.startDate ? formValues.startDate.format('YYYY-MM-DD') : null),
    }));
    onClose();
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    toastr.error('', errorMessage);
    yield put(studyRenewingError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* upgradeStudyWatcher() {
  yield* takeLatest(UPGRADE_STUDY, upgradeStudyWorker);
}

export function* upgradeStudyWorker(action) {
  try {
    const { studyId, cartValues, formValues } = action;
    const requestURL = `${API_URL}/studies/${studyId}/upgradeStudy`;

    const params = {
      method: 'POST',
      body: JSON.stringify({
        formValues,
        cartValues,
      }),
    };
    const response = yield call(request, requestURL, params);

    toastr.success('Upgrade Study', 'The request has been submitted successfully');
    response.newLevelId = formValues.level;
    response.studyId = studyId;
    yield put(fetchRewardsBalance(formValues.currentUser.roleForClient.client_id, formValues.currentUser.roleForClient.site_id));
    yield put(fetchClientCredits(formValues.user_id));
    yield put(studyUpgraded(response));
    yield put(reset('upgradeStudy'));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    toastr.error('', errorMessage);
    yield put(studyUpgradingError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* editStudyWatcher() {
  yield* takeLatest(EDIT_STUDY, editStudyWorker);
}

export function* editStudyWorker(action) {
  try {
    const { studyId } = action;

    const requestURL = `${API_URL}/clientRoles/editStudy`;

    const data = new FormData();
    _.forEach(action.formValues, (value, index) => {
      if (index !== 'studyAd' && index !== 'emailNotifications') {
        data.append(index, value);
      }
    });
    data.append('id', studyId);
    data.append('emailNotifications', JSON.stringify(action.formValues.emailNotifications));

    if (action.formValues.studyAd && action.formValues.studyAd[0]) {
      data.append('file', action.formValues.studyAd[0]);
    }

    const params = {
      method: 'PUT',
      body: data,
      useDefaultContentType: true,
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchClientSites(action.formValues.clientId, {}));

    toastr.success('Edit Study', 'The request has been submitted successfully');
    yield put(studyEdited(response));
    yield put(reset('editStudy'));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    toastr.error('', errorMessage);
    yield put(studyEditingError(err));
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
    const siteId = payload.clientRole.siteId;
    delete payload.clientId;

    const requestURL = `${API_URL}/clients/${clientId}/addUserWithClientRole`;
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchAllClientUsersDashboard({ clientId, siteId }));
    yield put(fetchClientSites(clientId, {}));
    yield put(addEmailNotificationUserSuccess(response.user));
  } catch (err) {
    yield put(addEmailNotificationUserError(err));
  }
}

export function* addCustomEmailNotificationWatcher() {
  yield* takeLatest(ADD_CUSTOM_EMAIL_NOTIFICATION, addCustomEmailNotificationWorker);
}

export function* addCustomEmailNotificationWorker(action) {
  const { payload } = action;
  try {
    const requestURL = `${API_URL}/clients/addCustomNotificationEmail`;
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchCustomNotificationEmails(payload.studyId));
    yield put(addCustomEmailNotificationSuccess(response));
  } catch (err) {
    yield put(addCustomEmailNotificationError(err));
  }
}

export function* removeCustomEmailNotificationWatcher() {
  yield* takeLatest(REMOVE_CUSTOM_EMAIL_NOTIFICATION, removeCustomEmailNotificationWorker);
}

export function* removeCustomEmailNotificationWorker(action) {
  const { payload } = action;
  try {
    const requestURL = `${API_URL}/clients/removeCustomNotificationEmail`;
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchCustomNotificationEmails(payload.studyId));
    yield put(removeCustomEmailNotificationSuccess(response));
  } catch (err) {
    yield put(removeCustomEmailNotificationError(err));
  }
}

export function* fetchTotalsDashboardWatcher() {
  yield* takeLatest(FETCH_TOTALS_DASHBOARD, fetchTotalsDashboardWorker);
}

export function* fetchTotalsDashboardWorker(action) {
  const { params, limit, offset } = action;

  try {
    const requestURL = `${API_URL}/studies/getTotalsForDashboard`;
    params.limit = limit;
    params.offset = offset;

    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchTotalsDashboardSuccess(response));
  } catch (err) {
    yield put(fetchTotalsDashboardError(err));
  }
}

export function* fetchStudiesDashboardWatcher() {
  yield* takeLatest(FETCH_STUDIES_DASHBOARD, fetchStudiesDashboardWorker);
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
    const page = (offset / 10) + 1;
    if (response.studies.length < 10) {
      hasMore = false;
    }

    yield put(fetchStudiesDashboardSuccess(response, hasMore, page));
  } catch (err) {
    yield put(fetchStudiesDashboardError(err));
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

export function* fetchSiteNamesWatcher() {
  yield* takeLatest(FETCH_SITE_NAMES, fetchSiteNamesWorker);
}

export function* fetchSiteNamesWorker() {
  try {
    const requestURL = `${API_URL}/sites/getSiteNames`;
    const options = {
      method: 'GET',
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchSiteNamesSuccess(response));
  } catch (err) {
    yield put(fetchSiteNamesError(err));
  }
}

export function* updateDashboardStudyWatcher() {
  yield* takeLatest(UPDATE_DASHBOARD_STUDY, updateDashboardStudyWorker);
}

export function* updateDashboardStudyWorker(action) {
  const { params } = action;

  try {
    const requestURL = `${API_URL}/studies/updateDashboardStudy`;
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchMessagingNumbersDashboard());
    yield put(updateDashboardStudySuccess(response));
  } catch (err) {
    yield put(updateDashboardStudyError(err));
  }
}

export function* fetchAllClientUsersWatcher() {
  yield* takeLatest(FETCH_ALL_CLIENT_USERS, fetchAllClientUsersWorker);
}

export function* fetchAllClientUsersWorker(action) {
  try {
    const requestURL = `${API_URL}/sites/getSiteUsersAndAdmins`;

    const params = {
      method: 'GET',
      query: action.params,
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchAllClientUsersDashboardSuccess(response));
  } catch (err) {
    yield put(fetchAllClientUsersDashboardError(err));
    const errorMessage = get(err, 'message', 'Something went wrong while fetching patients for selected study');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchStudyCampaignsWatcher() {
  yield* takeLatest(FETCH_STUDY_CAMPAIGNS, fetchStudyCampaignsWorker);
}

export function* fetchStudyCampaignsWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/getStudyCampaigns`;

    const params = {
      method: 'GET',
      query: {
        id: action.params,
      },
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchStudyCampaignsDashboardSuccess(response));
  } catch (err) {
    yield put(fetchStudyCampaignsDashboardError(err));
    const errorMessage = get(err, 'message', 'Something went wrong while fetching campaigns for selected study');
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
    const requestURL = `${API_URL}/studies/getCustomNotificationEmails`;

    const params = {
      method: 'GET',
      query: {
        id: action.params,
      },
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchCustomNotificationEmailsSuccess(response));
  } catch (err) {
    yield put(fetchCustomNotificationEmailsError(err));
  }
}

export function* changeStudyStatusWatcher() {
  yield* takeLatest(CHANGE_STUDY_STATUS, changeStudyStatusWorker);
}

export function* changeStudyStatusWorker(action) {
  const { params, status, isChecked } = action;

  try {
    const requestURL = `${API_URL}/studies/changeStudyStatus`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ studies: params, status }),
    };

    yield call(request, requestURL, options);

    yield put(changeStudyStatusDashboardSuccess({ studies: params, status, isChecked }));
    toastr.success('Success!', `The ${params.length > 1 ? 'studies are' : 'study is'} now ${status}.`);
  } catch (err) {
    yield put(changeStudyStatusDashboardError(err));
    const errorMessage = get(err, 'message', 'Something went wrong while updating study status');
    toastr.error('', errorMessage);
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

export function* changeStudyAddWatcher() {
  yield* takeLatest(CHANGE_STUDY_ADD, changeStudyAddWorker);
}

export function* changeStudyAddWorker(action) {
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
    yield put(changeStudyAddSuccess(response));
  } catch (err) {
    toastr.error('Error!');
    yield put(changeStudyAddError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
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

export function* updatePatientThankYouEmailWatcher() {
  yield* takeLatest(UPDATE_PATIENT_THANK_YOU_EMAIL, updatePatientThankYouEmailWorker);
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

export function* updateTwilioNumbersWatcher() {
  yield* takeLatest(UPDATE_TWILIO_NUMBERS, updateTwilioNumbersWorker);
}

export function* updateTwilioNumbersWorker() {
  try {
    const requestURL = `${API_URL}/twilioNumbers/synchronizeTwilioNumbers`;

    const params = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, params);

    yield put(updateTwilioNumbersSuccess(response));
    toastr.success('Syncing for Twilio numbers has been queued. Please wait about 5 minutes for the task to process.');
  } catch (err) {
    yield put(updateTwilioNumbersError(err));
    const errorMessage = get(err, 'message', 'Something went wrong while updating twili numbers');
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchCampaignsByStudyWatcher() {
  yield* takeLatest(FETCH_CAMPAIGNS_BY_STUDY, fetchCampaignsByStudyWorker);
}

export function* fetchCampaignsByStudyWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.payload}/campaigns`;

    const filterObj = {
      include: [{
        relation: 'patients',
      }],
    };

    const queryParams = {
      filter: JSON.stringify(filterObj),
    };

    const params = {
      method: 'GET',
      query: queryParams,
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
    const response = yield call(request, requestURL, params);
    if (response.success) {
      yield put(editCampaignSuccess(action.payload));
    } else {
      yield put(editCampaignError(response));
    }
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


let watcherD = false;

export function* homePageSaga() {
  const watcherA = yield fork(fetchPatientSignUpsWatcher);
  const watcherB = yield fork(fetchPatientMessagesWatcher);
  if (!watcherD) {
    watcherD = yield fork(fetchStudiesWatcher);
  }
  const watcherE = yield fork(fetchIndicationLevelPriceWatcher);
  const watcherF = yield fork(renewStudyWatcher);
  const watcherG = yield fork(upgradeStudyWatcher);
  const watcherH = yield fork(editStudyWatcher);
  const watcherI = yield fork(fetchUpgradeStudyPriceWatcher);
  const fetchPrincipalInvestigatorTotalsWatcher1 = yield fork(fetchPrincipalInvestigatorTotalsWatcher);
  const fetchProtocolsWatcher1 = yield fork(fetchProtocolsWatcher);
  const fetchProtocolNumbersWatcher1 = yield fork(fetchProtocolNumbersWatcher);
  const fetchIndicationsWatcher1 = yield fork(fetchIndicationsWatcher);
  const addEmailNotificationUserWatcher1 = yield fork(addEmailNotificationUserWatcher);
  const addCustomEmailNotificationWatcher1 = yield fork(addCustomEmailNotificationWatcher);
  const fetchCustomNotificationEmailsWatcher1 = yield fork(fetchCustomNotificationEmailsWatcher);
  const removeCustomEmailNotificationWatcher1 = yield fork(removeCustomEmailNotificationWatcher);
  const fetchStudiesDashboardWatcher1 = yield fork(fetchStudiesDashboardWatcher);
  const fetchTotalsDashboardWatcher1 = yield fork(fetchTotalsDashboardWatcher);
  const fetchSiteLocationsWatcher1 = yield fork(fetchSiteLocationsWatcher);
  const fetchSiteNamesWatcher1 = yield fork(fetchSiteNamesWatcher);
  const updateDashboardStudyWatcher1 = yield fork(updateDashboardStudyWatcher);
  const fetchAllClientUsersWatcher1 = yield fork(fetchAllClientUsersWatcher);
  const fetchStudyCampaignsWatcher1 = yield fork(fetchStudyCampaignsWatcher);
  const changeStudyStatusWatcher1 = yield fork(changeStudyStatusWatcher);
  const updateLandingPageWatcher1 = yield fork(updateLandingPageWatcher);
  const updateThankYouPageWatcher1 = yield fork(updateThankYouPageWatcher);
  const updatePatientThankYouEmailWatcher1 = yield fork(updatePatientThankYouEmailWatcher);
  const changeStudyAddWatcher1 = yield fork(changeStudyAddWatcher);
  const fetchMessagingNumbersWatcher1 = yield fork(fetchMessagingNumbersWatcher);
  const updateTwilioNumbersWatcher1 = yield fork(updateTwilioNumbersWatcher);
  const fetchCampaignsByStudyWatcher1 = yield fork(fetchCampaignsByStudyWatcher);
  const editCampaignWatcher1 = yield fork(editCampaignWatcher);
  const deleteCampaignWatcher1 = yield fork(deleteCampaignWatcher);
  const watcherJ = yield fork(fetchNoteWatcher);
  const watcherK = yield fork(addNoteWatcher);
  const watcherL = yield fork(editNoteWatcher);
  const watcherM = yield fork(deleteNoteWatcher);
  const watcherN = yield fork(fetchStudyIndicationTagsWatcher);
  const watcherO = yield fork(addStudyIndicationTagWatcher);
  const watcherP = yield fork(removeStudyIndicationTagWatcher);

  // Suspend execution until location changes
  const options = yield take(LOCATION_CHANGE);
  if (options.payload.pathname !== '/app') {
    yield cancel(watcherA);
    yield cancel(watcherB);
    if (watcherD) {
      yield cancel(watcherD);
      watcherD = false;
    }
    yield cancel(watcherE);
    yield cancel(watcherF);
    yield cancel(watcherG);
    yield cancel(watcherH);
    yield cancel(watcherI);
    yield cancel(fetchPrincipalInvestigatorTotalsWatcher1);
    yield cancel(fetchProtocolsWatcher1);
    yield cancel(fetchProtocolNumbersWatcher1);
    yield cancel(fetchIndicationsWatcher1);
    yield cancel(addEmailNotificationUserWatcher1);
    yield cancel(addCustomEmailNotificationWatcher1);
    yield cancel(fetchCustomNotificationEmailsWatcher1);
    yield cancel(removeCustomEmailNotificationWatcher1);
    yield cancel(fetchStudiesDashboardWatcher1);
    yield cancel(fetchTotalsDashboardWatcher1);
    yield cancel(fetchSiteLocationsWatcher1);
    yield cancel(fetchSiteNamesWatcher1);
    yield cancel(updateDashboardStudyWatcher1);
    yield cancel(fetchAllClientUsersWatcher1);
    yield cancel(fetchStudyCampaignsWatcher1);
    yield cancel(changeStudyStatusWatcher1);
    yield cancel(updateLandingPageWatcher1);
    yield cancel(updateThankYouPageWatcher1);
    yield cancel(updatePatientThankYouEmailWatcher1);
    yield cancel(changeStudyAddWatcher1);
    yield cancel(fetchMessagingNumbersWatcher1);
    yield cancel(updateTwilioNumbersWatcher1);
    yield cancel(fetchCampaignsByStudyWatcher1);
    yield cancel(editCampaignWatcher1);
    yield cancel(deleteCampaignWatcher1);
    yield cancel(watcherJ);
    yield cancel(watcherK);
    yield cancel(watcherL);
    yield cancel(watcherM);
    yield cancel(watcherN);
    yield cancel(watcherO);
    yield cancel(watcherP);
    if (options.payload.pathname !== '/app') {
      yield put(clearFilters());
      yield put(reset('dashboardFilters'));
    }
  }
}
