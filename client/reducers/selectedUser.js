import { ActionTypes } from 'ActionTypes'

export default function selectedUser (state=null, action) {
  if (action.type === ActionTypes.FETCH_USER) {
    switch (action.status) {
      case 'started':
        return (state && state.id === action.id) ? state : null
      case 'succeeded':
        return action.payload
    }
    return state
  } else if (action.type === ActionTypes.CLEAR_SELECTED_USER) {
    return null
  } else {
    return state
  }
}
