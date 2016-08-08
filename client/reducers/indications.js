import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function indications (state=[], action) {
  switch (action.type) {
    case ActionTypes.FETCH_INDICATIONS:
      if (action.status === 'succeeded') {
        return action.payload
      }

      return state
  }

  return state
}
