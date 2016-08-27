import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const initialState = {
  isFetching: false,
  schedulingPatient: false,
  isDeleting: false,
  schedules: [],
}

export default function (state = initialState, action) {
  const fetchingFunc = asyncActionIsFetching(ActionTypes.FETCH_SCHEDULES)
  const schedulingFunc = asyncActionIsFetching(ActionTypes.SCHEDULE_PATIENT)
  const deletingFunc = asyncActionIsFetching(ActionTypes.DELETE_SCHEDULE)

  switch (action.type) {
    case ActionTypes.FETCH_SCHEDULES:
      if (action.status === 'succeeded') {
        return {
          ...state,
          isFetching: false,
          schedules: action.payload || []
        }
      }
      return {
        ...state,
        isFetching: fetchingFunc(state, action),
      }
    case ActionTypes.SCHEDULE_PATIENT:
      if (action.status === 'succeeded') {
        return {
          ...state,
          schedulingPatient: false,
          schedules: action.payload || []
        }
      }
      return {
        ...state,
        schedulingPatient: schedulingFunc(state, action),
      }
    case ActionTypes.DELETE_SCHEDULE:
      if (action.status === 'succeeded') {
        return {
          ...state,
          isDeleting: false,
          schedules: action.payload || []
        }
      }
      return {
        ...state,
        isDeleting: deletingFunc(state, action),
      }
  }

  return state
}
