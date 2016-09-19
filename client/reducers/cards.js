import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function cards (state=null, action) {
  let newState = _.cloneDeep(state)
  if (action.type === ActionTypes.FETCH_CARDS) {
    switch (action.status) {
      case 'started':
        return (state) ? state : null
      case 'succeeded':
        return action.payload
    }
    return state
  } else if (action.type === ActionTypes.FINISH_SAVE_CARD) {
    if (action.cardData) {
      newState.data.push(action.cardData)
    }

    return newState
  } else {
    return state
  }
}
