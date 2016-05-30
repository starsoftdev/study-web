import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const creatingPatient = asyncActionIsFetching(ActionTypes.CREATE_PATIENT)
const updatingPatient = asyncActionIsFetching(ActionTypes.UPDATE_PATIENT)

export default function savingContact (state = false, action) {
  state = creatingPatient(state, action)
  state = updatingPatient(state, action)
  return state
}
