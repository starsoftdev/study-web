import { ActionTypes } from 'ActionTypes'

const initialState = {
  avail: []
}

export default function fetchingAvailNumbers (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_AVAIL_NUMBERS':
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
