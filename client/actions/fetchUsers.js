import { ActionTypes } from 'ActionTypes'
import { searchEntities } from 'utils/entityReadWrite'
import asyncAction from 'utils/asyncAction'

export default function fetchUsers (currentUser, searchParams) {
  return asyncAction(ActionTypes.FETCH_USERS, (cb, dispatch) => {

    let filterObj = {
      include: 'user',
      where: {}
    }

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

    dispatch(searchEntities('/clients/' + currentUser.userInfo.roleForClient.client_id + '/roles', queryParams, cb))
  })
}
