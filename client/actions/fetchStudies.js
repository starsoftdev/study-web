import { ActionTypes } from 'ActionTypes'
import { createEntity } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function fetchStudies (searchParams) {
  return asyncAction(ActionTypes.FETCH_STUDIES, (cb, dispatch) => {
    dispatch(createEntity('/studies/search', searchParams, cb))
  })
}
