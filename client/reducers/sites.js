import { ActionTypes } from 'ActionTypes'

export default function sites (state=[], action) {
  switch (action.type) {
    case ActionTypes.CLEAR_SITES:
      return []
    case ActionTypes.FETCH_SITES:
      if (action.status === 'succeeded') {
        return action.payload
      }
      return state
  }

  return state
}
