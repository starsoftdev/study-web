import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchSites (currentUser, searchParams) {
  return asyncAction(ActionTypes.FETCH_SITES, (cb, dispatch, getState) => {
    searchParams = JSON.parse(JSON.stringify(searchParams))
    searchParams.filter = '{"include":"users"}'
    dispatch(searchEntities('/clients/' + currentUser.userInfo.roleForClient.client_id + '/sites', searchParams, cb))
  })
}
