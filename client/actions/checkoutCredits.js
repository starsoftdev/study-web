import { ActionTypes } from 'ActionTypes'
import { createEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function checkoutCredits (customerId, cardId, totalAmount) {
  return asyncAction(ActionTypes.CHECKOUT_CREDITS, { cardId, totalAmount }, (cb, dispatch) => {
    dispatch(createEntity('/clients/checkout_credits/' + customerId, { cardId, totalAmount }, cb))
  })
}
