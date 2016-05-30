import { ActionTypes } from 'ActionTypes'

export default function currentStudy (state=null, action) {
  if (action.type === ActionTypes.FETCH_STUDY) {
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
