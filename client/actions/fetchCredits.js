import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchCredits () {
  return asyncAction(ActionTypes.FETCH_CREDITS, (cb, dispatch) => {
    function getCredits (err, addons) {
      if (err) {
        return cb(err)
      }

      return cb(null, addons[0])
    }

    dispatch(searchEntities('/addons', {}, getCredits))
  })
}
