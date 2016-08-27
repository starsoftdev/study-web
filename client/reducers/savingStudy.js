import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const initialState = {
  isFetching: false,
  savedStudy: []
}

const creatingSite = asyncActionIsFetching(ActionTypes.CREATE_STUDY)
const updatingSite = asyncActionIsFetching(ActionTypes.UPDATE_STUDY)

export function savingStudy (state = false, action) {
  let newStudy = false
  newStudy = creatingSite(state, action)
  newStudy = updatingSite(state, action)
  return newStudy
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
