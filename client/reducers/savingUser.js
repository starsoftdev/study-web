import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const creatingUser = asyncActionIsFetching(ActionTypes.CREATE_USER)
const updatingUser = asyncActionIsFetching(ActionTypes.UPDATE_USER)

export default function savingUser (state = false, action) {
  state = creatingUser(state, action)
  state = updatingUser(state, action)
  return state
}
