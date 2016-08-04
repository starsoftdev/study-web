import { ActionTypes } from 'ActionTypes'

const initialState = {
  active: false,
  data: {}
}

export default function activeBlastForm (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UNSET_ACTIVE_BLAST_FORM:
      return initialState
    case ActionTypes.SET_ACTIVE_BLAST_FORM:
      if (action.payload.data) {
        return Object.assign({}, state, { active: true }, action.payload)
      }
      return state
  }

  return state
}
