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

    dispatch(updateEntity(`/user_notifications/${notificationId}`, postData, afterSave))
  })
}

export function notificationArrived (notification) {
	return dispatch => {
		dispatch ({
			type: ActionTypes.NOTIFICATION_ARRIVED,
			data: notification
		})
	}
}
