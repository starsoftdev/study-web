import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchIndications (searchParams) {
  return asyncAction(ActionTypes.FETCH_INDICATIONS, (cb, dispatch, getState) => {
    dispatch(searchEntities('/indications', searchParams, cb))
  })
}
