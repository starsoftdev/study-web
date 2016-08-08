import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function patients (state=[], action) {
  const patientData = action.patientData
  let foundPatientIndex = -1
  let newState = _.map(state, _.cloneDeep)

  switch (action.type) {
    case ActionTypes.CLEAR_PATIENTS:
      return []
    case ActionTypes.FETCH_PATIENTS:
      if (action.status === 'succeeded') {
        return action.payload
      }

      return state
    case ActionTypes.FINISH_SAVE_PATIENT:
      foundPatientIndex = _.findIndex(state, { id: patientData.id })
      if (foundPatientIndex > -1) {
        newState[foundPatientIndex] = patientData
      }

      return newState
  }

  return state
}
