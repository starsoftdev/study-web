import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchTwilioMessages (searchParams) {
  return asyncAction(ActionTypes.FETCH_TWILIO_MESSAGES, (cb, dispatch, getState) => {
    dispatch(searchEntities('/textMessages/studyPatientMessages', searchParams, cb))
  })
}
