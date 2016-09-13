import { ActionTypes } from 'ActionTypes'

export default function credits (state=null, action) {
  if (action.type === ActionTypes.FETCH_CREDITS) {
    switch (action.status) {
      case 'started':
        return (state && state.id === action.id) ? state : null
      case 'succeeded':
        return action.payload
    }
    return state
  } else {
    return state
  }
}
