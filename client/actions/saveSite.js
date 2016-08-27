import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function saveSite (currentUser, siteId, siteData) {
  const actionType = siteId? ActionTypes.UPDATE_SITE: ActionTypes.CREATE_SITE

  return asyncAction(actionType, { siteId, siteData }, (cb, dispatch, getState) => {

    function afterSave (err, payload) {
      cb(err, payload)
      dispatch({
        type: ActionTypes.FINISH_SAVE_SITE,
        siteData: payload
      })
    }

    siteData = JSON.parse(JSON.stringify(siteData))
    siteData.client_id = currentUser.userInfo.roleForClient.client_id
    if (siteId) {
      dispatch(updateEntity('/sites/' + siteId, siteData, afterSave))
    } else {
      dispatch(createEntity('/sites', siteData, afterSave))
    }
  })
}
