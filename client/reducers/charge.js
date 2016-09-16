import { ActionTypes } from 'ActionTypes'

export default function charge (state=null, action) {
  if (action.type === ActionTypes.CHECKOUT_CREDITS) {
    switch (action.status) {
      case 'started':
        return state
      case 'succeeded':
        return action.payload
    }
    return state
  } else {
    return state
  }
}
