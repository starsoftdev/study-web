/**
 * Created by mike on 9/23/16.
 */

import { call, fork, put, take } from 'redux-saga/effects';
import request from 'utils/request';
import { getItem, removeItem } from 'utils/localStorage';
import { FETCH_PATIENTS,
  FETCH_PATIENT_DETAILS,
  FETCH_PATIENT_CATEGORIES,
  FETCH_STUDY,
  SUBMIT_PATIENT_UPDATE,
  SUBMIT_TEXT_BLAST,
  SUBMIT_PATIENT_IMPORT,
  SUBMIT_ADD_PATIENT,
  SUBMIT_PATIENT_NOTE,
  SUBMIT_DELETE_NOTE,
  SUBMIT_PATIENT_TEXT,
} from './constants';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';

import { campaignsFetched, deletePatientNoteSuccess, patientCategoriesFetched, patientsFetched, patientDetailsFetched, siteFetched, sourcesFetched, studyFetched, studyViewsStatFetched, patientReferralStatFetched, updatePatientSuccess, addPatientNoteSuccess, addPatientTextSuccess } from './actions';

// Bootstrap sagas
export default [
  fetchStudySaga,
];

function* fetchStudyDetails() {
  const authToken = getItem('auth_token');

  // listen for the FETCH_STUDY action
  const { studyId, siteId } = yield take(FETCH_STUDY);

  const filter = JSON.stringify({
    include: [
      {
        relation: 'campaigns',
      },
      {
        relation: 'sources',
      },
      {
        relation: 'sites',
        scope: {
          where: {
            id: siteId,
          }
        }
      },
    ],
  });
  try {
    const requestURL = `${API_URL}/studies/${studyId}?access_token=${authToken}&filter=${filter}`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    // populate the campaigns and sources from the study
    yield put(campaignsFetched(response.campaigns));
    yield put(sourcesFetched(response.sources));
    yield put(siteFetched(response.sites[0]));
    delete response.campaigns;
    delete response.sources;
    delete response.sites;
    // put in the study in the state
    yield put(studyFetched(response));
  } catch (e) {
    const errorMessage = get(e, 'message', 'Something went wrong while fetching study information. Please try again later.');
    yield put(toastrActions.error('', errorMessage));
  }
}

function* fetchStudyViewsStat() {
  const authToken = getItem('auth_token');

  // listen for the FETCH_STUDY action
  const { studyId } = yield take(FETCH_STUDY);

  try {
    const requestURL = `${API_URL}/studies/${studyId}/landingPageViews?access_token=${authToken}`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    yield put(studyViewsStatFetched(response));
  } catch (e) {
    const errorMessage = get(e, 'message', 'Something went wrong while fetching study view stats. Please try again later.');
    yield put(toastrActions.error('', errorMessage));
  }
}

function* fetchPatientReferralStat() {
  const authToken = getItem('auth_token');

  // listen for the FETCH_STUDY action
  const { studyId } = yield take(FETCH_STUDY);

  try {
    const requestURL = `${API_URL}/studies/${studyId}/patients/count?access_token=${authToken}`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    yield put(patientReferralStatFetched(response));
  } catch (e) {
    const errorMessage = get(e, 'message', 'Something went wrong while fetching patient referral stats. Please try again later.');
    yield put(toastrActions.error('', errorMessage));
  }
}

function* fetchPatientCategories() {
  const authToken = getItem('auth_token');

  // listen for the FETCH_PATIENT_CATEGORIES action
  const { studyId, siteId } = yield take(FETCH_PATIENT_CATEGORIES);

  const filter = JSON.stringify({
    fields: ['name', 'id'],
  });
  try {
    const requestURL = `${API_URL}/patientCategories?access_token=${authToken}&filter=${filter}`;
    const response = yield call(request, requestURL, {
      method: 'GET',
    });
    // populate the patient categories
    yield put(patientCategoriesFetched(response));
    yield call(fetchPatients, studyId, siteId);
  } catch (e) {
    const errorMessage = get(e, 'message', 'Something went wrong while fetching patient categories. Please try again later.');
    yield put(toastrActions.error('', errorMessage));
  }
}

export function* fetchPatientsSaga() {
  while (true) {
    // listen for the FETCH_PATIENTS action
    const { studyId, siteId, text, campaignId, sourceId } = yield take(FETCH_PATIENTS);
    yield call(fetchPatients, studyId, siteId, text, campaignId, sourceId);
  }
}

function* fetchPatients(studyId, siteId, text, campaignId, sourceId) {
  const authToken = getItem('auth_token');

  try {
    let requestURL = `${API_URL}/studies/${studyId}/patients?access_token=${authToken}&siteId=${siteId}`;
    if (campaignId) {
      requestURL += `&campaignId=${campaignId}`;
    }
    if (sourceId) {
      requestURL += `&sourceId=${sourceId}`;
    }
    if (text) {
      requestURL += `&text=${encodeURIComponent(text)}`
    }
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
  }
}

function* fetchPatientDetails() {
  while(true) {
    // listen for the FETCH_PATIENT_DETAILS action
    const { categoryId, patientId } = yield take(FETCH_PATIENT_DETAILS);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }
    const filter = JSON.stringify({
      include: [
        {
          relation: 'indications',
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
                }
              },
            ],
          },
        },
        {
          relation: 'source',
        },
        {
          relation: 'textMessages',
          scope: {
            fields: ['id', 'note', 'createdAt', 'user_id'],
            include: [
              {
                relation: 'twilioTextMessage'
              }
            ],
          },
        },
      ]
    })
    try {
      const requestURL = `${API_URL}/patients/${patientId}?access_token=${authToken}&filter=${filter}`;
      const response = yield call(request, requestURL, {
        method: 'GET',
      });
      let parsedResponse = Object.assign({}, response);
      delete parsedResponse.textMessages;
      parsedResponse.textMessages = response.textMessages.map(textMessage => {
        return textMessage.twilioTextMessage;
      })
      yield put(patientDetailsFetched(parsedResponse));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while fetching patient information. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

function* submitPatientUpdate() {
  while(true) {
    // listen for the SUBMIT_PATIENT_UPDATE action
    const { patientId, fields } = yield take(SUBMIT_PATIENT_UPDATE);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }
    try {
      const requestURL = `${API_URL}/patients/${patientId}?access_token=${authToken}`;
      const response = yield call(request, requestURL, {
        method: 'PUT',
        body: JSON.stringify(fields)
      });
      yield put(updatePatientSuccess(response));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while updating patient information. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

function* submitPatientNote() {
  while(true) {
    // listen for the SUBMIT_PATIENT_NOTE action
    const { patientId, studyId, currentUser, note } = yield take(SUBMIT_PATIENT_NOTE);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }
    try {
      const requestURL = `${API_URL}/patients/${patientId}/notes?access_token=${authToken}`;
      const response = yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify({
          study_id: studyId,
          note
        })
      });
      yield put(addPatientNoteSuccess(currentUser, response));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while adding a patient note. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

function* submitDeleteNote() {
  while(true) {
    // listen for the SUBMIT_DELETE_NOTE action
    const { patientId, noteId } = yield take(SUBMIT_DELETE_NOTE);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }
    try {
      const requestURL = `${API_URL}/patients/${patientId}/notes/${noteId}?access_token=${authToken}`;
      yield call(request, requestURL, {
        method: 'DELETE',
      });
      yield put(deletePatientNoteSuccess(noteId));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while adding a patient note. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

function* submitPatientText() {
  while(true) {
    // listen for the SUBMIT_PATIENT_TEXT action
    const { id, studyId, message } = yield take(SUBMIT_PATIENT_TEXT);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }
    try {
      const requestURL = `${API_URL}/patients/${id}/textMessages?access_token=${authToken}`;
      const response = yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify({
          study_id: studyId,
          message
        })
      });
      yield put(addPatientTextSuccess(response));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while sending a patient text. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

function* submitTextBlast() {
  while(true) {
    // listen for the SUBMIT_TEXT_BLAST action
    const { patients, onClose } = yield take(SUBMIT_TEXT_BLAST);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }
    try {
      const requestURL = `${API_URL}/textMessages?access_token=${authToken}`;
      yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify(patients)
      });
      onClose();
      yield put(toastrActions.success('Text Blast', 'Text blast submitted successfully!'));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while submitting the text blast. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

function* submitPatientImport() {
  while(true) {
    // listen for the SUBMIT_PATIENT_IMPORT action
    const { studyId, file, onClose } = yield take(SUBMIT_PATIENT_IMPORT);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }
    try {
      const requestURL = `${API_URL}/studies/${studyId}/patients?access_token=${authToken}`;
      yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify(file)
      });
      onClose();
      yield put(toastrActions.success('Import Patients', 'Patients imported successfully!'));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while importing the patient list. Please try again later or revise your patient list format.');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

function* submitAddPatient() {
  while(true) {
    // listen for the SUBMIT_ADD_PATIENT action
    const { studyId, file, onClose } = yield take(SUBMIT_ADD_PATIENT);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }
    try {
      const requestURL = `${API_URL}/studies/${studyId}/patients?access_token=${authToken}`;
      yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify(file)
      });
      onClose();
      yield put(toastrActions.success('Add Patient', 'Patient added successfully!'));
    } catch (e) {
      const errorMessage = get(e, 'message', 'Something went wrong while adding a patient. Please try again later.');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* fetchStudySaga() {
  const authToken = getItem('auth_token');
  if (!authToken) {
    return;
  }

  try {
    yield fork(fetchStudyDetails);
    yield fork(fetchStudyViewsStat);
    yield fork(fetchPatientReferralStat);
    yield call(fetchPatientCategories);
    yield fork(fetchPatientsSaga);
    yield fork(fetchPatientDetails);
    yield fork(submitPatientUpdate);
    yield fork(submitTextBlast);
    yield fork(submitPatientImport);
    yield fork(submitAddPatient);
    yield fork(submitPatientNote);
    yield fork(submitDeleteNote);
    yield fork(submitPatientText);
  } catch (e) {
    // if returns forbidden we remove the token from local storage
    if (e.status === 401) {
      removeItem('auth_token');
    }
  }
}
