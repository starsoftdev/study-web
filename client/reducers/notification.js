import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

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
        return {
          ...state,
          isFetchingNotifications: false,
          notifications: action.payload.notifications || [],
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
  }

  return state
}
