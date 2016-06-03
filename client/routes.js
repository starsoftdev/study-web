import React from 'react'
import { IndexRoute, IndexRedirect, Route } from 'react-router'

import Application from './screens/components/Application'
import NotFound from './screens/components/NotFound'

import Dashboard from './screens/Dashboard'
import GetProposal from './screens/GetProposal'
import GetReport from './screens/GetReport'
import Home from './screens/Home'
import Login from './screens/Login'
import Study from './screens/Study'
import TrialListing from './screens/TrialListing'
import PatientDetails from './screens/PatientDetails'

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
    <Route path="/" component={Application}>
      {/* Home (main) route */}
      <IndexRedirect to="/trials" />

      {/* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="dashboard" getComponent={lazyLoadComponent(Dashboard)} />
      </Route>

      <Route path="clinical-trial-patient-recruitment-patient-enrollment" getComponent={lazyLoadComponent(GetReport)} />
      <Route path="getproposal" getComponent={lazyLoadComponent(GetProposal)} />
      <Route path="login" getComponent={lazyLoadComponent(Login)} />
      <Route path="studies/:id" getComponent={lazyLoadComponent(Study)} />
      <Route path="trials" getComponent={lazyLoadComponent(TrialListing)} />
      <Route path="patient-details" getComponent={lazyLoadComponent(PatientDetails)} />

      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
}

function lazyLoadComponent (lazyModule) {
  return (location, cb) => {
    lazyModule(module => cb(null, module.default))
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
