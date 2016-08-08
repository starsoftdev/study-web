import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

export default asyncActionIsFetching(ActionTypes.DELETE_CLIENT_ROLE)
