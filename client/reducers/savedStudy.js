import { ActionTypes } from 'ActionTypes'

export default function savedStudy (state=[], action) {
  switch (action.type) {
    case ActionTypes.SUBMIT_LIST_STUDY:
      if (action.status === 'succeeded') {
        return action.payload
      }
      return state
  }

  return state
}
