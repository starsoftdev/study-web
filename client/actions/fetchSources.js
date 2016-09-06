import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchSources (searchParams) {
  return asyncAction(ActionTypes.FETCH_SOURCES, (cb, dispatch) => {
    dispatch(searchEntities('/sources', searchParams, cb))
  })
}
