import { ActionTypes } from 'ActionTypes'
import asyncAction from 'utils/asyncAction'

export default function saveTwilioMessage (socket, messageData, next) {
  return asyncAction(ActionTypes.SAVE_TWILIO_MESSAGE, (cb, dispatch, getState) => {
    function afterSave (err, payload) {
      if (!err) {
        dispatch({
          type: ActionTypes.FINISH_SAVE_TWILIO_MESSAGE,
          payload
        })
      }
      next(err, payload, cb)
    }

    dispatch(() => {
      if (socket) {
        socket.emit('saveTwilioTextMessages', messageData, afterSave)
      }
    })
  })
}
