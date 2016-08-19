import { ActionTypes } from 'ActionTypes'

const initialState = {}

export default function socket (state = initialState, action) {
  switch (action.type) {
    case 'SET_SOCKET':
      return action.payload
    default:
      return state
  }
}
