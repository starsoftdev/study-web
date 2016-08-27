import { ActionTypes } from 'ActionTypes'
import asyncAction from 'utils/asyncAction'

export default function saveTwilioMessage (socket, messageData, next) {
  return asyncAction(ActionTypes.SAVE_TWILIO_MESSAGE, (cb, dispatch, getState) => {
    dispatch(() => {
      if (socket) {
        socket.emit('saveTwilioTextMessages', messageData, (err, data) => {
          next(err, data, cb)
        })
      }
    })
  })
}
