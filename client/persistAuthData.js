export default function persistAuthData (store) {
  let { authorization: { authData: prevAuthData } } = store.getState()
  return () => {
    const { authorization: { authData } } = store.getState()

    if (prevAuthData !== authData) {
      if (!authData) {
        delete localStorage.authData
      } else {
        localStorage.authData = JSON.stringify(authData)
      }
      prevAuthData = authData
    }
  }
}
