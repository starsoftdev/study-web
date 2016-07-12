import { ActionTypes } from 'ActionTypes'

export default function selectedSite (state=null, action) {
  if (action.type === ActionTypes.FETCH_SITE) {
    switch (action.status) {
      case 'started':
        return (state && state.id === action.id) ? state : null
      case 'succeeded':
        return action.payload
    }
    return state
  } else if (action.type === ActionTypes.CLEAR_SELECTED_SITE || action.type === ActionTypes.FINISH_SAVE_SITE) {
    return null
  } else {
    return state
  }
}
