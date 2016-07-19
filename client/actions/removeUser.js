import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { deleteEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function removeUser (clientRoleId) {
  const actionType = ActionTypes.DELETE_USER

  return asyncAction(actionType, { clientRoleId }, (cb, dispatch, getState) => {

    function afterDelete (err, payload) {
      cb(err, payload)
      const result = {
        clientRoleId,
      }

      dispatch({
        type: ActionTypes.FINISH_DELETE_USER,
        userData: result
      })
    }

    dispatch(deleteEntity('/clientRoles/' + clientRoleId, null, afterDelete))
  })
}
