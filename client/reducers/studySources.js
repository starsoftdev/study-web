import { ActionTypes } from 'ActionTypes'

export default function studySources (state=[], action) {
  switch (action.type) {
    case ActionTypes.FETCH_STUDY_SOURCES:
      if (action.status === 'succeeded') {
        return action.payload
      }
      return state
  }

  return state
}
