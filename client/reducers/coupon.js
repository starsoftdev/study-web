import { ActionTypes } from 'ActionTypes'

export default function coupon (state=null, action) {
  if (action.type === ActionTypes.FETCH_COUPON) {
    switch (action.status) {
      case 'started':
        return (state && state.id === action.id) ? state : null
      case 'succeeded':
        return action.payload
    }
    return state
  } else if (action.type === ActionTypes.CLEAR_COUPON) {
    return null
  } else {
    return state
  }
}
