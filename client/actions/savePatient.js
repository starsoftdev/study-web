import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity } from 'utils/entityReadWrite'
import _ from 'lodash'
import asyncAction from 'utils/asyncAction'

export default function savePatient (patientId, patientData) {
  const actionType = patientId ? ActionTypes.UPDATE_PATIENT : ActionTypes.CREATE_PATIENT

  return asyncAction(actionType, { patientId, patientData }, (cb, dispatch) => {

    function afterSave (err, payload) {
      cb(err, payload)
      dispatch({
        type: ActionTypes.FINISH_SAVE_PATIENT,
        patientData: payload
      })
    }

    if (patientId) {
      const payload = _.assign({ id: patientId }, patientData)
      dispatch(createEntity('/patients/update_with_category', payload, afterSave))
      //dispatch(updateEntity('/patients/' + patientId, patientData, afterSave))
    } else {
      dispatch(createEntity('/patients', patientData, afterSave))
    }
  })
}
