import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const creatingSite = asyncActionIsFetching(ActionTypes.CREATE_SITE)
const updatingSite = asyncActionIsFetching(ActionTypes.UPDATE_SITE)

export default function savingSite (state = false, action) {
  const newState = creatingSite(state, action) || updatingSite(state, action)

  return newState
}
