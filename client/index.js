import 'whatwg-fetch'
import 'font-awesome-webpack'
import 'react-select2-wrapper/css/select2.css'

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRedirect, IndexRoute } from 'react-router'

import { routeChange, setAuthData } from 'actions'
import history from 'utils/history'
import Dispatcher from 'utils/dispatcher'

import getRoutes from './routes'
import createStore from './createStore'
import persistAuthData from './persistAuthData'

const store = createStore()
const appDispatcher = new Dispatcher()
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
  appDispatcher.dispatch({
    actionType: 'changePathname',
    data: location
  })

  store.dispatch(routeChange({ location }))
})

class Root extends React.Component {
  static propTypes = {
    history: PropTypes.any
  }

  render () {
    return (
      <Router history={this.props.history}>
        {getRoutes(store)}
      </Router>
    )
  }
}

ReactDOM.render(<Provider store={store}>
  <Root history={history} />
</Provider>, document.getElementById('app'))
