import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { createEntity } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function submitOrderIRBAd (data) {
  return asyncAction(ActionTypes.SUBMIT_ORDER_IRB_AD, (cb, dispatch, getState) => {
    function afterSave (err, payload) {
      cb(err, payload)
      if (!err) {
        history.push({ pathname: 'thankyou' })
      }
    }
    dispatch(createEntity('/irbAdCreations', data, afterSave))			// fix this endpoint
  })
}
