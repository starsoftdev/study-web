
import { applyMiddleware, createStore, compose } from 'redux'

import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import effects from 'redux-effects'
import fetchEffect from './effects/fetch'

import appReducer from './appReducer'

let enhancers = []
let middleware = []

if (top !== window) {
  // We use this middleware to notify the parent document
  // that the iframe has finished rendering, so that we can
  // extract its HTML and send it to download as PDF
  const detectNoMorePendingEffects = (noMoreEffectsCallback) => {
    return ({ dispatch }) => {
      const effects = []

      function endOfEffect (effect) {
        return () => {
          // Delay a tick to make sure everything was run
          if (effects.indexOf(effect) !== -1) {
            effects.splice(effects.indexOf(effect), 1)
          }
          setTimeout(() => {
            if (!effects.length) {
              noMoreEffectsCallback()
            }
          }, 0)
        }
      }

      return next => action => {
        const result = next(action)
        if (result && typeof result.then === 'function') {
          effects.push(result)
          result.then(endOfEffect(result), endOfEffect(result))
        }
        return result
      }
    }
  }

  const notifyRendered = () => {
    top.document.dispatchEvent(new CustomEvent('iframe_rendered'))
    console.log('rendered!')
  }
  middleware.push(detectNoMorePendingEffects(notifyRendered))
}

middleware = middleware.concat([
  effects, fetchEffect,
  thunk
])

if (__LOGGER__ || localStorage.getItem('logger')) {
  middleware.push(createLogger())
}

enhancers.push(applyMiddleware(...middleware))

if (__DEVTOOLS__) {
  const { persistState } = require('redux-devtools')

  enhancers.push(
    window.devToolsExtension && window.devToolsExtension(),
    persistState(getDebugSessionKey())
  )

  function getDebugSessionKey () {
    // You can write custom logic here!
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/)
    return (matches && matches.length > 0)? matches[1] : null
  }
}

const createStoreWithMiddleware = compose(...enhancers)(createStore)

export default function createAppStore (initialState) {
  const store = createStoreWithMiddleware(appReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./appReducer', () => {
      const nextAppReducer = require('./appReducer')
      store.replaceReducer(nextAppReducer)
    })
  }

  return store
}
