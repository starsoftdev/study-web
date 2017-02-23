// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
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

import { ADD_EMAIL_NOTIFICATION_USER } from '../../containers/App/constants';
import { addEmailNotificationUserSuccess, addEmailNotificationUserError, fetchClientSites } from '../../containers/App/actions';

import {
  fetchPatientSignUpsSucceeded,
  fetchPatientMessagesSucceeded,
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
} from './actions';

// Bootstrap sagas
export default [
  homePageSaga,
];

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
    yield put(toastrActions.error('', errorMessage));
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
    yield put(toastrActions.error('', errorMessage));
  }
}

export function* fetchPatientMessagesWatcher() {
  yield* takeLatest(FETCH_PATIENT_MESSAGES, fetchPatientMessagesWorker);
}

export function* fetchPatientMessagesWorker(action) {
  try {
    const requestURL = `${API_URL}/clients/${action.currentUser.roleForClient.client_id}/patientMessageStats`;
    const response = yield call(request, requestURL);

    yield put(fetchPatientMessagesSucceeded(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while fetching patient messages');
    yield put(toastrActions.error('', errorMessage));
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
      // TODO fix this
      requestURL = `${API_URL}/clients/1/homePageStudies?${queryString}`;
    } else {
      requestURL = `${API_URL}/clients/1/homePageStudies`;
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
    let queryString;
    let requestURL;
    if (action.searchParams) {
      queryString = composeQueryString(action.searchParams);
      requestURL = `${API_URL}/studies/getProtocolsBySponsorRole?${queryString}`;
    } else {
      requestURL = `${API_URL}/studies/getProtocolsBySponsorRole`;
    }
    const response = yield call(request, requestURL);
    yield put(protocolsFetched(response));
  } catch (err) {
    yield put(protocolsFetchingError(err));
  }
}

export function* fetchProtocolNumbersWatcher() {
  yield* takeLatest(FETCH_PROTOCOL_NUMBERS, fetchProtocolNumbersWorker);
}

export function* fetchProtocolNumbersWorker(action) {
  try {
    const requestURL = `${API_URL}/sponsorRoles/${action.currentUser.roleForSponsor.id}/protocols`;

    const params = {
      method: 'GET',
    };
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
    const { levelId, indicationId } = action;
    const requestURL = `${API_URL}/indicationLevelSkus/getPrice`;
    const params = {
      query: {
        levelId,
        indicationId,
      },
    };
    const response = yield call(request, requestURL, params);
    yield put(indicationLevelPriceFetched(response));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Can not get price for Indication Level');
    yield put(toastrActions.error('', errorMessage));
    yield put(indicationLevelPriceFetchingError(err));
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
    yield put(toastrActions.error('', errorMessage));
    yield put(indicationLevelPriceFetchingError(err));
  }
}

export function* renewStudyWatcher() {
  yield* takeLatest(RENEW_STUDY, renewStudyWorker);
}

export function* renewStudyWorker(action) {
  try {
    const { studyId, cartValues, formValues } = action;
    const requestURL = `${API_URL}/studies/${studyId}/renewStudy`;

    const params = {
      method: 'POST',
      body: JSON.stringify({
        formValues,
        cartValues,
      }),
    };
    const response = yield call(request, requestURL, params);

    yield put(toastrActions.success('Renew Study', 'The request has been submitted successfully'));
    yield put(studyRenewed(response));
    yield put(reset('renewStudy'));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    yield put(toastrActions.error('', errorMessage));
    yield put(studyRenewingError(err));
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

    yield put(toastrActions.success('Upgrade Study', 'The request has been submitted successfully'));
    response.newLevelId = formValues.level;
    response.studyId = studyId;
    yield put(studyUpgraded(response));
    yield put(reset('upgradeStudy'));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    yield put(toastrActions.error('', errorMessage));
    yield put(studyUpgradingError(err));
  }
}

export function* editStudyWatcher() {
  yield* takeLatest(EDIT_STUDY, editStudyWorker);
}

export function* editStudyWorker(action) {
  try {
    const { studyId } = action;

    const requestURL = `${API_URL}/sponsorRoles/editProtocol`;

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
      method: 'POST',
      body: data,
      useDefaultContentType: true,
    };
    const response = yield call(request, requestURL, params);

    yield put(fetchClientSites(action.formValues.clientId, {}));

    yield put(toastrActions.success('Edit Study', 'The request has been submitted successfully'));
    yield put(studyEdited(response));
    yield put(reset('editStudy'));
  } catch (err) {
    const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
    yield put(toastrActions.error('', errorMessage));
    yield put(studyEditingError(err));
  }
}

export function* addEmailNotificationUserWatcher() {
  yield* takeLatest(ADD_EMAIL_NOTIFICATION_USER, addEmailNotificationUserWorker);
}

export function* addEmailNotificationUserWorker(action) {
  const { payload } = action;
  console.log('saga', payload);
  try {
    const clientId = payload.clientId;
    delete payload.clientId;

    const requestURL = `${API_URL}/clients/${clientId}/addUserWithClientRole`;
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
    };

    const response = yield call(request, requestURL, options);

    yield put(fetchClientSites(clientId, {}));
    yield put(addEmailNotificationUserSuccess(response.user));
  } catch (err) {
    yield put(addEmailNotificationUserError(err));
  }
}

export function* homePageSaga() {
  const watcherA = yield fork(fetchPatientSignUpsWatcher);
  const watcherB = yield fork(fetchPatientMessagesWatcher);
  const watcherD = yield fork(fetchStudiesWatcher);
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


  // Suspend execution until location changes
  const options = yield take(LOCATION_CHANGE);
  if (options.payload.pathname !== '/') {
    yield cancel(watcherA);
    yield cancel(watcherB);
    yield cancel(watcherD);
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
  }
}
