import 'whatwg-fetch'

const realFetch = global.fetch

export default function fetchMiddleware ({ dispatch, getState }) {
  return next => action =>
    action.type === 'EFFECT_FETCH'
      ? realFetch(action.url, action.params).then(deserialize)
      : next(action)
}

export function fetch (url = '', params = {}) {
  return {
    type: 'EFFECT_FETCH',
    url,
    params
  }
}

function deserialize (res) {
  if (res.status === 204) {
    return {
      status: 204
    }
  }

  const header = res.headers.get('Content-Type')
  const promise = !header ?
    res.text() :
    header.indexOf('application/json') > -1 ?
      res.json() :
      header.indexOf('application/pdf') > -1 ?
        res.blob() :
        res.text()

  return promise.then(data => ({
    status: res.status,
    data
  }))
}
