import { ActionTypes } from 'ActionTypes'
import { deleteEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function removeClientRole (clientRoleId) {
  const actionType = ActionTypes.DELETE_CLIENT_ROLE

  return asyncAction(actionType, { clientRoleId }, (cb, dispatch) => {

    function afterDelete (err, payload) {
      cb(err, payload)
      const result = {
        clientRoleId,
      }

      dispatch({
        type: ActionTypes.FINISH_DELETE_CLIENT_ROLE,
        userData: result
      })
    }

    dispatch(deleteEntity('/clientRoles/' + clientRoleId, null, afterDelete))
  })
}
