import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchCards (customerId) {
  return asyncAction(ActionTypes.FETCH_CARDS, (cb, dispatch) => {
    dispatch(searchEntities('/clients/retrieve_cardsList/' + customerId, {}, cb))
  })
}
