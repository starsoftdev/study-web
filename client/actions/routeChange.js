import { ActionTypes } from 'ActionTypes'

export default function routeChange (routerState) {
  return {
    type: ActionTypes.ROUTE_CHANGED,
    routerState
  }
}
