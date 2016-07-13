import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchUser (id) {
  return asyncAction(ActionTypes.FETCH_USER, (cb, dispatch) => {
    const searchParams = { filter: '{"include":"roleForClient"}' }
    dispatch(searchEntities('/users/' + id, searchParams, cb))
  })
}
