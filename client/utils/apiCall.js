import { bind } from 'redux-effects'
import { fetch } from '../effects/fetch'

import { ActionTypes } from 'ActionTypes'

export default function apiCall (path, options, cb) {
  let method, headers, body

  if (!cb) {
    cb = options
  } else {
    ({ method, body } = options)
  }

  headers = {
    'Accept': 'application/json'
  }

  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
    body = body && JSON.stringify(body)
  }

  return bind(
    fetch(API_URL + path, {
      method: method || 'get',
      credentials: 'include',
      mode: 'cors',
      headers: headers,
      body: body
    }),
    res => (dispatch, getState) => {
      if (res.status === 200) {
        cb(null, res.data)
      } else if (res.status === 401) {
        // Recognize when the user is authenticating and failed, and when the
        // session expired.
        if (getState().authorization.authorizing) {
          dispatch({
            type: ActionTypes.LOGIN,
            status: 'failed',
            err: res.data.message
          })
        } else {
          dispatch({ type: ActionTypes.EXPIRE_SESSION })
        }
      } else {
        cb({ status: res.status, data: res.data })
      }
    },
    err => {
      cb(err)
    }
  )
}
