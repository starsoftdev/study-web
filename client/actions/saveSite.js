import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { createEntity, updateEntity } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function saveSite (siteId, siteData) {
  const actionType = siteId? ActionTypes.UPDATE_SITE: ActionTypes.CREATE_SITE

  return asyncAction(actionType, { siteId, siteData }, (cb, dispatch, getState) => {

    function afterSave (err, payload) {
      cb(err, payload)
      if (!err) {
        dispatch({
          type: ActionTypes.FINISH_SAVE_SITE,
          siteData: payload
        })
      }
    }

    if (siteId) {
      dispatch(updateEntity('/sites/' + siteId, siteData, afterSave))
    } else {
      dispatch(createEntity('/sites', siteData, afterSave))
    }
  })
}
