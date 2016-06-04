import thunk from 'redux-thunk'

export function createTestingDispatch () {
  let actions = []

  function dispatch (action) {
    actions.push(action)
    return action
  }

  // Runs all async actions that have been dispatched, recursively.
  // Returns all the dispatched actions after all async actions are
  // executed. Actions returned can be either plain actions, or
  // effects.
  function flattenAsyncActions (getState = () => ({})) {
    // This will execute the thunks with the given dispatch and getState,
    // And will just return the non thunk actions
    const dispatchWithThunk = thunk({ dispatch, getState })(action => action)

    const someAsync = () =>
      actions.filter(action =>
        typeof action === 'function'
      ).length > 0

    while (someAsync()) {
      actions.slice().forEach(action => {
        actions.splice.apply(
          actions,
          [ actions.indexOf(action), 1 ].concat(
            dispatchWithThunk(action)
          )
        )
      })
    }

    actions = actions.filter(Boolean)
    dispatch.actions = actions
    return actions
  }

  dispatch.flattenAsyncActions = flattenAsyncActions
  dispatch.actions = actions
  return dispatch
}

export function simulateEffectSuccess (effect, data) {
  return effect.meta.steps[0][0](data)
}
