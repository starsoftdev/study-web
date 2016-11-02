/* eslint-disable no-constant-condition, consistent-return */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import { getItem, removeItem } from 'utils/localStorage';

import request from 'utils/request';
import composeQueryString from 'utils/composeQueryString';
import {
  FETCH_PATIENTS,
  FETCH_PATIENT_CATEGORIES,
  FETCH_PATIENT,
  SAVE_PATIENT,
  SUBMIT_TEXT_BLAST,
} from './constants';

import {
  patientsFetched,
  patientsFetchingError,
  patientCategoriesFetched,
  patientCategoriesFetchingError,
  patientFetched,
  patientFetchingError,
  patientSaved,
  patientSavingError,
} from './actions';

export function* patientDatabasePageSaga() {
  const watcherA = yield fork(fetchPatientsWatcher);
  const watcherB = yield fork(fetchPatientCategoriesWatcher);
  const watcherC = yield fork(fetchPatientWatcher);
  const watcherD = yield fork(savePatientWatcher);
  const watcherE = yield fork(submitTextBlast);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
}

// Bootstrap sagas
export default [
  patientDatabasePageSaga,
];

export function* fetchPatientsWatcher() {
  while (true) {
    const { searchParams } = yield take(FETCH_PATIENTS);

    try {
      const filterObj = {
        include: [
          'indications',
          'source',
          { studyPatientCategory: 'patientCategory' },
        ],
        where: {
          and: [],
        },
      };

      if (searchParams) {
        if (searchParams.name) {
          filterObj.where.and.push({
            or: [
              {
                firstName: {
                  like: `%${searchParams.name}%`,
                },
              }, {
                lastName: {
                  like: `%${searchParams.name}%`,
                },
              },
            ],
          });
        }
        if (searchParams.ageFrom && !searchParams.ageTo) {
          filterObj.where.and.push({
            age: {
              gt: searchParams.ageFrom,
            },
          });
        } else if (!searchParams.ageFrom && searchParams.ageTo) {
          filterObj.where.and.push({
            age: {
              lt: searchParams.ageTo,
            },
          });
        } else if (searchParams.ageFrom && searchParams.ageTo) {
          filterObj.where.and.push({
            age: {
              between: [searchParams.ageFrom, searchParams.ageTo],
            },
          });
        }
        if (searchParams.bmiFrom && !searchParams.bmiTo) {
          filterObj.where.and.push({
            bmi: {
              gt: searchParams.bmiFrom,
            },
          });
        } else if (!searchParams.bmiFrom && searchParams.bmiTo) {
          filterObj.where.and.push({
            bmi: {
              lt: searchParams.bmiTo,
            },
          });
        } else if (searchParams.bmiFrom && searchParams.bmiTo) {
          filterObj.where.and.push({
            bmi: {
              between: [searchParams.bmiFrom, searchParams.bmiTo],
            },
          });
        }
        if (searchParams.source) {
          filterObj.where.and.push({
            source_id: searchParams.source,
          });
        }
        if (searchParams.gender && searchParams.gender !== 'All') {
          filterObj.where.and.push({
            gender: searchParams.gender,
          });
        }
      }

      const queryParams = {
        filter: JSON.stringify(filterObj),
      };

      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/patients?${queryString}`;
      const response = yield call(request, requestURL);

      yield put(patientsFetched(searchParams, response));
    } catch (err) {
      yield put(patientsFetchingError(err));
    }
  }
}

export function* fetchPatientCategoriesWatcher() {
  while (true) {
    yield take(FETCH_PATIENT_CATEGORIES);

    try {
      const requestURL = `${API_URL}/patientCategories`;
      const response = yield call(request, requestURL);

      yield put(patientCategoriesFetched(response));
    } catch (err) {
      yield put(patientCategoriesFetchingError(err));
    }
  }
}

export function* fetchPatientWatcher() {
  while (true) {
    const { id } = yield take(FETCH_PATIENT);

    try {
      const queryParams = { filter: '{"include": ["indications", "source", {"studyPatientCategory": "patientCategory"}]}' };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/patients/${id}?${queryString}`;
      const response = yield call(request, requestURL);

      yield put(patientFetched(response));
    } catch (err) {
      yield put(patientFetchingError(err));
    }
  }
}

export function* savePatientWatcher() {
  while (true) {
    const { id, data } = yield take(SAVE_PATIENT);

    try {
      let requestURL = null;
      let options = null;
      if (data.patient_category_id) {
        requestURL = `${API_URL}/patients/update_with_relations`;
        options = {
          method: 'POST',
          body: JSON.stringify({
            id,
            ...data,
          }),
        };
      } else {
        requestURL = `${API_URL}/patients/${id}`;
        options = {
          method: 'PUT',
          body: JSON.stringify(data),
        };
      }
      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('Save Patient', 'Patient saved successfully!'));
      yield put(patientSaved(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(patientSavingError(err));
    }
  }
}


function* submitTextBlast() {
  while (true) {
    // listen for the SUBMIT_TEXT_BLAST action
    const { patients, message, onClose } = yield take(SUBMIT_TEXT_BLAST);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }
    try {
      const requestURL = `${API_URL}/twilioTextMessages/textBlast?access_token=${authToken}`;
      yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify({
          patientsIDs: patients.map(patient => (
            patient.id
          )),
          message,
        }),
      });
      onClose();
      yield put(toastrActions.success('Text Blast', 'Text blast submitted successfully!'));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while submitting the text blast. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}
