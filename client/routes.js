import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Application from './screens/Application'
import Dashboard from './screens/Dashboard'
import Home from './screens/Home'
import Login from './screens/Login'

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    let { authorization: { authData } } = store.getState()
    if (!authData) {
      // oops, not logged in, so can't be here!
      replace('/')
    }
    cb()
  }

  return (
    <Route path="/" component={ Application }>
      { /* Home (main) route */ }
      <IndexRoute component={ Home }/>

      { /* Routes requiring login */ }
      <Route onEnter={ requireLogin }>
        <Route path="dashboard" component={ Dashboard }/>
      </Route>

      <Route path="login" component={ Login } />
    </Route>
  )
}

function lazyLoadComponent (lazyModule) {
  return (location, cb) => {
    lazyModule(module => {
      cb(null, module)
    })
  }
}

function lazyLoadComponents (lazyModules) {
  return (location, cb) => {
    const moduleKeys = Object.keys(lazyModules)
    const promises = moduleKeys.map(key =>
      new Promise(resolve => lazyModules[key](resolve))
    )

    Promise.all(promises).then(modules => {
      cb(null, modules.reduce((obj, module, i) => {
        obj[moduleKeys[i]] = module
        return obj
      }, {}))
    })
  }
}
