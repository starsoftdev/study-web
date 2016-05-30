import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function savePatient (patientId, patientData) {
  const actionType = patientId ? ActionTypes.UPDATE_PATIENT : ActionTypes.CREATE_PATIENT
  return asyncAction(actionType, { patientId, patientData }, (cb, dispatch, getState) => {

    function afterSave (err, payload) {
      cb(err, payload)
      if (!err) {
        // const { location } = getState()

        // if (location.pathname !== `/patients/${payload.id}`) {
        //   history.push({ pathname: `/patients/${payload.id}`, query: location.query })
        // }
        history.push({ pathname: 'thankyou' })
      }
    }

    if (patientId) {
      dispatch(updateEntity('/patients/' + patientId, patientData, afterSave))
    } else {
      dispatch(createEntity('/patients', patientData, afterSave))
    }
  })
}
