import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity, searchEntities } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export function fetchSchedules (searchParams) {
  return asyncAction(ActionTypes.FETCH_SCHEDULES, (cb, dispatch, getState) => {
    dispatch(searchEntities('/callReminders/getSchedules', searchParams, cb))
  })
}

export function schedulePatient (callReminderId, data) {
  return asyncAction(ActionTypes.SCHEDULE_PATIENT, { data }, (cb, dispatch, getState) => {

    function afterSave (err, payload) {
      cb(err, payload)
    }
    
    if (callReminderId) {
      dispatch(updateEntity('/callReminders', {...data, id: callReminderId}, afterSave))
    } else {
      dispatch(createEntity('/callReminders', data, afterSave))
    }
  })
}
