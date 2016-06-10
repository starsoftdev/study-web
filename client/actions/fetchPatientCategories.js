import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function fetchPatientCategories (searchParams) {
  return asyncAction(ActionTypes.FETCH_PATIENT_CATEGORIES, (cb, dispatch, getState) => {
    dispatch(searchEntities('/patientCategories', searchParams, cb))
  })
}
