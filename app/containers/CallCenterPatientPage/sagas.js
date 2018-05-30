import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';

import request from '../../utils/request';
import { getItem, removeItem } from '../../utils/localStorage';
import { translate } from '../../../common/utilities/localization';
import {
  FETCH_PATIENT,
  SUBMIT_PATIENT_NOTE,
  SUBMIT_DELETE_NOTE,
  SUBMIT_EMAIL,
} from './constants';

import {
  patientFetched,
  patientFetchingError,
  deletePatientNoteSuccess,
  addPatientNoteSuccess,
  submitEmailSuccess,
} from './actions';

export function* fetchPatientWatcher() {
  while (true) {
    const { id } = yield take(FETCH_PATIENT);

    try {
      const filter = JSON.stringify({
        include: [
          {
            relation: 'site',
          },
          {
            relation: 'patientIndications',
            scope: {
              include: ['indication'],
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
                    include: 'roleForClient',
                  },
                },
              ],
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
      const requestURL = `${API_URL}/patients/${id}?filter=${filter}`;
      const response = yield call(request, requestURL);
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

function* submitPatientNote() {
  while (true) {
    // listen for the SUBMIT_PATIENT_NOTE action
    const { patientId, studyId, currentUser, note } = yield take(SUBMIT_PATIENT_NOTE);

    console.log('currentUser', currentUser);
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
          isProxy: currentUser.isProxy,
          note,
        }),
      });
      yield put(addPatientNoteSuccess(currentUser, response));
    } catch (e) {
      const errorMessage = get(e, 'message', translate('client.page.studyPage.toastrAddingNoteErrorMessage'));
      toastr.error('', errorMessage);
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

function* submitEmail() {
  while (true) {
    // listen for the SUBMIT_EMAIL action
    const { studyId, patientId, currentUser, email, message, subject } = yield take(SUBMIT_EMAIL);
    const authToken = getItem('auth_token');
    if (!authToken) {
      return;
    }

    try {
      const requestURL = `${API_URL}/patients/${patientId}/emailSend`;
      const response = yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify({
          study_id: studyId,
          patientId,
          email,
          userId: currentUser.id,
          message,
          subject,
        }),
      });
      yield put(submitEmailSuccess(response));
      toastr.success('', translate('client.page.studyPage.toastrEmailSuccessMessage'));
    } catch (e) {
      const errorMessage = get(e, 'message', translate('client.page.studyPage.toastrSandingEmailErrorMessage'));
      toastr.error('', errorMessage);
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
      yield call(request, requestURL, {
        method: 'DELETE',
      });
      yield put(deletePatientNoteSuccess(noteId));
    } catch (e) {
      const errorMessage = get(e, 'message', translate('client.page.studyPage.toastrAddingNoneErrorMessage'));
      toastr.error('', errorMessage);
      if (e.status === 401) {
        yield call(() => { location.href = '/login'; });
      }
    }
  }
}

export function* callCenterPatientPageSaga() {
  try {
    const watcherA = yield fork(fetchPatientWatcher);
    const watcherB = yield fork(submitPatientNote);
    const watcherC = yield fork(submitDeleteNote);
    const watcherD = yield fork(submitEmail);

    yield take(LOCATION_CHANGE);

    yield cancel(watcherA);
    yield cancel(watcherB);
    yield cancel(watcherC);
    yield cancel(watcherD);
  } catch (e) {
    // if returns forbidden we remove the token from local storage
    if (e.status === 401) {
      removeItem('auth_token');
    }
  }
}

// Bootstrap sagas
export default [
  callCenterPatientPageSaga,
];
