import { ActionTypes } from 'ActionTypes'
import apiCall from 'utils/apiCall'
import history from 'utils/history'

function logoutRequest (cb = () => {}) {
  // Correct this uri once the api introduces logout endpoint
  return apiCall('/users/logout', { method: 'post' }, cb)
}

export default function logout () {
  return function (dispatch) {
    dispatch(logoutRequest((err, data) => {
			if (!err) {
				dispatch({ type: ActionTypes.LOGOUT })
				history.push('/login')
			}
    }))
  }
}
