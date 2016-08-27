import { ActionTypes } from 'ActionTypes'

const initialState = {
  event: '',
  event_params: '',
  entity_ref: null
}

export default function notification (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
