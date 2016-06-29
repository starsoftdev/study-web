import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchSite (id) {
  return asyncAction(ActionTypes.FETCH_SITE, (cb, dispatch) => {
    dispatch(searchEntities('/sites/' + id, {}, cb))
  })
}
