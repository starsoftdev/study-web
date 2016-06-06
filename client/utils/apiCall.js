import { bind } from 'redux-effects'
import selectn from 'selectn'

import { fetch } from '../effects/fetch'
import userSettings from './userSettings'

import { ActionTypes } from 'ActionTypes'

export default function apiCall (path, options, cb) {
  let method, headers, body
  const accessToken = userSettings.getAccessToken()

  if (!cb) {
    cb = options
  } else {
    ({ method, body } = options)
  }

  headers = {
    'Accept': 'application/json'
  }

  if (accessToken) {
    headers['Authorization'] = accessToken
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
      headers,
      body
    }),
    res => (dispatch, getState) => {
      if (res.status === 200) {
        cb(null, res.data)
      } else if (res.status === 204) {
        cb(null)
      } else if (res.status === 401) {
        // Recognize when the user is authenticating and failed, and when the
        // session expired.
        if (getState().authorization.authorizing) {
          dispatch({
            type: ActionTypes.LOGIN,
            status: 'failed',
            err: res.data.error
          })
        } else {
          dispatch({ type: ActionTypes.EXPIRE_SESSION })
        }
        cb(selectn('error.message', res.data))
      } else {
        cb({ status: res.status, data: res.data })
      }
    },
    err => {
      cb(err)
    }
  )
}
