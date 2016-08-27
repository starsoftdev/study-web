import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const initialState = {
  isFetching: true,
  studyLevels: []
}

export default function (state = initialState, action) {
  const statusFunc = asyncActionIsFetching(ActionTypes.FETCH_STUDY_LEVELS)

  switch (action.type) {
    case ActionTypes.FETCH_STUDY_LEVELS:
      if (action.status === 'succeeded') {
        return {
          isFetching: false,
          studyLevels: action.payload || []
        }
      }
      return {
        ...state,
        isFetching: statusFunc(state, action),
      }
  }

  return state
}
