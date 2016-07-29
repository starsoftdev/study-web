import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const updatingPatientCategory = asyncActionIsFetching(ActionTypes.UPDATE_PATIENT_CATEGORY)
