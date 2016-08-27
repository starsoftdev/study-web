import { ActionTypes } from 'ActionTypes'

const initialState = {
  active: false,
  data: {}
}

export default function activeChat (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UNSET_ACTIVE_CHAT:
      return initialState
    case ActionTypes.SET_ACTIVE_CHAT:
      if (action.payload.data) {
        return Object.assign({}, state, { active: true }, action.payload)
      }
      return state
  }

  return state
}
