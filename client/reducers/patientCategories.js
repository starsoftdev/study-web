import { ActionTypes } from 'ActionTypes'

export default function patientCategories (state=[], action) {
  switch (action.type) {
    case ActionTypes.FETCH_PATIENT_CATEGORIES:
      if (action.status === 'succeeded') {
        return action.payload
      }
      return state
  }

  return state
}
