import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchAvailNumbers (searchParams) {
  return asyncAction(ActionTypes.FETCH_AVAIL_NUMBERS, (cb, dispatch, getState) => {
    dispatch(searchEntities('/getAvailPhoneNumbers', searchParams, cb))
  })
}
