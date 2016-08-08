import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function sites (state=[], action) {
  let newState = _.map(state, _.cloneDeep)
  let foundSiteIndex = -1
  let foundUserIndex = -1
  const siteData = action.siteData
  const userData = action.userData

  switch (action.type) {
    case ActionTypes.CLEAR_SITES:
      return []
    case ActionTypes.FETCH_SITES:
      if (action.status === 'succeeded') {
        return action.payload
      }

      return state
    case ActionTypes.FINISH_SAVE_SITE:
      foundSiteIndex = _.findIndex(newState, { id: siteData.id })

      if (foundSiteIndex < 0) {
        newState.push(siteData)
      } else {
        newState[foundSiteIndex] = siteData
      }

      return newState
    case ActionTypes.FINISH_SAVE_USER:
      if (userData.userType === 'admin') {
        _.forEach(newState, site => {
          if (_.remove(site.users, { id: userData.userResultData.user.id }).length > 0) {
            return false
          }
        })
      } else if (userData.userType === 'nonAdmin') {
        _.forEach(newState, site => {
          foundUserIndex = _.findIndex(site.users, { id: userData.userResultData.user.id })
          if (foundUserIndex > -1) {
            site.users[foundUserIndex] = userData.userResultData.user
            return false
          }
        })
        if (foundUserIndex < 0) {
          foundSiteIndex = _.findIndex(newState, { id: userData.userResultData.siteId })
          if (foundSiteIndex > -1) {
            newState[foundSiteIndex].users.push(userData.userResultData.user)
          }
        }
      }
      return newState
    case ActionTypes.FINISH_DELETE_CLIENT_ROLE:

    case ActionTypes.FINISH_DELETE_USER:
      _.forEach(newState, site => {
        if (_.remove(site.users, { id: userData.userId }).length > 0) {
          return false
        }
      })
      return newState
  }

  return state
}
