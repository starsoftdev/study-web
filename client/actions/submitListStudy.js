import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { createEntity } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function submitListStudy (data) {
  return asyncAction(ActionTypes.SUBMIT_LIST_STUDY, (cb, dispatch, getState) => {
    function afterSave (err, payload) {
      cb(err, payload)
      // if (!err) {
      //   history.push({ pathname: 'thankyou' })
      // }
    }
    dispatch(createEntity('studies', data, afterSave))			// fix this endpoint
  })
}
