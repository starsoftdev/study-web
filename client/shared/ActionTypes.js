import keymirror from 'keymirror'

export const ActionTypes = keymirror({
  ROUTE_CHANGED: null,

  SET_AUTH_DATA: null,

  LOGIN: null,
  LOGOUT: null,
  EXPIRE_SESSION: null,
  REQUEST_PASSWORD_RESET: null,
  RESET_PASSWORD: null,
  CHANGE_PASSWORD: null,
  CHANGE_EMAIL: null,

  CREATE_PATIENT: null,
  UPDATE_PATIENT: null,

  SUBMIT_GET_TRIAL_NOTIFICATION_FORM: null,

  FETCH_SITES: null,
  CLEAR_SITES: null,
  FETCH_USERS: null,
  CLEAR_USERS: null,
  FETCH_USER: null,
  FETCH_STUDIES: null,
  FETCH_STUDY: null,
  CLEAR_STUDIES: null,

  FETCH_PATIENT_CATEGORIES: null,
  FETCH_PATIENTS: null,
  FETCH_PATIENTS_BY_STUDY: null,

  UPDATE_PATIENT_CATEGORY: null,
  SUBMIT_ORDER_IRB_AD: null,
})
