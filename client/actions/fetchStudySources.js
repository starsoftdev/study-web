import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchStudySources (id) {
  return asyncAction(ActionTypes.FETCH_STUDY_SOURCES, (cb, dispatch) => {
    dispatch(searchEntities('/studies/' + id + '/getStudySources', {}, cb))
  })
}
