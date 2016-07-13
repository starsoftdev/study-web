import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function sites (state=[], action) {
  switch (action.type) {
    case ActionTypes.CLEAR_SITES:
      return []
    case ActionTypes.FETCH_SITES:
      if (action.status === 'succeeded') {
        return action.payload
      }

      return state
    case ActionTypes.FINISH_SAVE_SITE:
      const siteData = action.siteData
      const foundSiteIndex = _.findIndex(state, { id: siteData.id })
      let newState = _.map(state, _.clone)
      if (foundSiteIndex < 0) {
        newState.push(siteData)
      } else {
        newState[foundSiteIndex] = siteData
      }

      return newState
  }

  return state
}
