import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchCoupon (id) {
  return asyncAction(ActionTypes.FETCH_COUPON, (cb, dispatch) => {
    const searchParams = { couponId: id }
    dispatch(searchEntities('/users/retrieveCoupon', searchParams, cb))
  })
}
