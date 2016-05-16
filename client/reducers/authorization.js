import { ActionTypes } from 'ActionTypes'

const initialState = {
  authorizing: false,
  authorized: false,
  authData: null
}

export default function authorization (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_AUTH_DATA:
      return {
        authorizing: false,
        authorized: !!action.authData,
        authData: action.authData
      }
    case ActionTypes.LOGIN:
      if (action.status === 'started') {
        return {
          authorized: false,
          authorizing: true,
          authData: null,
        }
      } else if (action.status === 'succeeded') {
        return {
          authorized: true,
          authorizing: false,
          authData: action.payload
        }
      } else if (action.status === 'failed') {
        return {
          authorized: false,
          authorizing: false,
          authData: null,
          error: action.err
        }
      }

      return state
    case ActionTypes.EXPIRE_SESSION:
      return {
        authorized: false,
        authorizing: false,
        authData: null,
        error: state.authorized ? 'Your session has expired, please log in again' : null
      }

    case ActionTypes.LOGOUT:
      return {
        authorized: false,
        authorizing: false,
        authData: null,
      }
    default:
      return state
  }

  return state
}
