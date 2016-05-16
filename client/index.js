import 'whatwg-fetch'
import 'font-awesome-webpack'
import './assets/styles/index.scss'

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRedirect, IndexRoute } from 'react-router'

import { routeChange, setAuthData } from 'actions'
import history from 'utils/history'
import createStore from './createStore'
import persistAuthData from './persistAuthData'

import Application from './screens/Application'
import Login from './screens/Login'
import Landing from './screens/Landing'

import DevTools from 'components/DevTools'

const store = createStore()
store.subscribe(persistAuthData(store))

let authData = null
try {
  authData = localStorage.authData ? JSON.parse(localStorage.authData) : null
} catch (e) {
  // Remove buggy local storage authData
  delete localStorage.authData
}

if (authData) {
  store.dispatch(setAuthData(authData))
}

history.listen(location => {
  store.dispatch(routeChange({ location }))
})

class Root extends React.Component {
  static propTypes = {
    history: PropTypes.any
  }

  render () {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={ Application }>
          <Route path="/login" component={ Login }/>
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(<Provider store={store}>
  <Root history={ history } />
</Provider>, document.getElementById('app'))

if (__DEVTOOLS__) {
  ReactDOM.render(<DevTools store={ store } />, document.getElementById('debug-panel'))
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
