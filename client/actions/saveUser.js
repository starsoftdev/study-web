import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function saveUser (userId, userData) {
  const actionType = userId? ActionTypes.UPDATE_USER: ActionTypes.CREATE_USER

  return asyncAction(actionType, { userId, userData }, (cb, dispatch, getState) => {

    function afterSave (err, payload) {
      cb(err, payload)
      if (!err) {
        dispatch({
          type: ActionTypes.FINISH_SAVE_USER,
          userData: payload
        })
      }
    }

    if (userId) {
      dispatch(updateEntity('/users/' + userId, userData, afterSave))
    } else {
      dispatch(createEntity('/users', userData, afterSave))
    }
  })
}
