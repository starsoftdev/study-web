import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function fetchPatientsByStudy (studyId, searchParams) {
  return asyncAction(ActionTypes.FETCH_PATIENTS_BY_STUDY, (cb, dispatch, getState) => {
    dispatch(searchEntities(`/studies/${studyId}/getPatients`, searchParams, cb))
  })
}
