import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'
import _ from 'lodash'

const initialState = {
  isFetchingNotifications: true,
  notifications: [],
  unreadNotificationsCount: 0,
  patientSignUps: {
    today: 0,
    yesterday: 0,
  },
  patientMessages: {
    unreadTexts: 0,
    unreadEmails: 0,
  },
  studyListings: {
    active: 0,
    inactive: 0,
  },
  rewards: {
    total: 0
  },
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
      const targetIndex = _.findIndex(notifications, { id: action.notificationId, read: false })

      if (targetIndex >= 0) {                         // creates a fresh notification with read=true so that it causes rerender on the notification item
        const newNotification = {
          ...notifications[targetIndex],
          read: true,
        }

        return {
          ...state,
          notifications: [ ...notifications.slice(0, targetIndex), newNotification, ...notifications.slice(targetIndex + 1) ],
          unreadNotificationsCount: state.unreadNotificationsCount - 1
        }
      }

      return state

    case ActionTypes.NOTIFICATION_ARRIVED:
      let newState = {
        ...state,
        notifications: [ action.data, ...state.notifications ],
        unreadNotificationsCount: state.unreadNotificationsCount + 1,
      }

      switch (action.data.notification.type) {
        case 'PATIENT_SIGN_UP':
          newState = {
            ...newState,
            patientSignUps: {
              today: newState.patientSignUps.today + 1,
              yesterday: newState.patientSignUps.yesterday,
            },
          }

          break
      }

      return newState

    case ActionTypes.FETCH_PATIENT_SIGN_UPS:
      if (action.status === 'succeeded') {
        return {
          ...state,
          patientSignUps: {
            today: action.payload.signUps.today,
            yesterday: action.payload.signUps.yesterday,
          },
        }
      }

      return state
  }

  return state
}
