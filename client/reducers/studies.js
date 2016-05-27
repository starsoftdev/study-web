import { ActionTypes } from 'ActionTypes'

export default function studies (state=[], action) {
  switch (action.type) {
    case ActionTypes.FETCH_STUDIES:
      if (action.status === 'succeeded') {
        return action.payload
      }
      return state
  }

  return state
}
