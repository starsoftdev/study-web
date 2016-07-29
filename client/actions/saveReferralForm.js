import { ActionTypes } from 'ActionTypes'
import { createEntity } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export default function saveReferralForm (formData) {
  return asyncAction(ActionTypes.SAVE_REFERRAL_FORM, { formData }, (cb, dispatch, getState) => {

    function afterSave (err, payload) {
      cb(err, payload)
      if (!err) {
        history.push({ pathname: 'thankyou' })
      }
    }

    dispatch(createEntity('/REPLACE_ME', formData, afterSave))
  })
}
