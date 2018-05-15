import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
import _, { get } from 'lodash';
import { takeLatest } from 'redux-saga';
import { translate } from '../../../common/utilities/localization';

import request from '../../utils/request';

import {
  formSubmitted,
  formSubmissionError,
  hideAddEmailModal,
} from '../../containers/ListNewStudyPage/actions';

import {
  SUBMIT_FORM,
} from '../../containers/ListNewStudyPage/constants';

import { ADD_EMAIL_NOTIFICATION_USER } from '../../containers/App/constants';
import { addEmailNotificationUserSuccess, addEmailNotificationUserError, fetchClientSites, fetchClientCredits } from '../../containers/App/actions';

export function* submitFormWatcher() {
  while (true) {
    const { cartValues, formValues } = yield take(SUBMIT_FORM);
    try {
      const requestURL = `${API_URL}/studies`;

      const data = new FormData();
      _.forEach(formValues, (value, index) => {
        if (index === 'file') {
          data.append(index, value[0]);
        } else if (index === 'emailNotifications' || index === 'leadSource') {
          data.append(index, JSON.stringify(value));
        } else if (index === 'startDate') {
          // start date may have a null value due to not determined start date status
          // we don't want to send that over as part of the request
          if (value) {
            data.append(index, value.format('YYYY-MM-DD'));
          }
        } else {
          data.append(index, value);
        }
      });
      data.append('cartValues', JSON.stringify(cartValues));

      const params = {
        method: 'POST',
        body: data,
        useDefaultContentType: true,
      };
      const response = yield call(request, requestURL, params);

      toastr.success(translate('portals.page.listNewStudyPage.submitSuccessToastrTitle'), translate('portals.page.listNewStudyPage.submitSuccessToastrMessage'));
      yield put(fetchClientCredits(formValues.user_id));
      yield put(formSubmitted(response));

      // Clear the form values
      yield put(reset('listNewStudy'));
      yield put(reset('shoppingCart'));
    } catch (err) {
      let errorMessage = get(err, 'message', 'portals.page.listNewStudyPage.submitErrorToastr');
      if (errorMessage.toLowerCase().indexOf('no such coupon') !== -1) {
        errorMessage = translate('portals.page.listNewStudyPage.couponErrorToastr');
      }
      toastr.error('', errorMessage);
      yield put(formSubmissionError(err));
      // if returns forbidden we remove the token from local storage
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
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

    yield put(fetchClientSites(clientId, {}));
    yield put(hideAddEmailModal());

    yield put(addEmailNotificationUserSuccess(response.user));
  } catch (err) {
    yield put(addEmailNotificationUserError(err));
  }
}

export function* listNewStudyPageSaga() {
  const watcherA = yield fork(submitFormWatcher);
  const watcherB = yield fork(addEmailNotificationUserWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

// All sagas to be loaded
export default [
  listNewStudyPageSaga,
];
