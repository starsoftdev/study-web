import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const submittingForm = asyncActionIsFetching(ActionTypes.SUBMIT_LIST_STUDY)

export default function submittingListStudy (state = false, action) {
  state = submittingForm(state, action)
  return state
}

