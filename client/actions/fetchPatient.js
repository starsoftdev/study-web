import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchPatient (id) {
  return asyncAction(ActionTypes.FETCH_PATIENT, (cb, dispatch) => {
    const searchParams = { filter: '{"include": ["indication", "infoSource", {"studyPatientCategory": "patientCategory"}]}' }
    dispatch(searchEntities('/patients/' + id, searchParams, cb))
  })
}
