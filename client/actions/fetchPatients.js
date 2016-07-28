import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchPatients (searchParams) {
  return asyncAction(ActionTypes.FETCH_PATIENTS, (cb, dispatch) => {
    searchParams.filter = '{"include": ["indication", "infoSource", {"studyPatientCategory": "patientCategory"}]}'
    dispatch(searchEntities('/patients', searchParams, cb))
  })
}
