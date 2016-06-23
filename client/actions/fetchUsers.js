import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function fetchUsers (searchParams) {
  return asyncAction(ActionTypes.FETCH_USERS, (cb, dispatch, getState) => {
    dispatch(searchEntities('/users', searchParams, cb))
  })
}
