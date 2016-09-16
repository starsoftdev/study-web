import { ActionTypes } from 'ActionTypes'

export default function cards (state=null, action) {
  if (action.type === ActionTypes.FETCH_CARDS) {
    switch (action.status) {
      case 'started':
        return (state) ? state : null
      case 'succeeded':
        return action.payload
    }
    return state
  } else {
    return state
  }
}
