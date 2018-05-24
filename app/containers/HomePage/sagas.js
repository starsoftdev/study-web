// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
import _, { get } from 'lodash';

import request from '../../utils/request';
import composeQueryString from '../../utils/composeQueryString';
import { translate } from '../../../common/utilities/localization';
import {
  FETCH_PATIENT_SIGN_UPS,
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
  FETCH_FIVE_9_LIST,
  FETCH_TOTALS_DASHBOARD,
  FETCH_SITE_LOCATIONS,
  UPDATE_DASHBOARD_STUDY,
  FETCH_ALL_STUDY_EMAIL_NOTIFICATIONS,
  FETCH_STUDY_CAMPAIGNS,
  CHANGE_STUDY_STATUS,
  UPDATE_LANDING_PAGE,
  UPDATE_FACEBOOK_LANDING_PAGE,
  CHANGE_STUDY_AD,
  REMOVE_STUDY_AD,
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
  EDIT_STUDY_LEAD_SOURCES,
  DELETE_STUDY_LEAD_SOURCE,
} from './AdminDashboard/constants';

import {
  fetchStudiesDashboardSuccess,
  fetchStudiesDashboardError,
  fetchTotalsDashboardSuccess,
  fetchTotalsDashboardError,
  fetchSiteLocationsSuccess,
  fetchSiteLocationsError,
  updateDashboardStudySuccess,
  fetchAllStudyEmailNotificationsSuccess,
  fetchAllStudyEmailNotificationsError,
  fetchStudyCampaignsDashboardSuccess,
  fetchStudyCampaignsDashboardError,
  fetchCustomNotificationEmailsSuccess,
  fetchCustomNotificationEmailsError,
  changeStudyStatusDashboardSuccess,
  changeStudyStatusDashboardError,
  updateFacebookLandingPageSuccess,
  updateFacebookLandingPageError,
  updateLandingPageSuccess,
  updateLandingPageError,
  updateThankYouPageSuccess,
  updateThankYouPageError,
  updatePatientThankYouEmailSuccess,
  updatePatientThankYouEmailError,
  fetchMessagingNumbersDashboardSuccess,
  fetchMessagingNumbersDashboardError,
  changeStudyAdSuccess,
  changeStudyAdError,
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
  fetchTaggedIndicationsForStudySuccess,
  fetchTaggedIndicationsForStudyError,
  addTaggedIndicationForStudySuccess,
  removeTaggedIndicationForStudySuccess,
  fetchCampaignsByStudySuccess,
  fetchCampaignsByStudyError,
  editCampaignSuccess,
  editCampaignError,
  deleteCampaignSuccess,
  deleteCampaignError,
  fetchCampaignsByStudy,
  fetchFive9ListSuccess,
  fetchFive9ListError,
  removeStudyAdSuccess,
  removeStudyAdError,
  editStudyLeadSourcesSuccess,
  editStudyLeadSourcesError,
  deleteStudyLeadSourceSuccess,
  deleteStudyLeadSourceError,
} from './AdminDashboard/actions';

import {
  ADD_EMAIL_NOTIFICATION_USER,
  ADD_CUSTOM_EMAIL_NOTIFICATION,
  REMOVE_CUSTOM_EMAIL_NOTIFICATION,
} from '../../containers/App/constants';
import {
  fetchClientSites,
  fetchClientCredits,
  fetchRewardsBalance,
} from '../../containers/App/actions';

import {
  addEmailNotificationUserSuccess,
  addCustomEmailNotificationSuccess,
  removeCustomEmailNotificationSuccess,
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

export function* addTaggedIndicationForStudyWatcher() {
  yield* takeLatest(ADD_STUDY_INDICATION_TAG, addTaggedIndicationForStudyWorker);
}

export function* addTaggedIndicationForStudyWorker(action) {
  const { studyId, indication } = action;
  try {
    const requestURL = `${API_URL}/studyIndicationTags`;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        studyId,
        indicationId: indication.id,
      }),
    };

    yield call(request, requestURL, options);
    // add the tagged indication
    yield put(addTaggedIndicationForStudySuccess(studyId, indication));
  } catch (err) {
    // give a redux toastr message in case there's an error
    const errorMessage = get(err, 'message', `Could not add tagged indication: ${indication.name}`);
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* removeTaggedIndicationForStudyWatcher() {
  yield* takeLatest(REMOVE_STUDY_INDICATION_TAG, removeTaggedIndicationForStudyWorker);
}

export function* removeTaggedIndicationForStudyWorker(action) {
  const { studyId, indication } = action;
  try {
    const requestURL = `${API_URL}/studyIndicationTags`;
    const options = {
      method: 'DELETE',
      body: JSON.stringify({
        studyId,
        indicationId: indication.value,
      }),
    };

    yield call(request, requestURL, options);
    // remove the tagged indication
    yield put(removeTaggedIndicationForStudySuccess(studyId, indication));
  } catch (err) {
    // give a redux toastr message in case there's an error
    const errorMessage = get(err, 'message', `Could not remove tagged indication: ${indication.label}`);
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* fetchTaggedIndicationsForStudyWatcher() {
  yield* takeLatest(FETCH_STUDY_INDICATION_TAG, fetchTaggedIndicationsForStudyWorker);
}

export function* fetchTaggedIndicationsForStudyWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.studyId}/taggedIndications`;
    const response = yield call(request, requestURL);

    yield put(fetchTaggedIndicationsForStudySuccess(response));
  } catch (err) {
    yield put(fetchTaggedIndicationsForStudyError(err));
  }
}

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
    let timezone = action.currentUser.timezone;
    if (action.currentUser.roleForClient && action.currentUser.roleForClient.client_id) {
      requestURL = `${API_URL}/clients/${action.currentUser.roleForClient.client_id}/patientSignUps`;
      if (!action.currentUser.roleForClient.isAdmin) {
        timezone = action.currentUser.roleForClient.site.timezone;
      }
    } else {
      requestURL = `${API_URL}/sponsorRoles/${action.currentUser.roleForSponsor.id}/patientSignUps`;
    }

    const params = {
      method: 'GET',
      query: {
        timezone,
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
    const limit = action.limit || 50;
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
    const page = (offset / 50) + 1;
    if (response.length < 50) {
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
    const errorMessage = get(err, 'message', translate('portals.client.component.studiesList.fetchIndicationLevelPriceToastrError'));
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
        fromLevel: fromLevel || 0,
        toLevel,
      },
    };
    const response = yield call(request, requestURL, params);
    yield put(indicationLevelPriceFetched(response));
  } catch (err) {
    const errorMessage = get(err, 'message', translate('portals.client.component.studiesList.upgradeStudyFetchPriceToastrError'));
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
    toastr.success(translate('portals.client.component.studiesList.renewStudyToastrTitle'), translate('portals.client.component.studiesList.renewStudyToastrMessage'));
    yield put(updateStudy({
      studyId,
      condenseTwoWeeks: formValues.condenseTwoWeeks,
      campaignLength: formValues.campaignLength,
      startDate: (formValues.startDate ? formValues.startDate.format('YYYY-MM-DD') : null),
      callTracking: formValues.callTracking,
    }));
    onClose();
  } catch (err) {
    let errorMessage = get(err, 'message', translate('portals.client.component.studiesList.renewStudyToastrError'));
    if (errorMessage.toLowerCase().indexOf('no such coupon') !== -1) {
      errorMessage = translate('portals.client.component.studiesList.renewStudyCouponToastrError');
    }
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

    toastr.success(translate('portals.client.component.studiesList.upgradeStudyToastrTitle'), translate('portals.client.component.studiesList.upgradeStudyToastrMessage'));
    response.newLevelId = formValues.level;
    response.studyId = studyId;
    response.callTracking = formValues.callTracking;
    yield put(fetchRewardsBalance(formValues.currentUser.roleForClient.client_id, formValues.currentUser.roleForClient.site_id));
    yield put(fetchClientCredits(formValues.user_id));
    yield put(studyUpgraded(response));
    yield put(reset('upgradeStudy'));
  } catch (err) {
    const errorMessage = get(err, 'message', translate('portals.client.component.studiesList.upgradeStudyToastrError'));
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
    const { studyId, options } = action;
    const requestURL = `${API_URL}/clientRoles/editStudy`;

    const data = new FormData();
    _.forEach(options, (value, index) => {
      if (index !== 'emailNotifications' && index !== 'leadSource') {
        data.append(index, value);
      }
    });
    data.append('id', studyId);
    if (options.emailNotifications) {
      data.append('emailNotifications', JSON.stringify(options.emailNotifications));
    }

    if (options.leadSource) {
      data.append('leadSource', JSON.stringify(options.leadSource));
    }

    const params = {
      method: 'PUT',
      body: data,
      useDefaultContentType: true,
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchClientSites(options.clientId, {}));

    toastr.success(translate('portals.client.component.studiesList.editStudyToastrTitle'), translate('portals.client.component.studiesList.editStudyToastrMessage'));
    yield put(studyEdited(response));
    yield put(reset('editStudy'));
  } catch (err) {
    const errorMessage = get(err, 'message', translate('portals.client.component.studiesList.editStudyToastrError'));
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

export function* removeCustomEmailNotificationWatcher() {
  yield* takeLatest(REMOVE_CUSTOM_EMAIL_NOTIFICATION, removeCustomEmailNotificationWorker);
}

export function* removeCustomEmailNotificationWorker(action) {
  const { id, email } = action;
  try {
    const requestURL = `${API_URL}/studyNotificationEmails/${id}`;
    const options = {
      method: 'DELETE',
    };

    yield call(request, requestURL, options);

    yield put(removeCustomEmailNotificationSuccess(id, email));
  } catch (err) {
    const errorMessage = get(err, 'message', translate('portals.client.component.studiesList.removeCustomEmailNotifToastrError'));
    toastr.error('', errorMessage);
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
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
    const errorMessage = get(err, 'message', translate('portals.client.component.studiesList.fetchStudyCampaignsDashboardError'));
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
    toastr.success('', 'Messaging Numbers are syncing. Please wait about 5 minutes.');
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

export function* editStudyLeadSourcesWatcher() {
  yield* takeLatest(EDIT_STUDY_LEAD_SOURCES, editStudyLeadSourcesWorker);
}

export function* editStudyLeadSourcesWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.studyId}/editStudyLeadSources`;
    const params = {
      method: 'POST',
      body: JSON.stringify({
        leadSources: action.leadSources,
        callTracking: action.callTracking,
      }),
    };
    const response = yield call(request, requestURL, params);
    if (response.success) {
      yield put(editStudyLeadSourcesSuccess(action.leadSources, action.studyId, action.callTracking));
      toastr.success('', 'The request has been submitted successfully.');
    } else {
      yield put(editStudyLeadSourcesError(response));
    }
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    toastr.error('', errorMessage);
    yield put(editStudyLeadSourcesError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* deleteStudyLeadSourceWatcher() {
  yield* takeLatest(DELETE_STUDY_LEAD_SOURCE, deleteStudyLeadSourceWorker);
}

export function* deleteStudyLeadSourceWorker(action) {
  try {
    const requestURL = `${API_URL}/studies/${action.leadSource.studyId}/deleteStudyLeadSource`;
    const params = {
      method: 'POST',
      body: JSON.stringify({
        studySourceId: action.leadSource.studySourceId,
      }),
    };
    yield call(request, requestURL, params);
    yield put(deleteStudyLeadSourceSuccess(action.leadSource, action.index));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    toastr.error('', errorMessage);
    yield put(deleteStudyLeadSourceError(err));
    if (err.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}


let watcherD = false;
let watcherF = false;
export function* homePageSaga() {
  const watcherA = yield fork(fetchPatientSignUpsWatcher);
  if (!watcherD) {
    watcherD = yield fork(fetchStudiesWatcher);
  }
  const watcherE = yield fork(fetchIndicationLevelPriceWatcher);
  if (!watcherF) {
    watcherF = yield fork(renewStudyWatcher);
  }
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
  const updateDashboardStudyWatcher1 = yield fork(updateDashboardStudyWatcher);
  const fetchAllClientUsersWatcher1 = yield fork(fetchAllClientUsersWatcher);
  const fetchStudyCampaignsWatcher1 = yield fork(fetchStudyCampaignsWatcher);
  const changeStudyStatusWatcher1 = yield fork(changeStudyStatusWatcher);
  const updateLandingPageWatcher1 = yield fork(updateLandingPageWatcher);
  const updateFacebookLandingPageWatcher1 = yield fork(updateFacebookLandingPageWatcher);
  const updateThankYouPageWatcher1 = yield fork(updateThankYouPageWatcher);
  const updatePatientThankYouEmailWatcher1 = yield fork(updatePatientThankYouEmailWatcher);
  const changeStudyAdWatcher1 = yield fork(changeStudyAdWatcher);
  const fetchMessagingNumbersWatcher1 = yield fork(fetchMessagingNumbersWatcher);
  const updateTwilioNumbersWatcher1 = yield fork(updateTwilioNumbersWatcher);
  const fetchCampaignsByStudyWatcher1 = yield fork(fetchCampaignsByStudyWatcher);
  const editCampaignWatcher1 = yield fork(editCampaignWatcher);
  const deleteCampaignWatcher1 = yield fork(deleteCampaignWatcher);
  const editStudyLeadSourcesWatcher1 = yield fork(editStudyLeadSourcesWatcher);
  const deleteStudyLeadSourceWatcher1 = yield fork(deleteStudyLeadSourceWatcher);
  const watcherJ = yield fork(fetchNoteWatcher);
  const watcherK = yield fork(addNoteWatcher);
  const watcherL = yield fork(editNoteWatcher);
  const watcherM = yield fork(deleteNoteWatcher);
  const watcherN = yield fork(fetchTaggedIndicationsForStudyWatcher);
  const watcherO = yield fork(addTaggedIndicationForStudyWatcher);
  const watcherP = yield fork(removeTaggedIndicationForStudyWatcher);
  const watcherR = yield fork(fetchFive9ListWatcher);
  const watcherS = yield fork(removeStudyAdWatcher);

  // Suspend execution until location changes
  const options = yield take(LOCATION_CHANGE);
  if (options.payload.pathname !== '/app') {
    yield cancel(watcherA);
    // yield cancel(watcherB);
    if (watcherD) {
      yield cancel(watcherD);
      watcherD = false;
    }
    if (watcherF) {
      yield cancel(watcherF);
      watcherF = false;
    }
    yield cancel(watcherE);
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
    yield cancel(updateDashboardStudyWatcher1);
    yield cancel(fetchAllClientUsersWatcher1);
    yield cancel(fetchStudyCampaignsWatcher1);
    yield cancel(changeStudyStatusWatcher1);
    yield cancel(updateLandingPageWatcher1);
    yield cancel(updateFacebookLandingPageWatcher1);
    yield cancel(updateThankYouPageWatcher1);
    yield cancel(updatePatientThankYouEmailWatcher1);
    yield cancel(changeStudyAdWatcher1);
    yield cancel(fetchMessagingNumbersWatcher1);
    yield cancel(updateTwilioNumbersWatcher1);
    yield cancel(fetchCampaignsByStudyWatcher1);
    yield cancel(editCampaignWatcher1);
    yield cancel(deleteCampaignWatcher1);
    yield cancel(editStudyLeadSourcesWatcher1);
    yield cancel(deleteStudyLeadSourceWatcher1);
    yield cancel(watcherJ);
    yield cancel(watcherK);
    yield cancel(watcherL);
    yield cancel(watcherM);
    yield cancel(watcherN);
    yield cancel(watcherO);
    yield cancel(watcherP);
    yield cancel(watcherR);
    yield cancel(watcherS);
    if (options.payload.pathname !== '/app') {
      yield put(clearFilters());
      yield put(reset('dashboardFilters'));
    }
  }
}
