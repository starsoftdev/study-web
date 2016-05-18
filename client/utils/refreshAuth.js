import apiCall from './apiCall'
import { ActionTypes } from 'constants'

let refreshingAuth = false
let pendingCallbacks = []

export default function refreshAuth (callback) {
  return (dispatch) => {
    pendingCallbacks.push(callback)

    if (refreshingAuth) { return }
    refreshingAuth = true

    dispatch(apiCall('/auth/refresh', { method: 'post' }, (err, authData) => {
      refreshingAuth = false

      if (err) {
        // If there was an error it means the API cookie has expired,
        // but `apiCall` will dispatch an EXPIRE_SESSION action and trigger
        // a redirect to the login page
        pendingCallbacks.slice().forEach(callback => callback(err))
        pendingCallbacks = []
        return
      }

      dispatch({
        type: ActionTypes.LOGIN,
        status: 'succeeded',
        payload: {
          ...authData,
          lastRefresh: new Date().valueOf()
        }
      })

      // Now the token is refreshed, call the callback with the autData
      pendingCallbacks.slice().forEach(callback => callback(null, authData))
      pendingCallbacks = []
    }))
  }
}
