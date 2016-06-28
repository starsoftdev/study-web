import { ActionTypes } from 'ActionTypes'

export default function users (state=[], action) {
  switch (action.type) {
    case ActionTypes.CLEAR_USERS:
      return []
    case ActionTypes.FETCH_USERS:
      if (action.status === 'succeeded') {
        return action.payload
      } else {
        return []
      }
  }

  return state
}
