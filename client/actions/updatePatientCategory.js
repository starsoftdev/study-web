import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function updatePatientCategory (patientId, patientCategoryId) {
  const actionType = ActionTypes.UPDATE_PATIENT_CATEGORY
  return asyncAction(actionType, { patientId, patientCategoryId }, (cb, dispatch, getState) => {

    function afterSave (err, payload) {
      cb(err, payload)
      if (!err) {
        // const { location } = getState()

        // if (location.pathname !== `/patients/${payload.id}`) {
        //   history.push({ pathname: `/patients/${payload.id}`, query: location.query })
        // }
        // history.push({ pathname: 'thankyou' })
      }
    }

    const postData = {}
    postData['patient_id'] = patientId
    postData['patient_category_id'] = patientCategoryId
    postData['scheduled_date'] = '2015-05-02 23:23:22'

    dispatch(createEntity('/patients/update_category/', postData, afterSave))
  })
}
