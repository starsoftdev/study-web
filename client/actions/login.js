import { ActionTypes } from 'ActionTypes'
import asyncAction from 'utils/asyncAction'
import apiCall from 'utils/apiCall'

function loginRequest (credentials, cb) {
  return apiCall('/auth/login', { method: 'post', body: credentials }, cb)
}

export default function login (credentials) {
  return asyncAction(ActionTypes.LOGIN, (cb, dispatch, getState) => {
    dispatch(loginRequest(credentials, (error, authData) => {
      if (error) {
        cb(error)
      }
      else {
        cb(null, {
          ...authData,
          lastRefresh: new Date().valueOf()
        })
      }
    }))
  })
}
