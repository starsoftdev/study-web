import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function saveTwilioMessage (messageData, next) {
  return asyncAction(ActionTypes.SAVE_TWILIO_MESSAGE, (cb, dispatch, getState) => {
    function afterSave (err, payload) {
      cb(err, payload)
      if (!err) {
        dispatch({
          type: ActionTypes.FINISH_SAVE_TWILIO_MESSAGE,
          payload
        })
      }
      next(err, payload)
    }

    dispatch(createEntity('/twilioTextMessages', messageData, afterSave))
  })
}
