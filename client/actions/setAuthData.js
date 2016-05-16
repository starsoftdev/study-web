import { ActionTypes } from 'ActionTypes'

export default function setAuthData (authData) {
  return { type: ActionTypes.SET_AUTH_DATA, authData }
}
