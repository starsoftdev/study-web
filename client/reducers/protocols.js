import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const initialState = {
  isFetching: true,
  protocols: [],
}

export default function (state = initialState, action) {
  const statusFunc = asyncActionIsFetching(ActionTypes.FETCH_PROTOCOLS)

  switch (action.type) {
    case ActionTypes.FETCH_PROTOCOLS:
      if (action.status === 'succeeded') {
        return {
          isFetching: false,
          protocols: action.payload.protocols || []
        }
      }
      return {
        ...state,
        isFetching: statusFunc(state, action),
      }
  }

  return state
}
