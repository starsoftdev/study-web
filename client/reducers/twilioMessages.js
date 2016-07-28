import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const initialState = {
  isFetching: false,
  messages: []
}

export default function twilioMessages (state = initialState, action) {
  const statusFunc = asyncActionIsFetching(ActionTypes.FETCH_TWILIO_MESSAGES)

  switch (action.type) {
    case ActionTypes.FETCH_TWILIO_MESSAGES:
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
