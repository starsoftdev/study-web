import buildErrorMessageFromValidationResult from './buildErrorMessageFromValidationResult'
import selectn from 'selectn'

export default function asyncActionError (actionType) {
  return function (action, createMessage) {
    if (action.type === actionType && action.status === 'failed') {
      return createMessage('error', buildErrorMessageFromValidationResult(selectn('err.data.message', action)))
    }
  }
}
