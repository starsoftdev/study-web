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
})
