export default function asyncActionIsFetching (actionTypes, predicate = () => true) {
  return function (state=false, action) {
    if ((typeof actionTypes === 'string' && action.type !== actionTypes) ||
        (Array.isArray(actionTypes) && actionTypes.indexOf(action.type) === -1) || !predicate(action)) {
      return state
    }

    switch (action.status) {
      case 'started':
      case 'waiting':
        return true
      case 'succeeded':
      case 'failed':
        return false
      default:
        return state
    }
  }
}
