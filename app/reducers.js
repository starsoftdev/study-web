/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { default as textBlastModalReducer } from './containers/StudyPage/TextBlastModal/reducer';
import { default as ScheduledPatientModal } from './containers/StudyPage/ScheduledPatientModal/reducer';
import { default as patientsListReducer } from './containers/PatientDatabasePage/TextBlast/reducer';
import { default as editPatientReducer } from './containers/PatientDatabasePage/EditPatientForm/reducer';
import { default as addPatientReducer } from './containers/PatientDatabasePage/ImportPatients/reducer';
import { default as uploadPatientsReducer } from './components/UploadPatientsForm/reducer';
import { default as rewardForm } from './containers/RewardsPage/RewardModal/reducer';
import { default as resetPasswordPageReducer } from './containers/ResetPasswordPage/reducer';
import { default as editDashboardStudyReducer } from './components/EditStudyForms/reducer';
import { default as mediaTrackingReducer } from './components/CallTrackingPageModal/reducer';
import appReducer from './containers/App/reducer';
import globalNotificationsReducer from './containers/GlobalNotifications/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    form: formReducer.plugin({
      'Dashboard.EditStudyForm': editDashboardStudyReducer,
      'PatientDatabase.TextBlastModal': patientsListReducer,
      'PatientDatabase.EmailBlastModal': patientsListReducer,
      'PatientDatabase.EditPatientModal': editPatientReducer,
      'PatientDatabase.AddPatientModal': addPatientReducer,
      ScheduledPatientModal,
      'StudyPage.TextBlastModal': textBlastModalReducer,
      rewardForm,
      'UploadPatients.UploadPatientsForm': uploadPatientsReducer,
      'Dashboard.MediaTrackingForm': mediaTrackingReducer,
    }),
    toastr: toastrReducer,
    globalNotifications: globalNotificationsReducer,
    resetPasswordPage: resetPasswordPageReducer,
    global: appReducer,
    ...asyncReducers,
  });
}
