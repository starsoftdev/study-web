import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function sources (state=[], action) {
  switch (action.type) {
    case ActionTypes.FETCH_SOURCES:
      if (action.status === 'succeeded') {
        return action.payload
      }

      return state
  }

  return state
}
