import { ActionTypes } from 'ActionTypes'
import apiCall from 'utils/apiCall'

function logoutRequest (cb = () => {}) {
  // Correct this uri once the api introduces logout endpoint
  return apiCall('/users/logout', { method: 'post' }, cb)
}

export default function logout () {
  return function (dispatch) {
    dispatch({ type: ActionTypes.LOGOUT })
    // dispatch(logoutRequest())
  }
}
