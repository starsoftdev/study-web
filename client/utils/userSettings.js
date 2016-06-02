export const getAccessToken = () => {
  if (localStorage.authData) {
    return JSON.parse(localStorage.authData).id
  } else {
    return null
  }
}

const userSettings = {
  getAccessToken,
}

export default userSettings
