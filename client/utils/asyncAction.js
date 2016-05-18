
export default function asyncAction (actionType, actionParams, cb) {
  let timer

  if (cb === null || cb === undefined) {
    cb = actionParams
    actionParams = null
  }

  // This handles the case where request A is made, then request B is made,
  // then request B lands, then request A lands. In such a scenario, the
  // state will be incorrect. We want the last request made to dispatch, not
  // the last request to land.
  let lastCallId = 0

  return function (dispatch, getState) {
    let thisCallId = ++lastCallId

    dispatch({
      type: actionType,
      status: 'started',
      ...getActionParams(actionParams, 'started', getState)
    })

    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
        type: actionType,
        status: 'waiting',
        ...getActionParams(actionParams, 'waiting', getState)
      })
    }, 20)

    cb.apply(null, [ function (err, payload) {
      clearTimeout(timer)

      let nextCallAlreadyStarted = thisCallId !== lastCallId
      if (nextCallAlreadyStarted) {
        return
      }

      if (err) {
        dispatch({
          type: actionType,
          status: 'failed',
          ...getActionParams(actionParams, 'failed', getState),
          err
        })
      }
      else {
        dispatch({
          type: actionType,
          status: 'succeeded',
          ...getActionParams(actionParams, 'succeeded', getState),
          payload
        })
      }
    }, dispatch, getState ])
  }
}

function getActionParams (actionParams, status, getState) {
  if (typeof actionParams === 'function') {
    return actionParams(status, getState) || {}
  } else {
    return actionParams || {}
  }
}
