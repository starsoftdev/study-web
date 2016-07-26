import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function fetchPatients (searchParams) {
  return asyncAction(ActionTypes.FETCH_PATIENTS, (cb, dispatch, getState) => {
    searchParams = JSON.parse(JSON.stringify(searchParams))
    searchParams.filter = '{"include": ["indication", "infoSource", {"studyPatientCategory": "patientCategory"}]}'
    dispatch(searchEntities('/patients', searchParams, cb))
  })
}
