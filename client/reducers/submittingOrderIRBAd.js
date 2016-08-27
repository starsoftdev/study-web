import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const submittingForm = asyncActionIsFetching(ActionTypes.SUBMIT_ORDER_IRB_AD)

export default function submittingOrderIRBAd (state = false, action) {
  state = submittingForm(state, action)
  return state
}
