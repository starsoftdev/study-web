import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const initialState = {
  isFetching: false,
  schedulingPatient: false,
  schedules: [],
}

export default function (state = initialState, action) {
  const fetchingFunc = asyncActionIsFetching(ActionTypes.FETCH_SCHEDULES)
  const schedulingFunc = asyncActionIsFetching(ActionTypes.SCHEDULE_PATIENT)

  switch (action.type) {
    case ActionTypes.FETCH_SCHEDULES:
      if (action.status === 'succeeded') {
        return {
          ...state,
          isFetching: false,
          schedules: action.payload.schedules || []
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
        }
      }
      return {
        ...state,
        schedulingPatient: schedulingFunc(state, action),
      }
  }

  return state
}
