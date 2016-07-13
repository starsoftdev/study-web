import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchUsers (currentUser, searchParams) {
  return asyncAction(ActionTypes.FETCH_USERS, (cb, dispatch, getState) => {
    searchParams = JSON.parse(JSON.stringify(searchParams))
    searchParams.filter = '{"include":"user"}'
    dispatch(searchEntities('/clients/' + currentUser.userInfo.roleForClient.client_id + '/roles', searchParams, cb))
  })
}
