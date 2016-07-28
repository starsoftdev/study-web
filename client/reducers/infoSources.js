import { ActionTypes } from 'ActionTypes'
import _ from 'lodash'

export default function infoSources (state=[], action) {
  switch (action.type) {
    case ActionTypes.FETCH_INFO_SOURCES:
      if (action.status === 'succeeded') {
        const infoSourcesResult = _.map(action.payload, infoSourceIterator => {
          return {
            label: infoSourceIterator.type,
            value: infoSourceIterator.id,
          }
        })
        return infoSourcesResult
      }

      return state
  }

  return state
}
