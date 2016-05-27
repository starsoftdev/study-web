import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const submittingForm = asyncActionIsFetching(ActionTypes.SUBMIT_GET_TRIAL_NOTIFICATION_FORM)

export default function submittingGetTrialNotificationForm (state = false, action) {
  state = submittingForm(state, action)
  return state
}
