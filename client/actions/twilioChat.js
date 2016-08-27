import { ActionTypes } from 'ActionTypes'
import asyncAction from 'utils/asyncAction'

export function joinTwilioChat (socket, chatParams, next) {
  return asyncAction(ActionTypes.JOIN_TWILIO_CHAT, (cb, dispatch, getState) => {
    const state = getState()
    const user = state.authorization.authData

    dispatch(() => {
      if (socket) {
        socket.emit('joinTwilioChat', chatParams, (err, data) => {
          next(err, data, cb)
        })
      }
    })
  })
}

export function leaveTwilioChat (socket, chatParams, next) {
  return asyncAction(ActionTypes.LEAVE_TWILIO_CHAT, (cb, dispatch, getState) => {
    dispatch(() => {
      if (socket) {
        socket.emit('leaveTwilioChat', chatParams, (err, data) => {
          next(err, data, cb)
        })
      }
    })
  })
}
