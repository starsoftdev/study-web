import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const creating = asyncActionIsFetching(ActionTypes.SAVE_REFERRAL_FORM)

export default function savingContact (state = false, action) {
  state = creating(state, action)
  return state
}
