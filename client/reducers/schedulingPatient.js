import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const submittingForm = asyncActionIsFetching(ActionTypes.SCHEDULE_PATIENT)

export default function schedulingPatient (state = false, action) {
  state = submittingForm(state, action)
  return state
}
