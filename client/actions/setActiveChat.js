import { ActionTypes } from 'ActionTypes'
import asyncAction from 'utils/asyncAction'

export default function setActiveChat (socket, searchParams, next) {
  return asyncAction(ActionTypes.FETCH_TWILIO_MESSAGES, (cb, dispatch, getState) => {
    function afterSave (err, payload) {
      next(err, payload, cb)
      if (!err) {
        dispatch({
          type: ActionTypes.SET_ACTIVE_CHAT,
          payload: { data: searchParams }
        })
      }
    }

    dispatch(() => {
      if (socket) {
        socket.emit('getStudyPatientMessages', searchParams, afterSave)
      }
    })
  })
}
