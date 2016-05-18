import { ActionTypes } from 'ActionTypes'

export default function location (state={ query: {} }, action) {
  if (action.type === ActionTypes.ROUTE_CHANGED) {
    let routerLocation = action.routerState.location
    // avoid undefined query checks throughout the app
    routerLocation.query = routerLocation.query || {}
    return routerLocation
  }
  else {
    return state
  }
}
