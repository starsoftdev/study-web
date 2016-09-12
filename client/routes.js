import React from 'react'
import { IndexRoute, IndexRedirect, Route } from 'react-router'

import Application from './screens/components/Application'
import NotFound from './screens/components/NotFound'

import Dashboard from './screens/Dashboard'
import GetProposal from './screens/GetProposal'
import GetReferral from './screens/GetReferral'
import GetReport from './screens/GetReport'
import ListStudy from './screens/ListStudy'
import Login from './screens/Login'
import Study from './screens/Study'
import SitesUsers from './screens/SitesUsers'
import PatientDatabase from './screens/PatientDatabase'
import TrialListing from './screens/TrialListing'
import PatientDetails from './screens/PatientDetails'
import OrderIRBAdCreation from './screens/OrderIRBAdCreation'
import Notifications from './screens/Notifications'
import Calendar from './screens/Calendar'

import isSessionExpired from 'utils/isSessionExpired'

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    let { authorization: { authData } } = store.getState()
    if (!authData || isSessionExpired(authData)) {
      // oops, not logged in, so can't be here!
      replace('/login')
    }
    cb()
  }

  return (
    <Route path="/" component={Application}>
      {/* Home (main) route */}
      <IndexRedirect to="/dashboard" />

      {/* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="calendar" getComponent={lazyLoadComponent(Calendar)} />
        <Route path="dashboard" getComponent={lazyLoadComponent(Dashboard)} />
        <Route path="notifications" getComponent={lazyLoadComponent(Notifications)} />
        <Route path="sites-users" getComponent={lazyLoadComponent(SitesUsers)} />
        <Route path="patient-database" getComponent={lazyLoadComponent(PatientDatabase)} />
        <Route path="order-irb-ad-creation" getComponent={lazyLoadComponent(OrderIRBAdCreation)} />
      </Route>

      <Route path="clinical-trial-patient-recruitment-patient-enrollment" getComponent={lazyLoadComponent(GetReport)} />
      <Route path="listnewstudy" getComponent={lazyLoadComponent(ListStudy)} />
      <Route path="getproposal" getComponent={lazyLoadComponent(GetProposal)} />
      <Route path="login" getComponent={lazyLoadComponent(Login)} />
      <Route path="studies/:id" getComponent={lazyLoadComponent(Study)} />
      <Route path="studies/:id/patient-details" getComponent={lazyLoadComponent(PatientDetails)} />
      <Route path="trials" getComponent={lazyLoadComponent(TrialListing)} />
      <Route path="get-referral" getComponent={lazyLoadComponent(GetReferral)} />

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
