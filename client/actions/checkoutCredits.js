import { ActionTypes } from 'ActionTypes'
import { createEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function checkoutCredits (customerId, cardId, totalAmount) {
  return asyncAction(ActionTypes.CHECKOUT_CREDITS, { cardId, totalAmount }, (cb, dispatch) => {
    dispatch(createEntity('/clients/stripe_customer/' + customerId + '/checkout_credits', { cardId, totalAmount }, cb))
  })
}
