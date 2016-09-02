import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function fetchStudyCategories () {
  return asyncAction(ActionTypes.FETCH_STUDY_CATEGORIES, (cb, dispatch, getState) => {
    dispatch(searchEntities('/indications', {}, cb))
  })
}
