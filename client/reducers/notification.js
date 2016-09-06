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
  rewardsPoint: 0,
  newNotification: {
    event: '',
    event_params: '',
    entity_ref: null
  }
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

    case ActionTypes.FETCH_PATIENT_SIGN_UPS:
      if (action.status === 'succeeded') {
        return {
          ...state,
          patientSignUps: {
            today: action.payload.today,
            yesterday: action.payload.yesterday,
          },
        }
      }

      return state

    case ActionTypes.FETCH_PATIENT_MESSAGES:
      if (action.status === 'succeeded') {
        return {
          ...state,
          patientMessages: {
            unreadTexts: action.payload.unreadTexts,
            unreadEmails: action.payload.unreadEmails,
          },
        }
      }

      return state

    case ActionTypes.FETCH_REWARDS_POINT:
      if (action.status === 'succeeded') {
        return {
          ...state,
          rewardsPoint: action.payload.rewardPoints,
        }
      }

      return state

    case ActionTypes.RECEIVE_MESSAGE:
      let newState = {
        ...state,
        notifications: [ action.payload, ...state.notifications ],
        unreadNotificationsCount: state.unreadNotificationsCount + 1,
        newNotification: action.payload
      }

      switch (action.payload.event) {
        case 'create-patient':
          newState = {
            ...newState,
            patientSignUps: {
              today: newState.patientSignUps.today + 1,
              yesterday: newState.patientSignUps.yesterday,
            },
          }

        case 'twilio-message':
          newState = {
            ...newState,
            patientMessages: {
              unreadTexts: newState.patientMessages.unreadTexts + 1,
              unreadEmails: newState.patientMessages.unreadEmails,
            },
          }
          break

        case 'create-reward':
          newState = {
            ...newState,
            rewardsPoint: newState.rewardsPoint + action.payload.event_params.points
          }
          break
      }
      return newState

    default:
      return state
  }

  return state
}
