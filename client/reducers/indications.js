import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function indications (state=[], action) {
  switch (action.type) {
    case ActionTypes.FETCH_INDICATIONS:
      if (action.status === 'succeeded') {
        const indicationsResult = _.map(action.payload, indicationIterator => {
          return {
            label: indicationIterator.name,
            value: indicationIterator.id,
          }
        })
        return indicationsResult
      }

      return state
  }

  return state
}
