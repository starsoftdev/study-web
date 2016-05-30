import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchStudy (id) {
  return asyncAction(ActionTypes.FETCH_STUDY, (cb, dispatch) => {
    dispatch(searchEntities('/studies/' + id, {}, cb))
  })
}
