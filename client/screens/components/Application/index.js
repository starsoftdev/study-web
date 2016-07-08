import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

import {
  notificationArrived,
  subscribe,
  unsubscribe,
  displayNotification
} from 'actions'

import './styles.less'

import TopBar from './TopBar'
import BottomBar from './BottomBar'
import GlobalNotifications from '../globalNotifications'

class Application extends React.Component {
  static propTypes = {
    authorization: PropTypes.any,
    location: PropTypes.any,
    children: PropTypes.any,
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func,
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
        return 'create_study'
      default:
        return null
    }
  }

  componentDidMount () {
    this.pathname = this.props.location.pathname
    this.configureSocket(this.props)// comes here when loading from direct url change
    this.subscribe(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.pathname !== this.props.location.pathname) {
      this.props.unsubscribe(this.io, { pathname: this.pathname }, (err, data, cb) => {
        cb(err, data)

        this.io.disconnect()
        this.io = null
        this.pathname = this.props.location.pathname
        this.configureSocket(nextProps)
        this.subscribe(nextProps)
      })
    } else {
      this.configureSocket(nextProps)
      this.subscribe(nextProps)
    }
  }

  subscribe (props) {
    const event = this.getEventType()

    this.connect(props, 'nsp', () => {
      props.subscribe(this.io, event,
        { pathname: props.location.pathname }, (err, data, cb) => {
          cb(err, data)

          this.io.on('notification', (notification) => {
            props.displayNotification(notification)
          })
        })
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
    return (
      <DocumentTitle title="StudyKik Home Page">
        <div>
          <TopBar authorization={this.props.authorization} location={this.props.location} />

          <div className="content">
            {this.props.children}
          </div>

          <BottomBar />

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
  unsubscribe,
  displayNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
