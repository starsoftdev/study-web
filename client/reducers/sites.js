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
      if (foundSiteIndex < 0) {
        state.push(siteData)
      } else {
        state[foundSiteIndex] = siteData
      }

      return state
  }

  return state
}
