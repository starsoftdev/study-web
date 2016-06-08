import selectn from 'selectn'

export const getAccessToken = () => {
  try {
    return selectn('id', JSON.parse(localStorage.authData))
  } catch (e) {
    return null
  }
}

const userSettings = {
  getAccessToken,
}

export default userSettings
