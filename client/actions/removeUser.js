import { ActionTypes } from 'ActionTypes'
import { deleteEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function removeUser (userId) {
  const actionType = ActionTypes.DELETE_USER

  return asyncAction(actionType, { userId }, (cb, dispatch) => {

    function afterDelete (err, payload) {
      cb(err, payload)
      const result = {
        userId,
      }

      dispatch({
        type: ActionTypes.FINISH_DELETE_USER,
        userData: result
      })
    }

    dispatch(deleteEntity('/users/' + userId, null, afterDelete))
  })
}
