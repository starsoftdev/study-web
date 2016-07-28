import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

export default asyncActionIsFetching(ActionTypes.SAVE_TWILIO_MESSAGE)
