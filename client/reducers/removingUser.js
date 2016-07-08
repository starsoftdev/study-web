import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const removingUserStatus = asyncActionIsFetching(ActionTypes.DELETE_USER)

export default function removingUser (state = false, action) {
  state = removingUserStatus(state, action)
  return state
}
