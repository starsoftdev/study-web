import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const creatingCard = asyncActionIsFetching(ActionTypes.CREATE_CARD)
const updatingCard = asyncActionIsFetching(ActionTypes.UPDATE_CARD)

export default function savingCard (state = false, action) {
  const newState = creatingCard(state, action) || updatingCard(state, action)

  return newState
}
