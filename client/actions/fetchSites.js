import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchSites (currentUser, searchParams) {
  return asyncAction(ActionTypes.FETCH_SITES, (cb, dispatch) => {

    let filterObj = {
      include: [ 'users', 'studies' ],
      where: {}
    }

    searchParams = searchParams || {}

    if (searchParams.name) {
      filterObj.where = {
        name: {
          like: '%' + searchParams.name + '%'
        }
      }
    }

    const queryParams = {
      filter: JSON.stringify(filterObj)
    }

    dispatch(searchEntities('/clients/' + currentUser.userInfo.roleForClient.client_id + '/sites', queryParams, cb))
  })
}
