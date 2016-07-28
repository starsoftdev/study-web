import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function setActiveChat (searchParams) {
  return asyncAction(ActionTypes.FETCH_TWILIO_MESSAGES, (cb, dispatch, getState) => {
    function afterSave (err, payload) {
      cb(err, payload)
      if (!err) {
        dispatch({
          type: ActionTypes.SET_ACTIVE_CHAT,
          payload: { data: searchParams }
        })
      }
    }

    dispatch(searchEntities('/textMessages/studyPatientMessages', searchParams, afterSave))
  })
}
