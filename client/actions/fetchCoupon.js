import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchCoupon (id) {
  return asyncAction(ActionTypes.FETCH_COUPON, (cb, dispatch) => {
    dispatch(searchEntities('/users/retrieveCoupon/' + id, {}, cb))
  })
}
