/**
 * Created by mike on 9/23/16.
 */

import { call, fork, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';
import moment from 'moment-timezone';
import request from '../../utils/request';
import composeQueryString from '../../utils/composeQueryString';
import { getItem, removeItem } from '../../utils/localStorage';
import {
FIND_PATIENTS_TEXT_BLAST,
FETCH_PATIENTS,
EXPORT_PATIENTS,
FETCH_PATIENT_DETAILS,
FETCH_PATIENT_CATEGORIES,
FETCH_STUDY,
ADD_PATIENT_INDICATION,
REMOVE_PATIENT_INDICATION,
SUBMIT_PATIENT_UPDATE,
SUBMIT_TEXT_BLAST,
SUBMIT_PATIENT_IMPORT,
SUBMIT_ADD_PATIENT,
SUBMIT_PATIENT_NOTE,
SUBMIT_DELETE_NOTE,
SUBMIT_PATIENT_TEXT,
SUBMIT_MOVE_PATIENT_BETWEEN_CATEGORIES,
SUBMIT_SCHEDULE,
} from './constants';

import {
  addPatientsToTextBlast,
  campaignsFetched,
  deletePatientNoteSuccess,
  findPatientsForTextBlastSuccess,
  patientCategoriesFetched,
  patientsFetched,
  patientDetailsFetched,
  patientsExported,
  protocolFetched,
  siteFetched,
  sourcesFetched,
  studyFetched,
  studyViewsStatFetched,
  submitAddPatientSuccess,
  submitAddPatientFailure,
  patientReferralStatFetched,
  addPatientIndicationSuccess,
  removePatientIndicationSuccess,
  updatePatientSuccess,
  addPatientNoteSuccess,
  addPatientTextSuccess,
  movePatientBetweenCategoriesLoading,
  movePatientBetweenCategoriesSuccess,
  movePatientBetweenCategoriesFailed,
  submitScheduleSucceeded,
  submitScheduleFailed,
} from './actions';

// Bootstrap sagas
export default [
  fetchStudySaga,
];

function* fetchStudyDetails() {
  const authToken = getItem('auth_token');
  if (!authToken) {
    return;
  }

  // listen for the FETCH_STUDY action
  const { studyId } = yield take(FETCH_STUDY);

  // put the fetching study action in case of a navigation action
  const filter = JSON.stringify({
    include: [
      {
        relation: 'campaigns',
      },
      {
        relation: 'protocol',
      },
      {
        relation: 'site',
      },
      {
        relation: 'sources',
      },
      {
        relation: 'sponsor',
      },
      {
        relation: 'indication',
      },
    ],
  });
  try {
    const requestURL = `${API_URL}/studies/${studyId}?filter=${filter}`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    // populate the campaigns and sources from the study
    yield put(campaignsFetched(response.campaigns));
    yield put(protocolFetched(response.protocol));
    yield put(siteFetched(response.site));
    yield put(sourcesFetched(response.sources));
    delete response.campaigns;
    delete response.protocol;
    delete response.site;
    delete response.sources;
    // put in the study in the state
    yield put(studyFetched(response));
  } catch (e) {
    const errorMessage = get(e, 'message', 'Something went wrong while fetching study information. Please try again later.');
    yield put(toastrActions.error('', errorMessage));
    if (e.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

function* fetchStudyViewsStat(action) { // eslint-disable-line
  // const authToken = getItem('auth_token');
  // if (!authToken) {
  //   return;
  // }
  //
  // // listen for the latest FETCH_STUDY action
  // const { studyId, campaignId } = action;
  //
  // try {
  //   let requestURL = `${API_URL}/studies/${studyId}/landingPageViews`;
  //   if (campaignId) {
  //     requestURL += `?campaignId=${campaignId}`;
  //   }
  //   const response = yield call(request, requestURL, {
  //     method: 'GET',
  //   });
  //   yield put(studyViewsStatFetched(response));
  // TODO re-enable when optimized for high traffic
  yield put(studyViewsStatFetched(0));
  // } catch (e) {
  //   const errorMessage = get(e, 'message', 'Something went wrong while fetching study view stats. Please try again later.');
  //   yield put(toastrActions.error('', errorMessage));
  //   if (e.status === 401) {
  //     yield call(() => { location.href = '/login'; });
  //   }
  // }
}


function* fetchPatientReferralStat(action) {
  const authToken = getItem('auth_token');
  if (!authToken) {
    return;
  }

  // listen for the latest FETCH_STUDY action
  const { studyId, campaignId } = action;

  try {
    let requestURL = `${API_URL}/studies/${studyId}/getPatientReferrals`;
    if (campaignId) {
      requestURL += `?campaignId=${campaignId}`;
    }
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    yield put(patientReferralStatFetched(response));
  } catch (e) {
    const errorMessage = get(e, 'message', 'Something went wrong while fetching patient referral stats. Please try again later.');
    yield put(toastrActions.error('', errorMessage));
    if (e.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

// TODO re-enable when optimized for high traffic
// function* fetchStudyCallStats(action) {
//   const authToken = getItem('auth_token');
//   if (!authToken) {
//     return;
//   }
//
//   // listen for the latest FETCH_STUDY action
//   const { studyId, campaignId } = action;
//
//   try {
//     let requestURL = `${API_URL}/twilioCallRecords/countStudyCallRecords/${studyId}`;
//     if (campaignId) {
//       requestURL += `?campaignId=${campaignId}`;
//     }
//     const response = yield call(request, requestURL, {
//       method: 'GET',
//     });
//     yield put(callStatsFetched(response));
//   } catch (e) {
//     const errorMessage = get(e, 'message', 'Something went wrong while fetching call stats. Please try again later.');
//     yield put(toastrActions.error('', errorMessage));
//     if (e.status === 401) {
//       yield call(() => { location.href = '/login'; });
//     }
//   }
// }

// function* fetchStudyTextStats(action) {
//   const authToken = getItem('auth_token');
//   if (!authToken) {
//     return;
//   }
//
//   // listen for the latest FETCH_STUDY action
//   const { studyId, campaignId } = action;
//
//   try {
//     const requestURL = `${API_URL}/studies/${studyId}/textMessages/count`;
//     const options = {
//       method: 'GET',
//       query: {},
//     };
//     if (campaignId) {
//       options.query.campaignId = campaignId;
//     }
//     const response = yield call(request, requestURL, options);
//     yield put(textStatsFetched(response));
//   } catch (e) {
//     const errorMessage = get(e, 'message', 'Something went wrong while fetching text message stats. Please try again later.');
//     yield put(toastrActions.error('', errorMessage));
//     if (e.status === 401) {
//       yield call(() => { location.href = '/login'; });
//     }
//   }
// }

// TODO re-enable when optimized for high traffic
// function* fetchStudyTextNewStats() {
//   while (true) {
//     // listen for the FETCH_STUDY action
//     const { studyId } = yield take(FETCH_STUDY_NEW_TEXTS);
//     const authToken = getItem('auth_token');
//     if (!authToken) {
//       return;
//     }
//     try {
//       const requestURL = `${API_URL}/studies/${studyId}/textMessages/count`;
//       const response = yield call(request, requestURL, {
//         method: 'GET',
//       });
//       yield put(textStatsFetched(response));
//     } catch (e) {
//       const errorMessage = get(e, 'message', 'Something went wrong while fetching text message stats. Please try again later.');
//       yield put(toastrActions.error('', errorMessage));
//       if (e.status === 401) {
//         yield call(() => { location.href = '/login'; });
//       }
//     }
//   }
// }

function* fetchPatientCategories() {
  const authToken = getItem('auth_token');
  if (!authToken) {
    return;
  }

  // listen for the FETCH_PATIENT_CATEGORIES action
  const { studyId } = yield take(FETCH_PATIENT_CATEGORIES);

  const filter = JSON.stringify({
    fields: ['name', 'id'],
  });
  try {
    const requestURL = `${API_URL}/patientCategories?filter=${filter}`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    // populate the patient categories
    yield put(patientCategoriesFetched(response));
    yield call(fetchPatients, studyId);
  } catch (e) {
    const errorMessage = get(e, 'message', 'Something went wrong while fetching patient categories. Please try again later.');
    yield put(toastrActions.error('', errorMessage));
    if (e.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

export function* exportPatients() {
  while (true) {
    // listen for the FETCH_PATIENTS action
    const { studyId, text, campaignId, sourceId } = yield take(EXPORT_PATIENTS);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    try {
      let requestURL = `${API_URL}/studies/${studyId}/getPatientsForDB`;
      if (authToken) {
        requestURL += `?access_token=${authToken}`;
      }
      if (campaignId) {
        requestURL += `&campaignId=${campaignId}`;
      }
      if (sourceId) {
        requestURL += `&sourceId=${sourceId}`;
      }
      if (text) {
        requestURL += `&text=${encodeURIComponent(text)}`;
      }

      location.replace(`${requestURL}`);
      yield put(patientsExported());
    } catch (e) {
      // if returns forbidden we remove the token from local storage
      if (e.status === 401) {
        removeItem('auth_token');
      }
      const errorMessage = get(e, 'message', 'Something went wrong while fetching patients. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* fetchPatientsSaga() {
  while (true) {
    // listen for the FETCH_PATIENTS action
    const { studyId, text, campaignId, sourceId } = yield take(FETCH_PATIENTS);
    yield call(fetchPatients, studyId, text, campaignId, sourceId);
  }
}

function* fetchPatients(studyId, text, campaignId, sourceId) {
  const authToken = getItem('auth_token');
  if (!authToken) {
    return;
  }

  try {
    const queryParams = {};
    if (campaignId) {
      queryParams.campaignId = campaignId;
    }
    if (sourceId) {
      queryParams.sourceId = sourceId;
    }
    if (text) {
      queryParams.text = text;
    }
    const queryString = composeQueryString(queryParams);
    const requestURL = `${API_URL}/studies/${studyId}/patients?${queryString}`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    // populate the patients
    yield put(patientsFetched(response));
  } catch (e) {
    // if returns forbidden we remove the token from local storage
    if (e.status === 401) {
      removeItem('auth_token');
    }
    const errorMessage = get(e, 'message', 'Something went wrong while fetching patients. Please try again later.');
    yield put(toastrActions.error('', errorMessage));
    if (e.status === 401) {
      yield call(() => { location.href = '/login'; });
    }
  }
}

function* fetchPatientDetails() {
  while (true) {
    // listen for the FETCH_PATIENT_DETAILS action
    const { patientId } = yield take(FETCH_PATIENT_DETAILS);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    const filter = JSON.stringify({
      include: [
        {
          relation: 'patientIndications',
          scope: {
            include: 'indication',
          },
        },
        {
          relation: 'notes',
          scope: {
            fields: ['id', 'note', 'createdAt', 'user_id'],
            include: [
              {
                relation: 'user',
                scope: {
                  fields: ['id', 'firstName', 'lastName', 'profileImageURL'],
                },
              },
            ],
          },
        },
        {
          relation: 'studySource',
          scope: {
            include: 'source',
          },
        },
        {
          relation: 'textMessages',
          scope: {
            fields: ['id', 'note', 'createdAt', 'text_message_id', 'user_id'],
            include: [
              {
                relation: 'twilioTextMessage',
              },
              {
                relation: 'user',
                scope: {
                  fields: ['id', 'firstName', 'lastName', 'profileImageURL'],
                },
              },
            ],
          },
        },
        {
          relation: 'callRecords',
          scope: {
            fields: ['id', 'note', 'createdAt', 'call_record_id', 'user_id'],
            include: [
              {
                relation: 'twilioCallRecord',
              },
            ],
          },
        },
        {
          relation: 'appointments',
          scope: {
            fields: ['time'],
          },
        },
      ],
    });
    try {
      const requestURL = `${API_URL}/patients/${patientId}?filter=${filter}`;
      const response = yield call(request, requestURL, {
        method: 'GET',
      });
      response.textMessages = response.textMessages.map(textMessage => {
        const mappedTextMessage = {
          ...textMessage,
          ...textMessage.twilioTextMessage,
        };
        delete mappedTextMessage.twilioTextMessage;
        delete mappedTextMessage.text_message_id;
        delete mappedTextMessage.user_id;
        return mappedTextMessage;
      });
      yield put(patientDetailsFetched(patientId, response));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while fetching patient information. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* findPatientsSaga() {
  while (true) {
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    // listen for the FIND_PATIENTS_TEXT_BLAST action
    const { studyId, text, categoryIds, sourceIds, campaignId } = yield take(FIND_PATIENTS_TEXT_BLAST);
    let filter = {};
    if (text) {
      filter.text = text;
    }
    if (categoryIds && categoryIds.length > 0) {
      filter.categoryIds = categoryIds;
    }
    if (sourceIds && sourceIds.length > 0) {
      filter.sourceIds = sourceIds;
    }
    filter.campaignId = campaignId;
    filter = JSON.stringify(filter);
    try {
      const requestURL = `${API_URL}/studies/${studyId}/findPatients?filter=${filter}`;
      const response = yield call(request, requestURL, {
        method: 'GET',
      });
      yield put(findPatientsForTextBlastSuccess(response));
      yield put(addPatientsToTextBlast(response));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while fetching study view stats. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* addPatientIndication() {
  while (true) {
    // listen for the SUBMIT_ADD_PATIENT_INDICATION action
    const { patientId, indication } = yield take(ADD_PATIENT_INDICATION);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    try {
      const requestURL = `${API_URL}/patientIndications`;
      const payload = yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify({
          patientId,
          indicationId: indication.id,
        }),
      });
      yield put(addPatientIndicationSuccess(patientId, indication, payload.isOriginal));
      if (payload && payload.patient) {
        yield put(updatePatientSuccess(payload.patient));
      }
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while adding the patient indication. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* submitMovePatientBetweenCategories() {
  while (true) {
    // listen for the SUBMIT_MOVE_PATIENT_BETWEEN_CATEGORIES action
    const { studyId, fromCategoryId, toCategoryId, patientId, afterPatientId } = yield take(SUBMIT_MOVE_PATIENT_BETWEEN_CATEGORIES);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    try {
      yield put(movePatientBetweenCategoriesLoading());
      const requestURL = `${API_URL}/patients/updateCategory`;
      yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify({
          studyId,
          patientId,
          patientCategoryId: toCategoryId,
          afterPatientId,
        }),
      });
      yield put(movePatientBetweenCategoriesSuccess(fromCategoryId, toCategoryId, 1, patientId, moment().toISOString()));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while adding the patient indication. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
      yield put(movePatientBetweenCategoriesFailed());
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* removePatientIndication() {
  while (true) {
    // listen for the SUBMIT_REMOVE_PATIENT_INDICATION action
    const { patientId, indicationId } = yield take(REMOVE_PATIENT_INDICATION);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    try {
      const requestURL = `${API_URL}/patientIndications`;
      const response = yield call(request, requestURL, {
        method: 'DELETE',
        body: JSON.stringify({
          patientId,
          indicationId,
        }),
      });

      yield put(removePatientIndicationSuccess(patientId, indicationId, response && response.patient ? response.patient : null));
      if (response && response.patient) {
        yield put(updatePatientSuccess(response.patient));
      }
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while removing the patient indication. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* submitPatientUpdate() {
  while (true) {
    // listen for the SUBMIT_PATIENT_UPDATE action
    const { patientId, fields } = yield take(SUBMIT_PATIENT_UPDATE);
    const authToken = getItem('auth_token');
    const userId = getItem('user_id');
    if (!authToken) {
      return;
    }

    try {
      const requestURL = `${API_URL}/patients/${patientId}`;
      const response = yield call(request, requestURL, {
        method: 'PATCH',
        body: JSON.stringify({ ...fields, userId }),
      });
      yield put(updatePatientSuccess(response));
    } catch (e) {
      let errorMessage = get(e, 'message', 'Something went wrong while updating patient information. Please try again later.');
      if (errorMessage.includes('email')) {
        errorMessage = 'Error! This email is already on file.';
      } else if (errorMessage.includes('phone')) {
        errorMessage = 'Error! This phone number is already on file.';
      }
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

function* submitPatientNote() {
  while (true) {
    // listen for the SUBMIT_PATIENT_NOTE action
    const { patientId, studyId, currentUser, note } = yield take(SUBMIT_PATIENT_NOTE);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    try {
      const requestURL = `${API_URL}/patients/${patientId}/notes`;
      const response = yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify({
          study_id: studyId,
          note,
        }),
      });
      yield put(addPatientNoteSuccess(currentUser, response));
      if (response && response.patient) {
        yield put(updatePatientSuccess(response.patient));
      }
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while adding a patient note. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* submitDeleteNote() {
  while (true) {
    // listen for the SUBMIT_DELETE_NOTE action
    const { patientId, noteId } = yield take(SUBMIT_DELETE_NOTE);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    try {
      const requestURL = `${API_URL}/patients/${patientId}/notes/${noteId}`;
      const response = yield call(request, requestURL, {
        method: 'DELETE',
      });
      yield put(deletePatientNoteSuccess(noteId));
      if (response && response.patient) {
        yield put(updatePatientSuccess(response.patient));
      }
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while adding a patient note. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* submitPatientText() {
  while (true) {
    // listen for the SUBMIT_PATIENT_TEXT action
    const { id, studyId, message } = yield take(SUBMIT_PATIENT_TEXT);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    try {
      const requestURL = `${API_URL}/patients/${id}/textMessages`;
      const response = yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify({
          study_id: studyId,
          message,
        }),
      });
      yield put(addPatientTextSuccess(response));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while sending a patient text. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* submitTextBlast() {
  while (true) {
    // listen for the SUBMIT_TEXT_BLAST action
    const { patients, message, clientRoleId, onClose } = yield take(SUBMIT_TEXT_BLAST);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    try {
      const requestURL = `${API_URL}/twilioTextMessages/scheduleTextBlast`;
      yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify({
          patientsIDs: patients.map(patient => (
            patient.id
          )),
          clientRoleId,
          message,
        }),
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

function* submitPatientImport() {
  while (true) {
    // listen for the SUBMIT_PATIENT_IMPORT action
    const { clientId, studyId, file, onClose } = yield take(SUBMIT_PATIENT_IMPORT);
    const authToken = getItem('auth_token');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('clientId', clientId);
    if (!authToken) {
      return;
    }

    try {
      const requestURL = `${API_URL}/studies/${studyId}/importPatients`;
      const response = yield call(request, requestURL, {
        useDefaultContentType: 'multipart/form-data',
        method: 'POST',
        body: formData,
      });
      onClose();
      yield put(toastrActions.success('Import Patients', 'Patients imported successfully!'));
      yield put(submitAddPatientSuccess(response, file.name));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while importing the patient list. Please try again later or revise your patient list format.');
      yield put(submitAddPatientFailure());
      yield put(toastrActions.error('', errorMessage));
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* submitAddPatient() {
  while (true) {
    // listen for the SUBMIT_ADD_PATIENT action
    const { studyId, patient, onClose } = yield take(SUBMIT_ADD_PATIENT);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    try {
      const requestURL = `${API_URL}/studies/${studyId}/addPatient`;
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
      } else if (e.message) {
        errorMessages = e.message;
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

export function* submitSchedule() {
  while (true) {
    const { data, fromCategoryId, scheduledCategoryId } = yield take(SUBMIT_SCHEDULE);
    try {
      const requestURL = `${API_URL}/appointments/upsertSchedule`;
      const params = {
        method: 'POST',
        body: JSON.stringify(data),
      };
      const response = yield call(request, requestURL, params);
      yield put(movePatientBetweenCategoriesSuccess(fromCategoryId, scheduledCategoryId, 1, data.patientId, moment().toISOString()));
      yield put(submitScheduleSucceeded(response, data.patientId));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting a schedule');
      yield put(toastrActions.error('', errorMessage));
      yield put(submitScheduleFailed(err));
      if (err.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* fetchStudySaga() {
  try {
    const watcherA = yield fork(fetchStudyDetails);
    const watcherB = yield fork(takeLatest, FETCH_STUDY, fetchStudyViewsStat);
    const watcherC = yield fork(takeLatest, FETCH_STUDY, fetchPatientReferralStat);
    // const watcherD = yield fork(takeLatest, FETCH_STUDY, fetchStudyCallStats);
    // const watcherE = yield fork(takeLatest, FETCH_STUDY, fetchStudyTextStats);
    const watcherF = yield fork(fetchPatientCategories);
    const watcherG = yield fork(fetchPatientsSaga);
    const watcherH = yield fork(exportPatients);
    const watcherI = yield fork(fetchPatientDetails);
    const watcherJ = yield fork(findPatientsSaga);
    const watcherL = yield fork(addPatientIndication);
    const watcherM = yield fork(submitMovePatientBetweenCategories);
    const watcherN = yield fork(removePatientIndication);
    const watcherO = yield fork(submitPatientUpdate);
    const watcherP = yield fork(submitTextBlast);
    const watcherQ = yield fork(submitPatientImport);
    const watcherR = yield fork(submitAddPatient);
    const watcherS = yield fork(submitPatientNote);
    const watcherT = yield fork(submitDeleteNote);
    const watcherU = yield fork(submitPatientText);
    const watcherV = yield fork(submitSchedule);
    // const watcherZ = yield fork(fetchStudyTextNewStats);

    yield take(LOCATION_CHANGE);
    yield cancel(watcherA);
    yield cancel(watcherB);
    yield cancel(watcherC);
    // yield cancel(watcherD);
    // yield cancel(watcherE);
    yield cancel(watcherF);
    yield cancel(watcherG);
    yield cancel(watcherH);
    yield cancel(watcherI);
    yield cancel(watcherJ);
    yield cancel(watcherL);
    yield cancel(watcherM);
    yield cancel(watcherN);
    yield cancel(watcherO);
    yield cancel(watcherP);
    yield cancel(watcherQ);
    yield cancel(watcherR);
    yield cancel(watcherS);
    yield cancel(watcherT);
    yield cancel(watcherU);
    yield cancel(watcherV);
    // yield cancel(watcherZ);
  } catch (e) {
    // if returns forbidden we remove the token from local storage
    if (e.status === 401) {
      removeItem('auth_token');
    }
  }
}
