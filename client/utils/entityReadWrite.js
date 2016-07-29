import apiCall from './apiCall'
import ensureAuthRefreshed from './ensureAuthRefreshed'

function entityRequest (path, entityData, method, cb = () => {}) {
  return (dispatch) => {
    dispatch(apiCall(path, { method, body: entityData }, cb))
  }
}

export function searchEntities (path, searchParams, cb) {
  const queryString = serializeParams(searchParams)

  let pathWithQuery = path
  if (queryString) {
    pathWithQuery = `${path}?${queryString}`
  }
  return entityRequest(pathWithQuery, null, 'get', cb)
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

function serializeParams (obj) {
  let str = []
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && obj[p] !== undefined && obj[p] !== null ) {  // we need to pass 0 and empty string
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}
