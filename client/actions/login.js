import { ActionTypes } from 'ActionTypes'
import asyncAction from 'utils/asyncAction'
import apiCall from 'utils/apiCall'

function loginRequest (credentials, cb) {
  return apiCall('/users/login', { method: 'post', body: credentials }, cb)
}

function getCurrentUserInfo (authData, cb) {
  const queryString = encodeURIComponent('filter') + '=' +
    encodeURIComponent('{"include": {"relation":"roleForClient", "scope":{"include":"client"}}}') + '&access_token=' + authData.id
  return apiCall('/users/' + authData.userId + '?' + queryString, { method: 'get' }, cb)
}

export default function login (credentials) {
  return asyncAction(ActionTypes.LOGIN, (cb, dispatch, getState) => {
    dispatch(loginRequest(credentials, (error, authData) => {
      if (error) {
        return cb(error)
      }
      dispatch(getCurrentUserInfo(authData, (err, userInfo) => {
        if (err) {
          return cb(err)
        }
        authData.userInfo = userInfo
        cb(null, {
          ...authData,
          lastRefresh: new Date().valueOf()
        })
      }))
    }))
  })
}
