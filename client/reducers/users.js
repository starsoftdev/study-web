import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function clientRoles (state=[], action) {
  const userData = action.userData
  let foundAdminIndex = -1
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
      foundAdminIndex = _.findIndex(newState, adminIterator => {
        return (adminIterator.user.id === userData.userResultData.user.id)
      })
      if (userData.userType === 'admin') {
        if (foundAdminIndex < 0) {
          newState.push(userData.userResultData)
        } else {
          newState[foundAdminIndex] = userData.userResultData
        }
      } else if (userData.userType === 'nonAdmin') {
        if (foundAdminIndex > -1) {
          newState.splice(foundAdminIndex, 1)
        }
      }

      return newState
    case ActionTypes.FINISH_DELETE_CLIENT_ROLE:
      foundAdminIndex = _.findIndex(newState, { id: userData.clientRoleId })
      if (foundAdminIndex > -1) {
        newState.splice(foundAdminIndex, 1)
      }

      return newState
  }

  return state
}
