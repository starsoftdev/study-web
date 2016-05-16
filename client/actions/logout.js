import { ActionTypes } from 'ActionTypes'
import apiCall from 'utils/apiCall'

function logoutRequest (cb = () => {}) {
  return apiCall('/auth/logout', { method: 'post' }, cb)
}

export default function logout () {
  return function (dispatch) {
    dispatch({ type: ActionTypes.LOGOUT })
    dispatch(logoutRequest())
  }
}
