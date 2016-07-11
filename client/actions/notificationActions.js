import { ActionTypes } from 'ActionTypes'
import asyncAction from 'utils/asyncAction'

export function subscribe (socket, event, params, next) {
  return asyncAction(ActionTypes.SUBSCRIBE_REQUEST, (cb, dispatch, getState) => {
    const state = getState()
    const user = state.authorization.authData

    dispatch(() => {
      socket.emit('subscribe', { user, event, params }, (err, data) => {
        next(err, data, cb)
      })
    })
  })
}

export function unsubscribe (socket, params, next) {
  return asyncAction(ActionTypes.UNSUBSCRIBE_REQUEST, (cb, dispatch, getState) => {
    dispatch(() => {
      if (socket) {
        socket.emit('unsubscribeFromAll', { params }, (err, data) => {
          next(err, data, cb)
        })
      }
    })
  })
}

export function unsubscribeCurrent (socket, event, params, next) {
  return asyncAction(ActionTypes.UNSUBSCRIBE_REQUEST, (cb, dispatch, getState) => {
    dispatch(() => {
      socket.emit('unsubscribeCurrent', { event, params }, (err, data) => {
        next(err, data, cb)
      })
    })
  })
}

export function resetNotification () {
  return {
    type: ActionTypes.RECEIVE_MESSAGE,
    payload: Object.assign({}, {
      event: '',
      event_params: '',
      entity_ref: null
    })
  }
}

export function displayNotification (notification) {
  return {
    type: ActionTypes.RECEIVE_MESSAGE,
    payload: Object.assign({}, {
      event: notification.event,
      event_params: notification.event_params,
      entity_ref: notification.entity_ref
    })
  }
}
