import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const creatingPatient = asyncActionIsFetching(ActionTypes.CREATE_PATIENT)
const updatingPatient = asyncActionIsFetching(ActionTypes.UPDATE_PATIENT)

export default function savingPatient (state = false, action) {
  const newState = creatingPatient(state, action) || updatingPatient(state, action)

  return newState
}
