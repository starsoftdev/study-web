import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function saveUser (currentUser, userId, userData) {
  const actionType = userId? ActionTypes.UPDATE_USER: ActionTypes.CREATE_USER

  return asyncAction(actionType, { userId, userData }, (cb, dispatch, getState) => {

    function afterSave (err, payload) {
      cb(err, payload)
      const operation = (userData.siteId === 0)? 'save': 'delete'
      let userResultData = payload.clientRole
      userResultData.user = payload.user
      const result = {
        operation,
        userResultData,
      }

      dispatch({
        type: ActionTypes.FINISH_SAVE_USER,
        userData: result
      })
    }

    if (userId) {
      userData = JSON.parse(JSON.stringify(userData))
      userData.userId = userId
      dispatch(updateEntity('/clients/' + currentUser.userInfo.roleForClient.client_id + '/updateUserWithClientRole', userData, afterSave))
    } else {
      dispatch(createEntity('/clients/' + currentUser.userInfo.roleForClient.client_id + '/addUserWithClientRole', userData, afterSave))
    }
  })
}
