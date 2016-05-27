import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function fetchStudies (searchParams) {
  return asyncAction(ActionTypes.FETCH_STUDIES, (cb, dispatch, getState) => {
    dispatch(searchEntities('/studies', searchParams, cb))
  })
}
