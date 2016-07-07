import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const removingUser = asyncActionIsFetching(ActionTypes.DELETE_USER)

export default function removingUser (state = false, action) {
  state = removingUser(state, action)
  return state
}
