import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { createEntity } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function submitGetTrialNotificationForm (patientData) {
  return asyncAction(ActionTypes.SUBMIT_GET_TRIAL_NOTIFICATION_FORM, { patientData }, (cb, dispatch, getState) => {

    function afterSave (err, payload) {
      cb(err, payload)
      if (!err) {
        history.push({ pathname: 'thankyou' })
      }
    }

    dispatch(createEntity('/patients', patientData, afterSave))
  })
}
