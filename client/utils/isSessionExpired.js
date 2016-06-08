export default function isSessionExpired (authData) {
  if (!authData) {
    return true
  }

  const timeElapsedInMilliSeconds = (new Date().valueOf() - authData.lastRefresh)
  const timeToLive = authData.ttl

  if (timeElapsedInMilliSeconds > timeToLive) {
    return true
  }

  return false
}
