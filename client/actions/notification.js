import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { searchEntities, updateEntity } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export function fetchNotifications (userId, searchParams) {
  return asyncAction(ActionTypes.FETCH_NOTIFICATIONS, (cb, dispatch, getState) => {
    dispatch(searchEntities(`/users/${userId}/notifications`, searchParams, cb))
  })
}

export function fetchUnreadNotificationsCount (userId) {
  return asyncAction(ActionTypes.FETCH_UNREAD_NOTIFICATIONS_COUNT, (cb, dispatch, getState) => {
    dispatch(searchEntities(`/users/${userId}/unreadNotificationsCount`, {}, cb))
  })
}

export function setNotificationAsRead (notificationId) {
  return asyncAction(ActionTypes.SET_NOTIFICATION_AS_READ, { notificationId }, (cb, dispatch, getState) => {

    function afterSave (err, payload) {
      cb(err, payload)
      if (!err) {
        // const { location } = getState()

        // if (location.pathname !== `/patients/${payload.id}`) {
        //   history.push({ pathname: `/patients/${payload.id}`, query: location.query })
        // }
        // history.push({ pathname: 'thankyou' })
      }
    }

    const postData = {
      read: true
    }

    dispatch(updateEntity(`/userNotifications/${notificationId}`, postData, afterSave))
  })
}

/*
** seems to be a duplicate of RECEIVE_MESSAGE

export function notificationArrived (notification) {
  return dispatch => {
    dispatch ({
      type: ActionTypes.NOTIFICATION_ARRIVED,
      data: notification
    })
  }
}
*/

export function fetchPatientSignUps () {
  return asyncAction(ActionTypes.FETCH_PATIENT_SIGN_UPS, (cb, dispatch, getState) => {
    dispatch(searchEntities('/patients/signUps', {}, cb))
  })
}

export function fetchPatientMessages () {
  return asyncAction(ActionTypes.FETCH_PATIENT_MESSAGES, (cb, dispatch, getState) => {
    dispatch(searchEntities('/patient/messages', {}, cb))
  })
}

export function fetchRewardsCount () {
  return asyncAction(ActionTypes.FETCH_REWARDS_COUNT, (cb, dispatch, getState) => {
    dispatch(searchEntities('/rewards', {}, cb))
  })
}


/**
  @Author: Dmitry
**/

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

export function unsubscribeFromAll (socket, params, next) {
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
