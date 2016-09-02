import { ActionTypes } from 'ActionTypes'
import asyncAction from 'utils/asyncAction'
import _ from 'lodash'

export default function setSocket (props, nameSpace, next) {
  const user = props.authorization.authData
  let nsp = props.socket

  if (user) {
    if (_.isEmpty(nsp)) {
      nsp = io(`${HOST_URL}/${nameSpace}`)

      nsp.setToken = () => {

      }
      next (nsp)

      return {
        type: ActionTypes.SET_SOCKET,
        payload: nsp
      }
    }
  } else {
    if (!_.isEmpty(nsp)) {
      nsp.disconnect()
      nsp = {}

      next (nsp)

      return {
        type: ActionTypes.SET_SOCKET,
        payload: nsp
      }
    }
  }
}
