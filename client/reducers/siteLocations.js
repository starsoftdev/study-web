import { ActionTypes } from 'ActionTypes'
import asyncActionIsFetching from 'utils/asyncActionIsFetching'

const initialState = {
	isFetching: true,
	siteLocations: []
}

export default function (state = initialState, action) {
	const statusFunc = asyncActionIsFetching(ActionTypes.FETCH_SITE_LOCATIONS)

  switch (action.type) {
    case ActionTypes.FETCH_SITE_LOCATIONS:
      if (action.status === 'succeeded') {
        return {
					isFetching: false,
					siteLocations: action.payload.siteLocations || []
        }
      }
      return {
				isFetching: statusFunc(state, action),
				siteLocations: []
      }
  }

  return state
}
