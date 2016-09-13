import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchCoupon (id) {
  return asyncAction(ActionTypes.FETCH_COUPON, (cb, dispatch) => {
    const encodedCouponId = encodeURIComponent(id)
    dispatch(searchEntities('/clients/retrieveCoupon/' + encodedCouponId, {}, cb))
  })
}
