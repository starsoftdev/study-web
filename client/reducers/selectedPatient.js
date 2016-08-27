import { ActionTypes } from 'ActionTypes'

export default function selectedPatient (state=null, action) {
  if (action.type === ActionTypes.FETCH_PATIENT) {
    switch (action.status) {
      case 'started':
        return (state && state.id === action.id) ? state : null
      case 'succeeded':
        return action.payload
    }
    return state
  } else if (action.type === ActionTypes.CLEAR_SELECTED_PATIENT ||
    action.type === ActionTypes.FINISH_SAVE_PATIENT) {
    return null
  } else {
    return state
  }
}
