import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Provider } from 'react-redux'

class PassRouter extends React.Component {
  static childContextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getChildContext () {
    return {
      router: this.props.router
    }
  }

  render () {
    return this.props.children
  }
}

export default function renderComponent (component, {
  store = null,
  router = null,
  node = null
} = {}) {
  if (router) {
    const componentNeedingRouter = component
    component = (
      <PassRouter router={router}>
        {componentNeedingRouter}
      </PassRouter>
    )
  }

  if (store) {
    const componentNeedingStore = component
    component = (
      <Provider store={store}>
        {componentNeedingStore}
      </Provider>
    )
  }

  if (node) {
    return ReactDOM.render(component, node)
  } else {
    return TestUtils.renderIntoDocument(component)
  }
}
