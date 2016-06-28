import { ActionTypes } from 'ActionTypes'

export default function sites (state=[], action) {
  switch (action.type) {
    case ActionTypes.CLEAR_SITES:
      return []
    case ActionTypes.FETCH_SITES:
      if (action.status === 'succeeded') {
        return action.payload
      }

      return [ { id: 1000, name: 'Palmer Tech', principalInvestigator: 'Richard Hendriks', phone: '(111)111-1111', address: '123 Star City', assignedUsers: [ { name: 'AssignedUser1' }, { name: 'AssignedUser2' } ] },
        { id: 1001, name: 'Wayne Enterprise', principalInvestigator: 'James Gordon', phone: '(888)888-8888', address: '123 Gotham City', assignedUsers: [ { name: 'AssignedUser3' }, { name: 'AssignedUser4' } ] } ]
      //return state
  }

  return state
}
