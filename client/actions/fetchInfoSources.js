import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchInfoSources (searchParams) {
  return asyncAction(ActionTypes.FETCH_INFO_SOURCES, (cb, dispatch) => {
    dispatch(searchEntities('/infoSources', searchParams, cb))
  })
}
