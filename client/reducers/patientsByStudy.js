import { ActionTypes } from 'ActionTypes'

export default function patientsByStudy (state=[], action) {
  switch (action.type) {
    case ActionTypes.FETCH_PATIENTS_BY_STUDY:
      if (action.status === 'succeeded') {
        return action.payload
      }
      return state
  }

  return state
}
