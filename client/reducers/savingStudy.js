import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const initialState = {
  isFetching: false,
  savedStudy: []
}

const creatingStudy = asyncActionIsFetching(ActionTypes.CREATE_STUDY)
const updatingStudy = asyncActionIsFetching(ActionTypes.UPDATE_STUDY)

export function savingStudy (state = false, action) {
  const newState = creatingStudy(state, action) || updatingStudy(state, action)

  return newState
}

export function listStudy (state = initialState, action) {
  const statusFunc = asyncActionIsFetching(ActionTypes.FINISH_SAVE_STUDY)

  switch (action.type) {
    case ActionTypes.FINISH_SAVE_STUDY:
      if (action.status === 'succeeded') {
        /*return {
          isFetching: false,
          savedStudy: action.payload || []
        }*/

        return Object.assign({}, state, { isFetching: false }, action.payload)
      }
      return {
        ...state,
        isFetching: statusFunc(state, action)
      }
  }

  return state
}
