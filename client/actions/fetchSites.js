import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function fetchSites (searchParams) {
  return asyncAction(ActionTypes.FETCH_SITES, (cb, dispatch, getState) => {
    dispatch(searchEntities('/sites', searchParams, cb))
  })
}
