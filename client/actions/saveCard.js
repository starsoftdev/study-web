import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity } from 'utils/entityReadWrite'
import _ from 'lodash'
import asyncAction from 'utils/asyncAction'

export default function saveCard (customerId, cardData) {
  const actionType = cardData.id ? ActionTypes.UPDATE_CARD : ActionTypes.CREATE_CARD

  return asyncAction(actionType, { customerId, cardData }, (cb, dispatch) => {

    function afterSave (err, payload) {
      cb(err, payload)
      dispatch({
        type: ActionTypes.FINISH_SAVE_CARD,
        cardData: payload,
      })
    }

    dispatch(createEntity('/clients/stripe_customer/' + customerId + '/save_card', cardData, afterSave))
  })
}
