import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function fetchSiteLocations () {
  return asyncAction(ActionTypes.FETCH_SITE_LOCATIONS, (cb, dispatch, getState) => {
    dispatch(searchEntities('/studies/siteLocations', {}, cb))
  })
}
