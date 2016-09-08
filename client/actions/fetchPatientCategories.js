import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchPatientCategories (searchParams) {
  return asyncAction(ActionTypes.FETCH_PATIENT_CATEGORIES, (cb, dispatch, getState) => {
    dispatch(searchEntities('/patientCategories', searchParams, cb))
  })
}
