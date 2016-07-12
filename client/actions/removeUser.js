import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { deleteEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function removeUser (id) {
  const actionType = ActionTypes.DELETE_USER

  return asyncAction(actionType, { id }, (cb, dispatch, getState) => {

    function afterDelete (err, payload) {
      cb(err, payload)
      let userResultData = payload.clientRole
      userResultData.user = payload.user
      const result = {
        userResultData
      }

      dispatch({
        type: ActionTypes.FINISH_DELETE_USER,
        userData: result
      })
    }

    dispatch(deleteEntity('/users/' + id, null, afterDelete))
  })
}
