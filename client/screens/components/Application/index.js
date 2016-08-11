import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

import {
  notificationArrived,
  subscribe,
  unsubscribeFromAll,
  displayNotification
} from 'actions'

import './styles.less'

import TopBar from './TopBar'
import SideBar from './SideBar'
import GlobalNotifications from '../globalNotifications'
import Dispatcher from '../../../utils/dispatcher'

class Application extends React.Component {
  static propTypes = {
    authorization: PropTypes.any,
    location: PropTypes.any,
    children: PropTypes.any,
    subscribe: PropTypes.func,
    unsubscribeFromAll: PropTypes.func,
    unsubscribeCurrent: PropTypes.func,
    notificationArrived: PropTypes.func,
    displayNotification: PropTypes.func
  }

  connect (props, nameSpace, cb) {
    let authData = props.authorization.authData

    if (authData) {
      if (!this.io) {
        this.io = io(`${HOST_URL}/${nameSpace}`)
        this.io.on('connect', () => {
          cb()
        })
      }
    }
    else {
      if (this.io) {
        this.io.disconnect()
        this.io = null
      }
    }
  }

  getEventType () {
    switch (this.props.location.pathname) {
      case '/dashboard':
        return 'create-study'
      default:
        return null
    }
  }

  componentDidMount () {
    const scope = this
    this.appDispatcher = new Dispatcher()
    this.configureSocket(this.props)// comes here when loading from direct url change
    this.subscribe(this.props)

    this.appDispatcher.register(function (payload) {
      if (payload.actionType === 'changePathname') {

        scope.props.unsubscribeFromAll(scope.io, { pathname: scope.props.location.pathname }, (err, data, cb) => {
          cb(err, data)

          scope.io.disconnect()
          scope.io = null

          scope.configureSocket(scope.props)
          scope.subscribe(scope.props)
        })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    this.configureSocket(nextProps)
    this.subscribe(nextProps)
  }

  subscribe (props) {
    const event = this.getEventType()

    this.connect(props, 'nsp', () => {
      if (props.location.pathname === '/dashboard') {
        props.subscribe(this.io, event,
          { pathname: props.location.pathname }, (err, data, cb) => {
            cb(err, data)

            this.io.on('notification', (notification) => {
              props.displayNotification(notification)
            })
          })
      }
    })
  }

  configureSocket = (props) => {
    if (props.authorization.authData) {
      if (!this.socket) {
        this.socket = io(`${HOST_URL}/notifications`)

        this.socket.on('connect', () => {
          this.socket.emit('newUser', props.authorization.authData.userId)
        })

        this.socket.on('notification', (notification) => {
          props.notificationArrived(notification)
        })
      }
    }
    else {
      if (this.socket) {
        this.socket.disconnect()
        this.socket = null
      }
    }
  }

  render () {
    const { authorized } = this.props.authorization
    return (
      <DocumentTitle title="StudyKik Home Page">
        <div id="wrapper">
          <TopBar authorization={this.props.authorization} location={this.props.location} />
          <SideBar />

          <main id="main">
            {this.props.children}
          </main>

          <GlobalNotifications />
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  location: state.location
})
const mapDispatchToProps = {
  notificationArrived,
  subscribe,
  unsubscribeFromAll,
  displayNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
