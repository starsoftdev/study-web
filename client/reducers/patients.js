import { ActionTypes } from 'ActionTypes'

export default function patients (state=[], action) {
  switch (action.type) {
    case ActionTypes.FETCH_PATIENTS:
      if (action.status === 'succeeded') {
        return action.payload
      }
      return state
  }

  return state
}
