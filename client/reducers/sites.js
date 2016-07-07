import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function sites (state=[], action) {
  switch (action.type) {
    case ActionTypes.CLEAR_SITES:
      return []
    case ActionTypes.FETCH_SITES:
      if (action.status === 'succeeded') {
        return action.payload
      } else {
        return [ { id: 1000, name: 'Palmer Tech', principalInvestigator: 'Richard Hendriks', phone: '(111)111-1111', address: '123 Star City', assignedUsers: [ { name: 'AssignedUser1' }, { name: 'AssignedUser2' } ] },
          { id: 1001, name: 'Wayne Enterprise', principalInvestigator: 'James Gordon', phone: '(888)888-8888', address: '123 Gotham City', assignedUsers: [ { name: 'AssignedUser3' }, { name: 'AssignedUser4' } ] } ]
      }
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
