import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function savePatient (patientId, patientData) {
  const actionType = patientId ? ActionTypes.UPDATE_PATIENT : ActionTypes.CREATE_PATIENT

  return asyncAction(actionType, { patientId, patientData }, (cb, dispatch) => {

    function afterSave (err, payload) {
      patientData.id = payload.id
      cb(err, payload)
      dispatch({
        type: ActionTypes.FINISH_SAVE_PATIENT,
        patientData
      })
    }

    if (patientId) {
      dispatch(updateEntity('/patients/' + patientId, patientData, afterSave))
    } else {
      dispatch(createEntity('/patients', patientData, afterSave))
    }
  })
}
