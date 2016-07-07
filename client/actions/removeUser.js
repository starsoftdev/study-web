import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { deleteEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function removeUser (userId) {
  const actionType = ActionTypes.DELETE_USER

  return asyncAction(actionType, { userId }, (cb, dispatch, getState) => {

    function afterDelete (err, payload) {
      cb(err, payload)
      if (!err) {
        dispatch({
          type: ActionTypes.FINISH_DELETE_USER,
          userData: payload
        })
      }
    }

    dispatch(deleteEntity('/users/' + userId, null, afterDelete))
  })
}
