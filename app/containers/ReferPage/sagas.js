
// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { reset } from 'redux-form';
import { get } from 'lodash';

import request from 'utils/request';
import {
  referFormSuccess,
  referFormError,
  companyTypesSuccess,
  companyTypesError,
} from 'containers/ReferPage/actions';
import { REFER_FORM_REQUEST, COMPANY_TYPES_REQUEST } from 'containers/ReferPage/constants';

// Bootstrap sagas
export default [
  formSubmitSaga,
  companyTypesSaga,
];

// Does not allow concurrent fetches of company types (for demo purpose)
// Alternatively you may use takeEvery
function* companyTypesSaga() {
  yield* takeLatest(COMPANY_TYPES_REQUEST, fetchCompanyTypes);
}

function* fetchCompanyTypes() {
  try {
    const requestURL = `${API_URL}/companyTypes`;
    const response = yield call(request, requestURL);

    yield put(companyTypesSuccess(response));
  } catch (res) {
    yield put(companyTypesError(res.error));
  }
}

function* formSubmitSaga() {
  while (true) {
    // listen for the REFER_FORM_REQUEST action dispatched on form submit
    const { payload } = yield take(REFER_FORM_REQUEST); // eslint-disable-line

    try {
      const requestURL = `${API_URL}/referral`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const response = yield call(request, requestURL, params);

      yield put(toastrActions.success('Refer', 'The request has been submitted successfully'));
      yield put(referFormSuccess(response));

      // Clear the form values
      yield put(reset('refer'));
    } catch (res) {
      const error = get(res, 'error.message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', error));
      yield put(referFormError(res.error));
    }
  }
}
