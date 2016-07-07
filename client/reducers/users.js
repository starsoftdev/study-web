import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function users (state=[], action) {
  let userData = null
  let foundUserIndex = -1

  if (action.userData) {
    userData = action.userData
    foundUserIndex = _.findIndex(state, { id: userData.id })
  }

  switch (action.type) {
    case ActionTypes.CLEAR_USERS:
      return []
    case ActionTypes.FETCH_USERS:
      if (action.status === 'succeeded') {
        return action.payload
      } else {
        return []
      }
    case ActionTypes.FINISH_SAVE_USER:
      if (foundUserIndex < 0) {
        state.push(userData)
      } else {
        state[foundUserIndex] = userData
      }
      return state
    case ActionTypes.FINISH_DELETE_USER:
      if (foundUserIndex > -1) {
        state.splice(foundUserIndex, 1)
      }
  }

  return state
}
