import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function users (state=[], action) {
  const userData = action.userData
  let foundUserIndex = -1
  let newState = _.map(state, _.cloneDeep)

  switch (action.type) {
    case ActionTypes.CLEAR_USERS:
      return []
    case ActionTypes.FETCH_USERS:
      if (action.status === 'succeeded') {
        return action.payload
      }

      return state
    case ActionTypes.FINISH_SAVE_USER:
      foundUserIndex = _.findIndex(state, { id: userData.userResultData.id })
      if (userData.operation === 'delete') {
        newState.splice(foundUserIndex, 1)
      } else if (userData.operation === 'save') {
        if (foundUserIndex < 0) {
          newState.push(userData.userResultData)
        } else {
          newState[foundUserIndex] = userData.userResultData
        }
      }

      return newState
    case ActionTypes.FINISH_DELETE_USER:
      foundUserIndex = _.findIndex(state, { id: userData.clientRoleId })
      if (foundUserIndex > -1) {
        newState.splice(foundUserIndex, 1)
      }

      return newState
  }

  return state
}
