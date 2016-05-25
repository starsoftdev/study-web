import apiCall from './apiCall'
import ensureAuthRefreshed from './ensureAuthRefreshed'

function entityRequest (path, entityData, method, cb = () => {}) {
  return (dispatch) => {
    dispatch(apiCall(path, { method, body: entityData }, cb))
  }
}

export function updateEntity (path, entityData, cb) {
  return entityRequest(path, entityData, 'put', cb)
}

export function createEntity (path, entityData, cb) {
  return entityRequest(path, entityData, 'post', cb)
}

export function deleteEntity (path, entityData, cb) {
  return entityRequest(path, entityData, 'delete', cb)
}
