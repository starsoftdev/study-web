import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const initialState = {
	isFetching: true,
	studyCategories: []
}

export default function (state = initialState, action) {
	const statusFunc = asyncActionIsFetching(ActionTypes.FETCH_STUDY_CATEGORIES)

  switch (action.type) {
    case ActionTypes.FETCH_STUDY_CATEGORIES:
      if (action.status === 'succeeded') {
        return {
          isFetching: false,
          studyCategories: action.payload
        }
      }
      return {
        ...state,
        isFetching: statusFunc(state, action),
      }
  }

  return state
}
