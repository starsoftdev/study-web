import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const initialState = {
  isFetching: false,
  avail: []
}

export default function availNumbers (state = initialState, action) {
  const statusFunc = asyncActionIsFetching(ActionTypes.FETCH_AVAIL_NUMBERS)

  switch (action.type) {
    case ActionTypes.FETCH_AVAIL_NUMBERS:
      if (action.status === 'succeeded') {
        return Object.assign({}, state, { isFetching: false }, action.payload)
      }
      return {
        ...state,
        isFetching: statusFunc(state, action)
      }
  }

  return state
}
