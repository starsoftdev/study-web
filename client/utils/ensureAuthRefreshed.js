import refreshAuth from './refreshAuth'

export default function ensureAuthRefreshed (callback) {
  return (dispatch, getState) => {
    const { authData } = getState().authorization

    if (!authData || needToRefreshAuth(authData.lastRefresh)) {
      dispatch(refreshAuth(callback))
    } else {
      callback(null)
    }
  }
}


const ONE_HOUR = 60 * 60 * 1000

function needToRefreshAuth (lastRefresh) {
  return (new Date().valueOf() - lastRefresh) > ONE_HOUR
}
