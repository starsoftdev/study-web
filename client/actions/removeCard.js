import { ActionTypes } from 'ActionTypes'
import { deleteEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function removeCard (customerId, id) {
  const actionType = ActionTypes.DELETE_CARD

  return asyncAction(actionType, { id }, (cb, dispatch) => {

    function afterDelete (err, payload) {
      cb(err, payload)
      const result = {
        id,
      }

      dispatch({
        type: ActionTypes.FINISH_DELETE_CARD,
        cardData: result
      })
    }

    dispatch(deleteEntity('/clients/stripe_customer/' + customerId + '/remove_card/' + id, null, afterDelete))
  })
}
