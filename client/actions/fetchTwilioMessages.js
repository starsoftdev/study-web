import { ActionTypes } from 'ActionTypes'
import asyncAction from 'utils/asyncAction'

export default function fetchTwilioMessages (socket, searchParams, next) {
  return asyncAction(ActionTypes.FETCH_TWILIO_MESSAGES, (cb, dispatch, getState) => {
    function afterSave (err, payload) {
      next(err, payload, cb)
    }

    dispatch(() => {
      if (socket) {
        socket.emit('getStudyPatientMessages', searchParams, afterSave)
      }
    })
  })
}
