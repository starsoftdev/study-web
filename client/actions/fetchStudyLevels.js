import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function fetchStudyLevels () {
  return asyncAction(ActionTypes.FETCH_STUDY_LEVELS, (cb, dispatch, getState) => {
    dispatch(searchEntities('/studyLevels', {}, cb))
  })
}
