/* eslint-disable no-constant-condition, consistent-return */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import { getItem } from '../../utils/localStorage';

import request from '../../utils/request';
import composeQueryString from '../../utils/composeQueryString';
import {
  ADD_PATIENT_INDICATION,
  REMOVE_PATIENT_INDICATION,
  UPDATE_PATIENT_INDICATION,
  FETCH_PATIENTS,
  GET_TOTAL_PATIENTS_COUNT,
  FETCH_PATIENT_CATEGORIES,
  FETCH_PATIENT,
  FETCH_FILTERED_PROTOCOLS,
  SAVE_PATIENT,
  SUBMIT_TEXT_BLAST,
  IMPORT_PATIENTS,
  SUBMIT_ADD_PATIENT,
} from './constants';

import {
  filteredProtcolsFetched,
  filteredProtcolsFetchingError,
  getTotalPatientsCountSuccess,
  getTotalPatientsCountError,
  patientsFetched,
  patientsFetchingError,
  patientCategoriesFetched,
  patientCategoriesFetchingError,
  patientFetched,
  patientFetchingError,
  patientSaved,
  patientSavingError,
  downloadComplete,
  submitAddPatientSuccess,
  submitAddPatientFailure,
  clearPatientsList,
} from './actions';

export function* patientDatabasePageSaga() {
  const watcherA = yield fork(fetchPatientsWatcher);
  const watcherB = yield fork(fetchPatientCategoriesWatcher);
  const watcherC = yield fork(fetchPatientWatcher);
  const watcherD = yield fork(fetchFilteredProtocolsWatcher);
  const watcherE = yield fork(addPatientIndicationWatcher);
  const watcherF = yield fork(removePatientIndicationWatcher);
  const watcherG = yield fork(updatePatientIndicationWatcher);
  const watcherH = yield fork(savePatientWatcher);
  const watcherI = yield fork(submitTextBlast);
  const watcherJ = yield fork(importPatients);
  const watcherK = yield fork(submitAddPatient);
  const watcherL = yield fork(getTotalPatientsCountWatcher);

  yield take(LOCATION_CHANGE);

  yield put(clearPatientsList());

  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
  yield cancel(watcherG);
  yield cancel(watcherH);
  yield cancel(watcherI);
  yield cancel(watcherJ);
  yield cancel(watcherK);
  yield cancel(watcherL);
}

// Bootstrap sagas
export default [
  patientDatabasePageSaga,
];

export function* fetchPatientsWatcher() {
  while (true) {
    const { clientId, searchParams, patients, searchFilter, isExport } = yield take(FETCH_PATIENTS);
    try {
      const filterObj = {
        include: [
          'indications',
          'source',
          { campaigns: 'site' },
          { studyPatientCategory: ['patientCategory'] },
        ],
        where: {
          and: [],
        },
        limit: searchParams.limit || 15,
        skip: searchParams.skip || 0,
        isExport,
      };

      if (searchParams.sort && searchParams.direction && searchParams.sort !== 'orderNumber') {
        filterObj.order = `${searchParams.sort} ${((searchParams.direction === 'down') ? 'DESC' : 'ASC')}`;
      }
      if (searchParams.status) {
        filterObj.where.and.push({
          status:  (searchParams.status === 'All') ? 0 : searchParams.status,
        });
      }
      if (searchParams.site && searchParams.site !== 'All') {
        filterObj.where.and.push({
          site: searchParams.site,
        });
      }
      if (searchParams.includeIndication) {
        filterObj.where.and.push({
          includeIndication: searchParams.includeIndication,
        });
      }

      if (searchParams.excludeIndication) {
        filterObj.where.and.push({
          excludeIndication: searchParams.excludeIndication,
        });
      }

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
              }, {
                email: {
                  like: `%${searchParams.name}%`,
                },
              }, {
                phone: {
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
            source_id: (searchParams.source === 'All') ? 0 : searchParams.source,
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
        clientId,
      };

      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/patients/getPatientsForDB?${queryString}`;
      if (isExport) {
        location.replace(`${requestURL}`);
        yield put(downloadComplete());
      } else {
        const response = yield call(request, requestURL);
        yield put(patientsFetched(searchParams, response, patients, searchFilter, { filter: filterObj, clientId }));
      }
    } catch (err) {
      yield put(patientsFetchingError(err));
    }
  }
}

export function* getTotalPatientsCountWatcher() {
  while (true) {
    const { clientId } = yield take(GET_TOTAL_PATIENTS_COUNT);
    const filterObj = {
      include: [
        'indications',
        'source',
        { campaigns: 'site' },
        { studyPatientCategory: ['patientCategory'] },
      ],
      where: {
        and: [],
      },
    };

    const queryParams = {
      filter: JSON.stringify(filterObj),
      clientId,
    };
    const queryString = composeQueryString(queryParams);
    try {
      const requestURL = `${API_URL}/patients/getTotalPatient?${queryString}`;
      const response = yield call(request, requestURL);
      yield put(getTotalPatientsCountSuccess(response));
    } catch (err) {
      yield put(getTotalPatientsCountError(err));
    }
  }
}

export function* fetchPatientCategoriesWatcher() {
  while (true) {
    yield take(FETCH_PATIENT_CATEGORIES);

    try {
      const queryParams = { filter: '{"order":"autoCreateOrderNum ASC"}' };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/patientCategories?${queryString}`;

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
      const queryParams = {
        filter: JSON.stringify({
          include: [
            {
              relation: 'patientIndications',
              scope: {
                include: 'indication',
              },
            },
            {
              studySource: 'source',
            },
            {
              studyPatientCategory: [
                'patientCategory',
                'study',
              ],
            },
          ],
        }),
      };
      const queryString = composeQueryString(queryParams);
      const requestURL = `${API_URL}/patients/${id}?${queryString}`;
      const response = yield call(request, requestURL);
      if (response.source) {
        response.source = response.source.id;
      }
      yield put(patientFetched(response));
    } catch (err) {
      yield put(patientFetchingError(err));
      console.error(err);
    }
  }
}

export function* fetchFilteredProtocolsWatcher() {
  while (true) {
    const { clientRoleId, siteId } = yield take(FETCH_FILTERED_PROTOCOLS);

    try {
      const params = {
        clientRoleId,
      };
      const requestURL = `${API_URL}/sites/${siteId}/protocols`;
      const response = yield call(request, requestURL, params);
      yield put(filteredProtcolsFetched(response));
    } catch (err) {
      yield put(filteredProtcolsFetchingError(err));
      console.error(err);
    }
  }
}

export function* addPatientIndicationWatcher() {
  while (true) {
    const { patientId, indicationId, studyId } = yield take(ADD_PATIENT_INDICATION);

    try {
      // check if we need to update the patient with study info
      const requestURL = `${API_URL}/patientIndications`;
      const options = {
        method: 'POST',
        body: JSON.stringify({
          patientId,
          indicationId,
          studyId,
        }),
      };
      yield call(request, requestURL, options);
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while adding indications.');
      yield put(toastrActions.error('', errorMessage));
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* removePatientIndicationWatcher() {
  while (true) {
    const { patientId, indicationId } = yield take(REMOVE_PATIENT_INDICATION);

    try {
      // check if we need to update the patient with study info
      const requestURL = `${API_URL}/patientIndications`;
      const options = {
        method: 'DELETE',
        body: JSON.stringify({
          patientId,
          indicationId,
        }),
      };
      yield call(request, requestURL, options);
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while removing indications.');
      yield put(toastrActions.error('', errorMessage));
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* updatePatientIndicationWatcher() {
  while (true) {
    const { patientId, indicationId, studyId } = yield take(UPDATE_PATIENT_INDICATION);

    try {
      // check if we need to update the patient with study info
      const requestURL = `${API_URL}/patientIndications`;
      const options = {
        method: 'PUT',
        body: JSON.stringify({
          patientId,
          indicationId,
          studyId,
        }),
      };
      yield call(request, requestURL, options);
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while updating indications.');
      yield put(toastrActions.error('', errorMessage));
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* savePatientWatcher() {
  while (true) {
    const { clientRoleId, id, data } = yield take(SAVE_PATIENT);

    try {
      // check if we need to update the patient with study info
      const requestURL = `${API_URL}/patients/${id}/updatePatientForDB`;
      const options = {
        method: 'POST',
        query: {
          clientRoleId,
        },
        body: JSON.stringify({
          ...data,
        }),
      };
      const response = yield call(request, requestURL, options);

      yield put(toastrActions.success('Save Patient', 'Patient saved successfully!'));
      yield put(patientSaved(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(patientSavingError(err));
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* submitTextBlast() {
  while (true) {
    // listen for the SUBMIT_TEXT_BLAST action
    const { formValues, clientRoleId, onClose } = yield take(SUBMIT_TEXT_BLAST);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }
    try {
      const requestURL = `${API_URL}/twilioTextMessages/scheduleTextBlast`;

      let reqParams = {};
      if (!formValues.selectAllUncheckedManually) {
        reqParams = {
          selectAll: true,
          message: formValues.message,
          clientRoleId,
          patientsIDs: [],
          queryParams: {
            ...formValues.queryParams,
            filter: {
              ...formValues.queryParams.filter,
              limit: null,
              offset: null,
            },
          },
          excludePatients: formValues.uncheckedPatients,
        };
      } else {
        reqParams = {
          patientsIDs: formValues.patients.map(patient => patient.id),
          message: formValues.message,
          clientRoleId,
        };
      }
      yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify(reqParams),
      });
      onClose();
      yield put(toastrActions.success('', 'Success! Your text blast have been sent.'));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while submitting the text blast. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* importPatients() {
  while (true) {
    const { clientId, payload, onClose } = yield take(IMPORT_PATIENTS);
    const formData = new FormData();
    formData.append('file', payload);
    formData.append('clientId', clientId);
    try {
      const requestURL = `${API_URL}/patients/importPatients`;
      const response = yield call(request, requestURL, {
        useDefaultContentType: 'multipart/form-data',
        method: 'POST',
        body: formData,
      });
      yield put(toastrActions.success('Import Patients', 'Patients imported successfully!'));
      yield put(submitAddPatientSuccess(response, payload.name));
      onClose();
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while submitting the text blast. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
      yield put(submitAddPatientFailure());
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* submitAddPatient() {
  while (true) {
    // listen for the SUBMIT_ADD_PATIENT action
    const { patient, onClose } = yield take(SUBMIT_ADD_PATIENT);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    try {
      const requestURL = `${API_URL}/patients`;
      const response = yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify(patient),
      });
      onClose();
      yield put(toastrActions.success('Add Patient', 'Patient added successfully!'));
      yield put(submitAddPatientSuccess(response));
    } catch (e) {
      let errorMessages;
      if (e.details && e.details.messages) {
        if (e.details.messages.email) {
          errorMessages = e.details.messages.email[0];
        } else if (e.details.messages.phone) {
          errorMessages = e.details.messages.phone[0];
        } else {
          errorMessages = e.details.messages[0];
        }
      } else {
        errorMessages = 'Something went wrong while adding a patient. Please try again later.';
      }
      yield put(toastrActions.error('', errorMessages));
      yield put(submitAddPatientFailure());
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}
