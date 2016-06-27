import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

import { notificationArrived } from 'actions'

import './styles.less'

import TopBar from './TopBar'
import BottomBar from './BottomBar'

class Application extends React.Component {
  static propTypes = {
    authorization: PropTypes.any,
    location: PropTypes.any,
    children: PropTypes.any,
    notificationArrived: PropTypes.func,
  }

  componentDidMount () {
    this.configureSocket (this.props)     // comes here when loading from direct url change
  }

  componentWillReceiveProps (nextProps) {
    this.configureSocket (nextProps)
  }

  configureSocket = (props) => {
    if (props.authorization.authData) {
      if (!this.socket) {
        this.socket = io(`${HOST_URL}/notifications`)

        this.socket.on('connect', () => {
          this.socket.emit('newUser', props.authorization.authData.userId)
        })

        this.socket.on('notification', (notification) => {
          props.notificationArrived (notification)
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
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  location: state.location,
})
const mapDispatchToProps = {
  notificationArrived,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application)
