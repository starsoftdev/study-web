import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'
import _ from 'lodash'

const initialState = {
  isFetchingNotifications: true,
  notifications: [],
  unreadNotificationsCount: 0
}

export default function (state = initialState, action) {
  const statusFunc = asyncActionIsFetching(ActionTypes.FETCH_NOTIFICATIONS)

  switch (action.type) {
    case ActionTypes.FETCH_NOTIFICATIONS:
      if (action.status === 'succeeded') {
        const newNotifications = _
          .chain(state.notifications)
          .concat(action.payload.notifications)
          .uniqBy('id')
          .orderBy([ 'notification.created_date' ], [ 'desc' ])
          .value()

        return {
          ...state,
          isFetchingNotifications: false,
          notifications: newNotifications,
        }
      }
      return {
        ...state,
        isFetchingNotifications: statusFunc(state, action),
      }

    case ActionTypes.FETCH_UNREAD_NOTIFICATIONS_COUNT:
      if (action.status === 'succeeded') {
        return {
          ...state,
          unreadNotificationsCount: action.payload.count,
        }
      }
      return state

    case ActionTypes.SET_NOTIFICATION_AS_READ:
      // DISCUSS: are we updating UI instantly or after successful response?

      const { notifications } = state
      let { unreadNotificationsCount } = state
      const targetNotification = _.find(notifications, { id: action.data.notificationId, read: false })

      if (targetNotification) {
        targetNotification.read = true
        unreadNotificationsCount--
      }

      return {
        ...state,
        notifications,
        unreadNotificationsCount
      }

    case ActionTypes.NOTIFICATION_ARRIVED:
      return {
        ...state,
        notifications: [ action.data, ...state.notifications ],
        unreadNotificationsCount: state.unreadNotificationsCount + 1,
      }
  }

  return state
}
